---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# PixelKSampleUpscalerProviderPipe
## Documentation
- Class name: `PixelKSampleUpscalerProviderPipe`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The PixelKSampleUpscalerProviderPipe node is designed to provide a streamlined pipeline for upscaling images using pixel-based K-sample upscaling techniques. It extends the capabilities of the PixelKSampleUpscalerProvider by incorporating additional processing steps and configurations, aiming to enhance the quality and efficiency of the upscaling process.
## Input types
### Required
- **`scale_method`**
    - Specifies the method used for scaling the image, impacting the overall upscaling quality and technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Determines the random seed used for generating the upscaled image, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to perform during the upscaling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration settings for the upscaling process, allowing for customization of various parameters.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler used in the upscaling process, influencing the sampling technique and results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler used to manage the upscaling steps, contributing to the efficiency and control of the process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Indicates the level of denoising applied during the upscaling process, improving the visual quality of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`use_tiled_vae`**
    - Determines whether a tiled VAE is used in the upscaling process, affecting the approach to image processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`basic_pipe`**
    - A basic pipeline configuration that includes essential components for the upscaling process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`tile_size`**
    - The size of the tiles used in the tiling strategy, affecting the granularity of the upscaling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`upscale_model_opt`**
    - Optional configurations for the upscale model, allowing for further customization of the upscaling technique.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `dict`
- **`pk_hook_opt`**
    - Optional hook options for post-processing, enabling additional adjustments and enhancements to the upscaled image.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `dict`
## Output types
- **`upscaler`**
    - Comfy dtype: `UPSCALER`
    - The upscaler object configured and ready for use in image upscaling tasks.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [IterativeImageUpscale](../../ComfyUI-Impact-Pack/Nodes/IterativeImageUpscale.md)



## Source code
```python
class PixelKSampleUpscalerProviderPipe(PixelKSampleUpscalerProvider):
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
                    "use_tiled_vae": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "basic_pipe": ("BASIC_PIPE",),
                    "tile_size": ("INT", {"default": 512, "min": 320, "max": 4096, "step": 64}),
                    },
                "optional": {
                        "upscale_model_opt": ("UPSCALE_MODEL", ),
                        "pk_hook_opt": ("PK_HOOK", ),
                    }
                }

    RETURN_TYPES = ("UPSCALER",)
    FUNCTION = "doit_pipe"

    CATEGORY = "ImpactPack/Upscale"

    def doit_pipe(self, scale_method, seed, steps, cfg, sampler_name, scheduler, denoise,
                  use_tiled_vae, basic_pipe, upscale_model_opt=None, pk_hook_opt=None, tile_size=512):
        model, _, vae, positive, negative = basic_pipe
        upscaler = core.PixelKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler,
                                             positive, negative, denoise, use_tiled_vae, upscale_model_opt, pk_hook_opt,
                                             tile_size=tile_size)
        return (upscaler, )

```
