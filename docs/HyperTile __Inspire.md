
# Documentation
- Class name: HyperTile __Inspire
- Category: InspirePack/__for_testing
- Output node: False

HyperTileInspire节点旨在通过应用专门的分块机制来增强模型的功能。该机制重新排列模型的输出，通过修改注意力机制的输入和输出块，以优化特定任务，如图像生成或处理。

# Input types
## Required
- model
    - 需要应用HyperTile机制进行修改的模型，作为分块过程的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tile_size
    - 决定分块过程中使用的块的大小，直接影响输出的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- swap_size
    - 指定分块过程中交换操作的大小，影响模型生成多样化输出的能力。
    - Comfy dtype: INT
    - Python dtype: int
- max_depth
    - 定义应用分块机制的最大深度，影响分块输出的复杂度和细节程度。
    - Comfy dtype: INT
    - Python dtype: int
- scale_depth
    - 布尔标志，决定是否应用深度缩放，影响不同深度的细节变化。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 可选的随机数生成种子，确保分块过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 返回经过修改的模型版本，其注意力机制的块已经过调整，专门针对需要特殊分块的任务进行了性能优化。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class HyperTileInspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",),
                             "tile_size": ("INT", {"default": 256, "min": 1, "max": 2048}),
                             "swap_size": ("INT", {"default": 2, "min": 1, "max": 128}),
                             "max_depth": ("INT", {"default": 0, "min": 0, "max": 10}),
                             "scale_depth": ("BOOLEAN", {"default": False}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "InspirePack/__for_testing"

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
                apply_to.append((orig_shape[-2] / (2 ** i)) * (orig_shape[-1] / (2 ** i)))

            if model_chans in apply_to:
                shape = extra_options["original_shape"]
                aspect_ratio = shape[-1] / shape[-2]

                hw = q.size(1)
                # h, w = calc_optimal_hw(hw, aspect_ratio)
                h, w = round(math.sqrt(hw * aspect_ratio)), round(math.sqrt(hw / aspect_ratio))

                factor = (2 ** apply_to.index(model_chans)) if scale_depth else 1
                nh = random_divisor(h, latent_tile_size * factor, swap_size, rand_obj)
                nw = random_divisor(w, latent_tile_size * factor, swap_size, rand_obj)

                print(f"factor: {factor} <--- params.depth: {apply_to.index(model_chans)} / scale_depth: {scale_depth} / latent_tile_size={latent_tile_size}")
                # print(f"h: {h}, w:{w} --> nh: {nh}, nw: {nw}")

                if nh * nw > 1:
                    q = rearrange(q, "b (nh h nw w) c -> (b nh nw) (h w) c", h=h // nh, w=w // nw, nh=nh, nw=nw)
                    temp = (nh, nw, h, w)
                # else:
                #     temp = None

                print(f"q={q} / k={k} / v={v}")
                return q, k, v

            return q, k, v

        def hypertile_out(out, extra_options):
            nonlocal temp
            if temp is not None:
                nh, nw, h, w = temp
                temp = None
                out = rearrange(out, "(b nh nw) hw c -> b nh nw hw c", nh=nh, nw=nw)
                out = rearrange(out, "b nh nw (h w) c -> b (nh h nw w) c", h=h // nh, w=w // nw)
            return out

        m = model.clone()
        m.set_model_attn1_patch(hypertile_in)
        m.set_model_attn1_output_patch(hypertile_out)
        return (m, )

```
