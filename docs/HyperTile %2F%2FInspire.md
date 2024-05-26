# Documentation
- Class name: HyperTileInspire
- Category: InspirePack/__for_testing
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

HyperTileInspire节点旨在通过动态调整给定模型的特征平铺来增强模型的功能。它通过引入一种随机但系统化的方法来修改模型输入的空间维度，这对于优化模型在从不同输入分辨率中受益的任务上的性能特别有用。该节点旨在提供一种灵活高效的方式，探索不同的平铺策略，而无需手动干预或预定义配置。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了将通过平铺过程得到增强的机器学习模型。节点修改模型输入平铺的能力直接影响模型处理和学习数据的方式，可能在某些任务上带来性能提升。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tile_size
    - tile_size参数决定了模型输入将被划分成的平铺的基础大小。它在平铺过程中起着关键作用，因为它为输入空间的划分设定了初始尺度。此参数允许定制平铺的粒度，可以根据不同任务的具体需求进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- swap_size
    - swap_size参数规定了可以用来调整平铺尺寸的最大除数大小。它是平铺随机化过程中的一个重要因素，因为它控制了平铺可能大小的范围。这为节点的操作增加了变化性，对于需要多样化输入配置的任务可能有益。
    - Comfy dtype: INT
    - Python dtype: int
- max_depth
    - max_depth参数指定可以递归应用平铺过程的最大次数。它是控制平铺操作复杂性的关键因素。通过调整此参数，用户可以管理平铺细节水平和执行操作所需的计算资源之间的权衡。
    - Comfy dtype: INT
    - Python dtype: int
- scale_depth
    - scale_depth参数是一个布尔标志，当设置为True时，它允许根据平铺过程的深度来缩放平铺尺寸。这可以导致更细致和自适应的平铺策略，允许模型更好地适应输入数据中的不同细节水平。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - seed参数用于初始化随机数生成器，确保平铺过程是可复现的。这在希望节点在多次运行中获得一致结果的场景中尤其重要。通过提供种子，用户可以控制平铺中的随机性以实现特定的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 输出模型是输入模型的增强版本，其注意力机制被修改以包含输入的动态平铺。这允许模型在不同尺度上处理信息，这对于某些类型的分析或特征提取至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class HyperTileInspire:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'tile_size': ('INT', {'default': 256, 'min': 1, 'max': 2048}), 'swap_size': ('INT', {'default': 2, 'min': 1, 'max': 128}), 'max_depth': ('INT', {'default': 0, 'min': 0, 'max': 10}), 'scale_depth': ('BOOLEAN', {'default': False}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'InspirePack/__for_testing'

    def patch(self, model, tile_size, swap_size, max_depth, scale_depth, seed):
        latent_tile_size = max(32, tile_size) // 8
        temp = None
        rand_obj = random.Random()
        rand_obj.seed(seed)

        def hypertile_in(q, k, v, extra_options):
            nonlocal temp
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
                nh = random_divisor(h, latent_tile_size * factor, swap_size, rand_obj)
                nw = random_divisor(w, latent_tile_size * factor, swap_size, rand_obj)
                print(f'factor: {factor} <--- params.depth: {apply_to.index(model_chans)} / scale_depth: {scale_depth} / latent_tile_size={latent_tile_size}')
                if nh * nw > 1:
                    q = rearrange(q, 'b (nh h nw w) c -> (b nh nw) (h w) c', h=h // nh, w=w // nw, nh=nh, nw=nw)
                    temp = (nh, nw, h, w)
                print(f'q={q} / k={k} / v={v}')
                return (q, k, v)
            return (q, k, v)

        def hypertile_out(out, extra_options):
            nonlocal temp
            if temp is not None:
                (nh, nw, h, w) = temp
                temp = None
                out = rearrange(out, '(b nh nw) hw c -> b nh nw hw c', nh=nh, nw=nw)
                out = rearrange(out, 'b nh nw (h w) c -> b (nh h nw w) c', h=h // nh, w=w // nw)
            return out
        m = model.clone()
        m.set_model_attn1_patch(hypertile_in)
        m.set_model_attn1_output_patch(hypertile_out)
        return (m,)
```