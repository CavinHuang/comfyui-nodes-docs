---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# TwoSamplersForMask Upscaler Provider
## Documentation
- Class name: `TwoSamplersForMaskUpscalerProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

This node provides a mechanism to upscale images using two distinct samplers, each responsible for different regions of the image, based on a mask. It enables the selective application of upscaling techniques to enhance image quality or add details in a controlled manner.
## Input types
### Required
- **`scale_method`**
    - Specifies the method used for scaling during the upscaling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`full_sample_schedule`**
    - Defines the sampling schedule for the full image upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Dict[str, Any]`
- **`use_tiled_vae`**
    - Indicates whether a tiled VAE approach is used for upscaling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`base_sampler`**
    - The primary sampler used for upscaling the image, applied to the regions not covered by the mask.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `torch.nn.Module`
- **`mask_sampler`**
    - A specialized sampler used for upscaling the regions of the image specified by the mask.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `torch.nn.Module`
- **`mask`**
    - A binary mask indicating the regions of the image to be specifically upscaled by the mask_sampler.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - The variational autoencoder used in the upscaling process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
- **`tile_size`**
    - Specifies the size of the tiles when using a tiled VAE approach.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`full_sampler_opt`**
    - Options for the full sampler used in the upscaling process.
    - Comfy dtype: `KSAMPLER`
    - Python dtype: `Dict[str, Any]`
- **`upscale_model_opt`**
    - Options for the upscale model used in the upscaling process.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`pk_hook_base_opt`**
    - Options for the base hook in the upscaling process.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `Dict[str, Any]`
- **`pk_hook_mask_opt`**
    - Options for the mask hook in the upscaling process.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `Dict[str, Any]`
- **`pk_hook_full_opt`**
    - Options for the full hook in the upscaling process.
    - Comfy dtype: `PK_HOOK`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`upscaler`**
    - Comfy dtype: `UPSCALER`
    - The upscaled latent image after applying both the base and mask samplers.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class TwoSamplersForMaskUpscalerProvider:
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
                     "vae": ("VAE",),
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

    def doit(self, scale_method, full_sample_schedule, use_tiled_vae, base_sampler, mask_sampler, mask, vae,
             full_sampler_opt=None, upscale_model_opt=None,
             pk_hook_base_opt=None, pk_hook_mask_opt=None, pk_hook_full_opt=None, tile_size=512):
        upscaler = core.TwoSamplersForMaskUpscaler(scale_method, full_sample_schedule, use_tiled_vae,
                                                   base_sampler, mask_sampler, mask, vae, full_sampler_opt, upscale_model_opt,
                                                   pk_hook_base_opt, pk_hook_mask_opt, pk_hook_full_opt, tile_size=tile_size)
        return (upscaler, )

```
