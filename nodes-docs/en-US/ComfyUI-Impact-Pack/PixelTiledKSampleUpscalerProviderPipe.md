---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# PixelTiledKSampleUpscalerProviderPipe
## Documentation
- Class name: `PixelTiledKSampleUpscalerProviderPipe`
- Category: `ImpactPack/Upscale`
- Output node: `False`

This node is designed to upscale images using a tiled K-sample upscaling method. It leverages a specific upscaling model and various configuration options to enhance image resolution in a tiled manner, allowing for efficient handling of larger images by processing them in smaller, manageable sections.
## Input types
### Required
- **`scale_method`**
    - Specifies the method used for scaling the image, affecting the upscaling process's overall approach and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Determines the random seed used during the upscaling process, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to perform during the upscaling, impacting the detail and quality of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration setting that influences the sampling behavior during upscaling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `str`
- **`sampler_name`**
    - Identifies the sampler to use, affecting the texture and details of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for controlling the upscaling process, including step size and other parameters.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Indicates whether denoising is applied during the upscaling process, improving image clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`tile_width`**
    - The width of the tiles used in the upscaling process, determining how the image is divided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_height`**
    - The height of the tiles used in the upscaling process, determining how the image is divided.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tiling_strategy`**
    - The strategy used for tiling the image during upscaling, affecting how image sections are processed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`basic_pipe`**
    - A pipeline of models and configurations used as the basis for the upscaling process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
### Optional
- **`upscale_model_opt`**
    - Optional configurations for the upscaling model, allowing for customization of the upscaling behavior.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `dict`
- **`pk_hook_opt`**
    - Optional hook for post-processing, enabling additional image adjustments after upscaling.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `dict`
- **`tile_cnet_opt`**
    - Optional configuration for tile conditioning, influencing how individual tiles are processed during upscaling.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `dict`
## Output types
- **`upscaler`**
    - Comfy dtype: `UPSCALER`
    - The result of the upscaling process, providing an enhanced version of the input image.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PixelTiledKSampleUpscalerProviderPipe:
    upscale_methods = ["nearest-exact", "bilinear", "lanczos", "area"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "scale_method": (s.upscale_methods,),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "tile_width": ("INT", {"default": 512, "min": 320, "max": MAX_RESOLUTION, "step": 64}),
                    "tile_height": ("INT", {"default": 512, "min": 320, "max": MAX_RESOLUTION, "step": 64}),
                    "tiling_strategy": (["random", "padded", 'simple'], ),
                    "basic_pipe": ("BASIC_PIPE",)
                    },
                "optional": {
                        "upscale_model_opt": ("UPSCALE_MODEL", ),
                        "pk_hook_opt": ("PK_HOOK", ),
                        "tile_cnet_opt": ("CONTROL_NET", ),
                    }
                }

    RETURN_TYPES = ("UPSCALER",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, scale_method, seed, steps, cfg, sampler_name, scheduler, denoise, tile_width, tile_height, tiling_strategy, basic_pipe, upscale_model_opt=None, pk_hook_opt=None, tile_cnet_opt=None):
        if "BNK_TiledKSampler" in nodes.NODE_CLASS_MAPPINGS:
            model, _, vae, positive, negative = basic_pipe
            upscaler = core.PixelTiledKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy, upscale_model_opt, pk_hook_opt, tile_cnet_opt, tile_size=max(tile_width, tile_height))
            return (upscaler, )
        else:
            print("[ERROR] PixelTiledKSampleUpscalerProviderPipe: ComfyUI_TiledKSampler custom node isn't installed. You must install BlenderNeko/ComfyUI_TiledKSampler extension to use this node.")

```
