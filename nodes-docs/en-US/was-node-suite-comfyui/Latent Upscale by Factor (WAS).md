---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Latent Upscale by Factor (WAS)
## Documentation
- Class name: `Latent Upscale by Factor (WAS)`
- Category: `WAS Suite/Latent/Transform`
- Output node: `False`

This node specializes in upscaling latent images by a specified factor, utilizing various interpolation methods to enhance the resolution while maintaining the integrity of the original image. It provides flexibility in scaling and alignment options to cater to different upscaling needs.
## Input types
### Required
- **`samples`**
    - The latent images to be upscaled. This input is crucial as it determines the base content that will undergo the upscaling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the interpolation method to be used for upscaling, offering options like 'area', 'bicubic', 'bilinear', and 'nearest'. This choice affects the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`factor`**
    - The scaling factor by which the latent images will be upscaled. A positive float that directly influences the final size of the upscaled images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`align`**
    - A boolean flag indicating whether to align corners in certain interpolation modes, affecting the upscaling precision and outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The upscaled latent images, enhanced in resolution according to the specified factor and interpolation method.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Latent_Upscale:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"samples": ("LATENT",), "mode": (["area", "bicubic", "bilinear", "nearest"],),
                             "factor": ("FLOAT", {"default": 2.0, "min": 0.1, "max": 8.0, "step": 0.01}),
                             "align": (["true", "false"], )}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "latent_upscale"

    CATEGORY = "WAS Suite/Latent/Transform"

    def latent_upscale(self, samples, mode, factor, align):
        valid_modes = ["area", "bicubic", "bilinear", "nearest"]
        if mode not in valid_modes:
            cstr(f"Invalid interpolation mode `{mode}` selected. Valid modes are: {', '.join(valid_modes)}").error.print()
            return (s, )
        align = True if align == 'true' else False
        if not isinstance(factor, float) or factor <= 0:
            cstr(f"The input `factor` is `{factor}`, but should be a positive or negative float.").error.print()
            return (s, )
        s = samples.copy()
        shape = s['samples'].shape
        size = tuple(int(round(dim * factor)) for dim in shape[-2:])
        if mode in ['linear', 'bilinear', 'bicubic', 'trilinear']:
            s["samples"] = torch.nn.functional.interpolate(
                s['samples'], size=size, mode=mode, align_corners=align)
        else:
            s["samples"] = torch.nn.functional.interpolate(s['samples'], size=size, mode=mode)
        return (s,)

```
