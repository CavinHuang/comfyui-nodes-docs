---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# ImageScaleToTotalPixels
## Documentation
- Class name: `ImageScaleToTotalPixels`
- Category: `image/upscaling`
- Output node: `False`

The ImageScaleToTotalPixels node is designed for resizing images to a specified total number of pixels while maintaining the aspect ratio. It provides various methods for upscaling the image to achieve the desired pixel count.
## Input types
### Required
- **`image`**
    - The input image to be upscaled to the specified total number of pixels.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_method`**
    - The method used for upscaling the image. It affects the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`megapixels`**
    - The target size of the image in megapixels. This determines the total number of pixels in the upscaled image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled image with the specified total number of pixels, maintaining the original aspect ratio.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [GetImageSize](../../stability-ComfyUI-nodes/Nodes/GetImageSize.md)
    - [ImageBatch](../../Comfy/Nodes/ImageBatch.md)
    - [DWPreprocessor](../../comfyui_controlnet_aux/Nodes/DWPreprocessor.md)
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImpactImageInfo](../../ComfyUI-Impact-Pack/Nodes/ImpactImageInfo.md)
    - Reroute
    - [ControlNetApply](../../Comfy/Nodes/ControlNetApply.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class ImageScaleToTotalPixels:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos"]
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",), "upscale_method": (s.upscale_methods,),
                              "megapixels": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 16.0, "step": 0.01}),
                            }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = "image/upscaling"

    def upscale(self, image, upscale_method, megapixels):
        samples = image.movedim(-1,1)
        total = int(megapixels * 1024 * 1024)

        scale_by = math.sqrt(total / (samples.shape[3] * samples.shape[2]))
        width = round(samples.shape[3] * scale_by)
        height = round(samples.shape[2] * scale_by)

        s = comfy.utils.common_upscale(samples, width, height, upscale_method, "disabled")
        s = s.movedim(1,-1)
        return (s,)

```
