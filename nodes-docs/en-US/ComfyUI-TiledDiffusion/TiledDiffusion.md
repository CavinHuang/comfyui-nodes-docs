---
tags:
- LayeredDiffusion
---

# Tiled Diffusion
## Documentation
- Class name: `TiledDiffusion`
- Category: `_for_testing`
- Output node: `False`

The TiledDiffusion node specializes in applying diffusion processes to images in a tiled manner, optimizing for efficiency and scalability. It leverages a tiling strategy to manage and process large images or batches by breaking them down into smaller, manageable pieces, allowing for detailed and controlled diffusion effects across the entirety of the image.
## Input types
### Required
- **`model`**
    - The model parameter represents the diffusion model to be applied. It is crucial for defining the diffusion behavior and processing the image data through the specified diffusion algorithm.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`method`**
    - Specifies the diffusion method to be applied, such as 'Mixture of Diffusers' or other strategies, influencing the overall diffusion process and its outcomes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tile_width`**
    - Determines the width of each tile in the tiling strategy, affecting the granularity of the diffusion process across the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_height`**
    - Sets the height of each tile, impacting how the image is segmented for the diffusion process and influencing the detail level achievable.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_overlap`**
    - Defines the overlap between tiles to ensure seamless diffusion effects across tile boundaries, enhancing the visual continuity of the processed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_batch_size`**
    - Controls the number of tiles processed simultaneously, balancing between computational efficiency and memory usage.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns the modified model with the tiled diffusion process applied, ready for further use or analysis.
    - Python dtype: `ModelPatcher`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TiledDiffusion():
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL", ),
                                "method": (["MultiDiffusion", "Mixture of Diffusers"], {"default": "Mixture of Diffusers"}),
                                # "tile_width": ("INT", {"default": 96, "min": 16, "max": 256, "step": 16}),
                                "tile_width": ("INT", {"default": 96*opt_f, "min": 16, "max": MAX_RESOLUTION, "step": 16}),
                                # "tile_height": ("INT", {"default": 96, "min": 16, "max": 256, "step": 16}),
                                "tile_height": ("INT", {"default": 96*opt_f, "min": 16, "max": MAX_RESOLUTION, "step": 16}),
                                "tile_overlap": ("INT", {"default": 8*opt_f, "min": 0, "max": 256*opt_f, "step": 4*opt_f}),
                                "tile_batch_size": ("INT", {"default": 4, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                            }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply"
    CATEGORY = "_for_testing"

    def apply(self, model: ModelPatcher, method, tile_width, tile_height, tile_overlap, tile_batch_size):
        if method == "Mixture of Diffusers":
            implement = MixtureOfDiffusers()
        else:
            implement = MultiDiffusion()
        
        # if noise_inversion:
        #     get_cache_callback = self.noise_inverse_get_cache
        #     set_cache_callback = None # lambda x0, xt, prompts: self.noise_inverse_set_cache(p, x0, xt, prompts, steps, retouch)
        #     implement.init_noise_inverse(steps, retouch, get_cache_callback, set_cache_callback, renoise_strength, renoise_kernel_size)

        implement.tile_width = tile_width // opt_f
        implement.tile_height = tile_height // opt_f
        implement.tile_overlap = tile_overlap // opt_f
        implement.tile_batch_size = tile_batch_size
        # implement.init_grid_bbox(tile_width, tile_height, tile_overlap, tile_batch_size)
        # # init everything done, perform sanity check & pre-computations
        # implement.init_done()
        # hijack the behaviours
        # implement.hook()
        model = model.clone()
        model.set_model_unet_function_wrapper(implement)
        model.model_options['tiled_diffusion'] = True
        return (model,)

```
