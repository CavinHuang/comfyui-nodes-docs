---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# TwoSamplersForMask Upscaler Provider (pipe)
## Documentation
- Class name: `TwoSamplersForMaskUpscalerProviderPipe`
- Category: `ImpactPack/Upscale`
- Output node: `False`

This node is designed to provide a pipeline that integrates two distinct samplers specifically for the purpose of upscaling masks. It facilitates the enhancement of image quality by applying specialized sampling techniques to areas designated by masks, thereby improving the overall visual impact of the images.
## Input types
### Required
- **`scale_method`**
    - Specifies the method used for scaling during the upscaling process. It influences how the image is enlarged and the quality of the upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`full_sample_schedule`**
    - Defines the schedule for sampling throughout the upscaling process. It determines the sequence and parameters for sampling operations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`use_tiled_vae`**
    - Indicates whether a tiled VAE approach is used for upscaling. This affects the handling of large images by breaking them into tiles for processing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`base_sampler`**
    - Specifies the base sampler used in the upscaling process, which is crucial for the initial sampling phase.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `object`
- **`mask_sampler`**
    - Defines the sampler used specifically for the mask areas during upscaling, enhancing the details in these regions.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `object`
- **`mask`**
    - The mask that designates areas for specialized upscaling, playing a key role in the targeted enhancement of image quality.
    - Comfy dtype: `MASK`
    - Python dtype: `object`
- **`basic_pipe`**
    - The basic processing pipeline that provides essential functionalities like VAE operations. It serves as the foundation for the upscaling process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`tile_size`**
    - The size of the tiles used when a tiled VAE approach is employed. It specifies the dimensions for breaking down large images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`full_sampler_opt`**
    - Optional configurations for the full sampler used in the upscaling process. It allows customization of the sampling behavior.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `dict`
- **`upscale_model_opt`**
    - Optional configurations for the upscale model. It enables fine-tuning of the model's parameters for better upscaling results.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `dict`
- **`pk_hook_base_opt`**
    - Optional configurations for the base hook in the pipeline. It affects the initial phase of the upscaling process.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `dict`
- **`pk_hook_mask_opt`**
    - Optional configurations for the mask hook. It influences how the mask is applied and processed during upscaling.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `dict`
- **`pk_hook_full_opt`**
    - Optional configurations for the full hook, affecting the entire upscaling process. It allows for comprehensive customization of the upscaling behavior.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `dict`
## Output types
- **`upscaler`**
    - Comfy dtype: `UPSCALER`
    - The result of the upscaling process, providing an enhanced version of the image with improved quality in masked areas.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TwoSamplersForMaskUpscalerProviderPipe:
    upscale_methods = ["nearest-exact", "bilinear", "lanczos", "area"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "scale_method": (s.upscale_methods,),
                     "full_sample_schedule": (
                         ["none", "interleave1", "interleave2", "interleave3",
                          "last1", "last2",
                          "interleave1+last1", "interleave2+last1", "interleave3+last1",
                          ],),
                     "use_tiled_vae": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                     "base_sampler": ("KSAMPLER", ),
                     "mask_sampler": ("KSAMPLER", ),
                     "mask": ("MASK", ),
                     "basic_pipe": ("BASIC_PIPE",),
                     "tile_size": ("INT", {"default": 512, "min": 320, "max": 4096, "step": 64}),
                     },
                "optional": {
                        "full_sampler_opt": ("KSAMPLER",),
                        "upscale_model_opt": ("UPSCALE_MODEL", ),
                        "pk_hook_base_opt": ("PK_HOOK", ),
                        "pk_hook_mask_opt": ("PK_HOOK", ),
                        "pk_hook_full_opt": ("PK_HOOK", ),
                    }
                }

    RETURN_TYPES = ("UPSCALER", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, scale_method, full_sample_schedule, use_tiled_vae, base_sampler, mask_sampler, mask, basic_pipe,
             full_sampler_opt=None, upscale_model_opt=None,
             pk_hook_base_opt=None, pk_hook_mask_opt=None, pk_hook_full_opt=None, tile_size=512):

        mask = make_2d_mask(mask)

        _, _, vae, _, _ = basic_pipe
        upscaler = core.TwoSamplersForMaskUpscaler(scale_method, full_sample_schedule, use_tiled_vae,
                                                   base_sampler, mask_sampler, mask, vae, full_sampler_opt, upscale_model_opt,
                                                   pk_hook_base_opt, pk_hook_mask_opt, pk_hook_full_opt, tile_size=tile_size)
        return (upscaler, )

```
