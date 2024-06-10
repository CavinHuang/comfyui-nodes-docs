---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Latent
## Documentation
- Class name: `LatentUpscale`
- Category: `latent`
- Output node: `False`

The LatentUpscale node is designed for upscaling latent representations of images. It allows for the adjustment of the output image's dimensions and the method of upscaling, providing flexibility in enhancing the resolution of latent images.
## Input types
### Required
- **`samples`**
    - The latent representation of an image to be upscaled. This parameter is crucial for determining the starting point of the upscaling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`upscale_method`**
    - Specifies the method used for upscaling the latent image. Different methods can affect the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - The desired width of the upscaled image. If set to 0, it will be calculated based on the height to maintain the aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The desired height of the upscaled image. If set to 0, it will be calculated based on the width to maintain the aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop`**
    - Determines how the upscaled image should be cropped, affecting the final appearance and dimensions of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The upscaled latent representation of the image, ready for further processing or generation.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)



## Source code
```python
class LatentUpscale:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "bislerp"]
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "samples": ("LATENT",), "upscale_method": (s.upscale_methods,),
                              "width": ("INT", {"default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                              "crop": (s.crop_methods,)}}
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "upscale"

    CATEGORY = "latent"

    def upscale(self, samples, upscale_method, width, height, crop):
        if width == 0 and height == 0:
            s = samples
        else:
            s = samples.copy()

            if width == 0:
                height = max(64, height)
                width = max(64, round(samples["samples"].shape[3] * height / samples["samples"].shape[2]))
            elif height == 0:
                width = max(64, width)
                height = max(64, round(samples["samples"].shape[2] * width / samples["samples"].shape[3]))
            else:
                width = max(64, width)
                height = max(64, height)

            s["samples"] = comfy.utils.common_upscale(samples["samples"], width // 8, height // 8, upscale_method, crop)
        return (s,)

```
