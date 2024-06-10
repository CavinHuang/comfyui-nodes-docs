---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscaler (SEGS/pipe)
## Documentation
- Class name: `SEGSUpscalerPipe`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The SEGSUpscalerPipe node is designed to upscale images using the SEGS (Semantic Edge Guided Sampling) method, integrating various components of a basic pipeline including models, samplers, and optional hooks for enhanced upscaling performance.
## Input types
### Required
- **`image`**
    - The input image to be upscaled. It is central to the upscaling process, determining the base for enhancements.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`segs`**
    - Semantic segmentation maps that guide the upscaling process, ensuring that edges and textures are preserved and enhanced appropriately.
    - Comfy dtype: `SEGS`
    - Python dtype: `torch.Tensor`
- **`basic_pipe`**
    - A tuple containing core components like models, clip, vae, and positive/negative prompts, which are essential for the upscaling operation.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[torch.nn.Module, Any, torch.nn.Module, str, str]`
- **`rescale_factor`**
    - The factor by which the image will be upscaled, directly influencing the output image's resolution.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resampling_method`**
    - The method used for resampling during the upscaling process, affecting the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`supersample`**
    - Indicates whether supersampling is applied, enhancing the upscaling quality by reducing aliasing effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`rounding_modulus`**
    - A value used to adjust the rounding behavior in the upscaling process, impacting the precision of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the upscaling results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to perform during upscaling, affecting the detail and quality of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration settings for the upscaling process, allowing customization of various parameters.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler used in the upscaling process, influencing the texture and detail of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler used to adjust the sampling process, optimizing the upscaling performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Any`
- **`denoise`**
    - Indicates whether denoising is applied, improving the clarity and quality of the upscaled image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`feather`**
    - A parameter controlling the blending of edges, enhancing the smoothness and natural appearance of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`inpaint_model`**
    - The model used for inpainting, filling in missing or damaged areas of the image during upscaling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `torch.nn.Module`
- **`noise_mask_feather`**
    - Controls the application of a noise mask, affecting the texture and realism of the upscaled image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
### Optional
- **`upscale_model_opt`**
    - Optional settings for the upscaling model, allowing for further customization of the upscaling process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `Optional[Dict[str, Any]]`
- **`upscaler_hook_opt`**
    - Optional hooks to modify or enhance the upscaling process, providing additional flexibility.
    - Comfy dtype: `UPSCALER_HOOK`
    - Python dtype: `Optional[Dict[str, Any]]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled image, showcasing improved resolution and detail while preserving the original's semantic integrity.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SEGSUpscalerPipe:
    @classmethod
    def INPUT_TYPES(s):
        resampling_methods = ["lanczos", "nearest", "bilinear", "bicubic"]

        return {"required": {
                    "image": ("IMAGE",),
                    "segs": ("SEGS",),
                    "basic_pipe": ("BASIC_PIPE",),
                    "rescale_factor": ("FLOAT", {"default": 2, "min": 0.01, "max": 100.0, "step": 0.01}),
                    "resampling_method": (resampling_methods,),
                    "supersample": (["true", "false"],),
                    "rounding_modulus": ("INT", {"default": 8, "min": 8, "max": 1024, "step": 8}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                    "denoise": ("FLOAT", {"default": 0.5, "min": 0.0001, "max": 1.0, "step": 0.01}),
                    "feather": ("INT", {"default": 5, "min": 0, "max": 100, "step": 1}),
                    "inpaint_model": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                    "noise_mask_feather": ("INT", {"default": 20, "min": 0, "max": 100, "step": 1}),
                    },
                "optional": {
                    "upscale_model_opt": ("UPSCALE_MODEL",),
                    "upscaler_hook_opt": ("UPSCALER_HOOK",),
                    }
                }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    @staticmethod
    def doit(image, segs, basic_pipe, rescale_factor, resampling_method, supersample, rounding_modulus,
             seed, steps, cfg, sampler_name, scheduler, denoise, feather, inpaint_model, noise_mask_feather,
             upscale_model_opt=None, upscaler_hook_opt=None):

        model, clip, vae, positive, negative = basic_pipe

        return SEGSUpscaler.doit(image, segs, model, clip, vae, rescale_factor, resampling_method, supersample, rounding_modulus,
                                 seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, feather, inpaint_model, noise_mask_feather,
                                 upscale_model_opt=upscale_model_opt, upscaler_hook_opt=upscaler_hook_opt)

```
