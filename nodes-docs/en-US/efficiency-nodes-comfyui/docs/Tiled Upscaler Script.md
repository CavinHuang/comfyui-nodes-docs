---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Tiled Upscaler Script
## Documentation
- Class name: `Tiled Upscaler Script`
- Category: `Efficiency Nodes/Scripts`
- Output node: `False`

The Tiled Upscaler Script node is designed to enhance image resolution through a process of tiled sampling and upscaling. It leverages various upscaling strategies, including latent and pixel-based methods, to improve image quality while maintaining efficiency. This node is capable of handling different tiling strategies, applying denoise filters, and optionally utilizing control nets for more precise upscaling results.
## Input types
### Required
- **`upscale_by`**
    - Specifies the factor by which the image should be upscaled. It affects the overall resolution enhancement of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tile_size`**
    - Determines the size of the tiles used in the upscaling process, impacting the granularity of the upscaling and potentially the performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tiling_strategy`**
    - Defines the approach for tiling during the upscaling process, influencing how the image is segmented and processed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`tiling_steps`**
    - Indicates the number of steps or iterations to perform during the tiling process, affecting the depth of the upscaling operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - Provides a seed for random number generation, ensuring reproducibility of the upscaling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - Enables or disables the application of a denoise filter during the upscaling process, affecting image clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`use_controlnet`**
    - Determines whether a control net is used in the upscaling process, allowing for more precise adjustments.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`tile_controlnet`**
    - Specifies the control net to be applied if use_controlnet is true, guiding the upscaling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - Adjusts the intensity of the upscaling effect, allowing for finer control over the final image appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`script`**
    - Optional script parameters that can be used to customize the upscaling process further.
    - Comfy dtype: `SCRIPT`
    - Python dtype: `dict`
## Output types
- **`script`**
    - Comfy dtype: `SCRIPT`
    - Returns the modified script with upscaling parameters included, ready for further processing.
    - Python dtype: `dict`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TSC_Tiled_Upscaler:
    @classmethod
    def INPUT_TYPES(cls):
        # Split the list based on the keyword "tile"
        cnet_filenames = [name for name in folder_paths.get_filename_list("controlnet")]

        return {"required": {"upscale_by": ("FLOAT", {"default": 1.25, "min": 0.01, "max": 8.0, "step": 0.05}),
                             "tile_size": ("INT", {"default": 512, "min": 256, "max": MAX_RESOLUTION, "step": 64}),
                             "tiling_strategy": (["random", "random strict", "padded", 'simple', 'none'],),
                             "tiling_steps": ("INT", {"default": 30, "min": 1, "max": 10000}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "denoise": ("FLOAT", {"default": .4, "min": 0.0, "max": 1.0, "step": 0.01}),
                             "use_controlnet": ("BOOLEAN", {"default": False}),
                             "tile_controlnet": (cnet_filenames,),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             },
                "optional": {"script": ("SCRIPT",)}}

    RETURN_TYPES = ("SCRIPT",)
    FUNCTION = "tiled_sampling"
    CATEGORY = "Efficiency Nodes/Scripts"

    def tiled_sampling(self, upscale_by, tile_size, tiling_strategy, tiling_steps, seed, denoise,
                       use_controlnet, tile_controlnet, strength, script=None):
        if tiling_strategy != 'none':
            script = script or {}
            tile_controlnet = ControlNetLoader().load_controlnet(tile_controlnet)[0] if use_controlnet else None

            script["tile"] = (upscale_by, tile_size, tiling_strategy, tiling_steps, seed, denoise, tile_controlnet, strength)
        return (script,)

```
