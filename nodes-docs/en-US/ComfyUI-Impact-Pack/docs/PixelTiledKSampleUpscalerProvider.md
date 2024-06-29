---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# PixelTiledKSampleUpscalerProvider
## Documentation
- Class name: `PixelTiledKSampleUpscalerProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

This node provides an interface for upscaling images using a tiled K-sample approach, integrating with external sampling tools and strategies for enhanced detail and quality in image upscaling tasks. It leverages a combination of model parameters, sampling techniques, and tiling strategies to optimize the upscaling process.
## Input types
### Required
- **`scale_method`**
    - Specifies the method used for scaling images, impacting the overall upscaling quality and technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model`**
    - Defines the model used for upscaling, determining the core algorithm and its capabilities.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`vae`**
    - The variational autoencoder used in conjunction with the model to enhance image details during upscaling.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`seed`**
    - Seed for random number generation, ensuring reproducibility of the upscaling results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to perform in the upscaling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration setting for controlling aspects of the upscaling process, such as detail levels.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler used, influencing the sampling strategy and outcome of the upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Scheduler used to manage the upscaling process, coordinating the execution of steps and tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Positive feedback to guide the upscaling process towards desired outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative feedback to steer the upscaling away from undesired results.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`denoise`**
    - Indicates whether denoising is applied during upscaling, improving image clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`tile_width`**
    - The width of the tiles used in the tiling strategy, affecting the granularity of the upscaling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tile_height`**
    - The height of the tiles used in the tiling strategy, impacting the detail level in specific image areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tiling_strategy`**
    - The strategy employed for tiling during upscaling, influencing the overall approach and effectiveness.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`upscale_model_opt`**
    - Optional upscale model to enhance the upscaling process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `str`
- **`pk_hook_opt`**
    - Optional post-kernel hook for additional processing or adjustments during upscaling.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `str`
- **`tile_cnet_opt`**
    - Optional control network for managing tile-based upscaling strategies.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `str`
## Output types
- **`upscaler`**
    - Comfy dtype: `UPSCALER`
    - The result of the upscaling process, providing enhanced image quality and detail.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PixelTiledKSampleUpscalerProvider:
    upscale_methods = ["nearest-exact", "bilinear", "lanczos", "area"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "scale_method": (s.upscale_methods,),
                    "model": ("MODEL",),
                    "vae": ("VAE",),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "tile_width": ("INT", {"default": 512, "min": 320, "max": MAX_RESOLUTION, "step": 64}),
                    "tile_height": ("INT", {"default": 512, "min": 320, "max": MAX_RESOLUTION, "step": 64}),
                    "tiling_strategy": (["random", "padded", 'simple'], ),
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

    def doit(self, scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy, upscale_model_opt=None, pk_hook_opt=None, tile_cnet_opt=None):
        if "BNK_TiledKSampler" in nodes.NODE_CLASS_MAPPINGS:
            upscaler = core.PixelTiledKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy, upscale_model_opt, pk_hook_opt, tile_cnet_opt, tile_size=max(tile_width, tile_height))
            return (upscaler, )
        else:
            print("[ERROR] PixelTiledKSampleUpscalerProvider: ComfyUI_TiledKSampler custom node isn't installed. You must install BlenderNeko/ComfyUI_TiledKSampler extension to use this node.")

```
