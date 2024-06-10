---
tags:
- Image
- Tiled
---

# HyperTile
## Documentation
- Class name: `HyperTile`
- Category: `model_patches`
- Output node: `False`

The HyperTile node is designed to enhance the processing of image data by dynamically adjusting the tile size of the input based on the model's channel configuration and the specified tile size. It aims to optimize the handling of image data for neural networks by applying a specialized tiling strategy that adapts to the model's characteristics and the computational constraints.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model that will be modified by the HyperTile node. It is crucial for determining the appropriate tiling strategy based on the model's channel configuration.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`tile_size`**
    - Specifies the base size of the tiles into which the input image is divided. This size is dynamically adjusted to optimize processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`swap_size`**
    - Determines the granularity of the swap operation in the tiling process, affecting the final tile configuration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_depth`**
    - Defines the maximum depth for the tiling strategy, influencing how deeply the tiling adjustments can be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`scale_depth`**
    - A boolean parameter that indicates whether the depth scaling factor should be applied to the tiling strategy, further customizing the tiling process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with an adjusted attention mechanism to accommodate the new tiling strategy, enhancing the processing of image data.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PatchModelAddDownscale](../../Comfy/Nodes/PatchModelAddDownscale.md)
    - [FreeU_V2](../../Comfy/Nodes/FreeU_V2.md)



## Source code
```python
class HyperTile:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                             "tile_size": ("INT", {"default": 256, "min": 1, "max": 2048}),
                             "swap_size": ("INT", {"default": 2, "min": 1, "max": 128}),
                             "max_depth": ("INT", {"default": 0, "min": 0, "max": 10}),
                             "scale_depth": ("BOOLEAN", {"default": False}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches"

    def patch(self, model, tile_size, swap_size, max_depth, scale_depth):
        model_channels = model.model.model_config.unet_config["model_channels"]

        latent_tile_size = max(32, tile_size) // 8
        self.temp = None

        def hypertile_in(q, k, v, extra_options):
            model_chans = q.shape[-2]
            orig_shape = extra_options['original_shape']
            apply_to = []
            for i in range(max_depth + 1):
                apply_to.append((orig_shape[-2] / (2 ** i)) * (orig_shape[-1] / (2 ** i)))

            if model_chans in apply_to:
                shape = extra_options["original_shape"]
                aspect_ratio = shape[-1] / shape[-2]

                hw = q.size(1)
                h, w = round(math.sqrt(hw * aspect_ratio)), round(math.sqrt(hw / aspect_ratio))

                factor = (2 ** apply_to.index(model_chans)) if scale_depth else 1
                nh = random_divisor(h, latent_tile_size * factor, swap_size)
                nw = random_divisor(w, latent_tile_size * factor, swap_size)

                if nh * nw > 1:
                    q = rearrange(q, "b (nh h nw w) c -> (b nh nw) (h w) c", h=h // nh, w=w // nw, nh=nh, nw=nw)
                    self.temp = (nh, nw, h, w)
                return q, k, v

            return q, k, v
        def hypertile_out(out, extra_options):
            if self.temp is not None:
                nh, nw, h, w = self.temp
                self.temp = None
                out = rearrange(out, "(b nh nw) hw c -> b nh nw hw c", nh=nh, nw=nw)
                out = rearrange(out, "b nh nw (h w) c -> b (nh h nw w) c", h=h // nh, w=w // nw)
            return out


        m = model.clone()
        m.set_model_attn1_patch(hypertile_in)
        m.set_model_attn1_output_patch(hypertile_out)
        return (m, )

```
