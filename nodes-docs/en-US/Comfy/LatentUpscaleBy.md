---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Latent By
## Documentation
- Class name: `LatentUpscaleBy`
- Category: `latent`
- Output node: `False`

The LatentUpscaleBy node is designed for upscaling latent representations of images. It allows for the adjustment of the scale factor and the method of upscaling, providing flexibility in enhancing the resolution of latent samples.
## Input types
### Required
- **`samples`**
    - The latent representation of images to be upscaled. This parameter is crucial for determining the input data that will undergo the upscaling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`upscale_method`**
    - Specifies the method used for upscaling the latent samples. The choice of method can significantly affect the quality and characteristics of the upscaled output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_by`**
    - Determines the factor by which the latent samples are scaled. This parameter directly influences the resolution of the output, allowing for precise control over the upscaling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The upscaled latent representation, ready for further processing or generation tasks. This output is essential for enhancing the resolution of generated images or for subsequent model operations.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - Reroute
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [LatentInterpolate](../../Comfy/Nodes/LatentInterpolate.md)



## Source code
```python
class LatentUpscaleBy:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "bislerp"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",), "upscale_method": (s.upscale_methods,),
                              "scale_by": ("FLOAT", {"default": 1.5, "min": 0.01, "max": 8.0, "step": 0.01}),}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "upscale"

    CATEGORY = "latent"

    def upscale(self, samples, upscale_method, scale_by):
        s = samples.copy()
        width = round(samples["samples"].shape[3] * scale_by)
        height = round(samples["samples"].shape[2] * scale_by)
        s["samples"] = comfy.utils.common_upscale(samples["samples"], width, height, upscale_method, "disabled")
        return (s,)

```
