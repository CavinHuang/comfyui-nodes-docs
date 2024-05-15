# Documentation
- Class name: HyperTile
- Category: model_patches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

HyperTile节点旨在通过动态调整处理期间输入数据的平铺来修改模型的行为。它通过实现一种修补机制来实现这一点，该机制改变模型的注意力机制以处理指定大小的平铺。这个节点特别适用于优化模型在不同数据粒度上的性能，而无需更改模型架构。

# Input types
## Required
- model
    - 模型参数是必需的，因为它代表了将被修补的机器学习模型。修补过程调整模型的内部工作方式，以平铺的方式处理数据，这对于某些类型的数据处理任务至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- tile_size
    - tile_size参数决定了输入数据将被划分成的平铺的尺寸。它对于控制数据处理的粒度很重要，并且可以显著影响模型的效率和输出质量。
    - Comfy dtype: INT
    - Python dtype: int
- swap_size
    - swap_size参数影响模型内平铺的重新排列方式。它是优化过程中的一个关键因素，因为它可以直接影响模型高效处理数据的能力。
    - Comfy dtype: INT
    - Python dtype: int
- max_depth
    - max_depth参数设置了平铺过程深度的限制。它对于控制模型需要处理的数据结构的复杂性很重要，可以防止过度复杂化并保持性能。
    - Comfy dtype: INT
    - Python dtype: int
- scale_depth
    - scale_depth标志指示是否应根据模型的通道尺寸调整平铺的深度。这对于优化模型针对数据特性的性能是一个重要的考虑因素。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- model
    - HyperTile节点的输出是修改后的模型，现在它包含了处理平铺数据的注意力机制的修补逻辑。这允许以不同的粒度更有效地处理数据。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class HyperTile:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'tile_size': ('INT', {'default': 256, 'min': 1, 'max': 2048}), 'swap_size': ('INT', {'default': 2, 'min': 1, 'max': 128}), 'max_depth': ('INT', {'default': 0, 'min': 0, 'max': 10}), 'scale_depth': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'model_patches'

    def patch(self, model, tile_size, swap_size, max_depth, scale_depth):
        model_channels = model.model.model_config.unet_config['model_channels']
        latent_tile_size = max(32, tile_size) // 8
        self.temp = None

        def hypertile_in(q, k, v, extra_options):
            model_chans = q.shape[-2]
            orig_shape = extra_options['original_shape']
            apply_to = []
            for i in range(max_depth + 1):
                apply_to.append(orig_shape[-2] / 2 ** i * (orig_shape[-1] / 2 ** i))
            if model_chans in apply_to:
                shape = extra_options['original_shape']
                aspect_ratio = shape[-1] / shape[-2]
                hw = q.size(1)
                (h, w) = (round(math.sqrt(hw * aspect_ratio)), round(math.sqrt(hw / aspect_ratio)))
                factor = 2 ** apply_to.index(model_chans) if scale_depth else 1
                nh = random_divisor(h, latent_tile_size * factor, swap_size)
                nw = random_divisor(w, latent_tile_size * factor, swap_size)
                if nh * nw > 1:
                    q = rearrange(q, 'b (nh h nw w) c -> (b nh nw) (h w) c', h=h // nh, w=w // nw, nh=nh, nw=nw)
                    self.temp = (nh, nw, h, w)
                return (q, k, v)
            return (q, k, v)

        def hypertile_out(out, extra_options):
            if self.temp is not None:
                (nh, nw, h, w) = self.temp
                self.temp = None
                out = rearrange(out, '(b nh nw) hw c -> b nh nw hw c', nh=nh, nw=nw)
                out = rearrange(out, 'b nh nw (h w) c -> b (nh h nw w) c', h=h // nh, w=w // nw)
            return out
        m = model.clone()
        m.set_model_attn1_patch(hypertile_in)
        m.set_model_attn1_output_patch(hypertile_out)
        return (m,)
```