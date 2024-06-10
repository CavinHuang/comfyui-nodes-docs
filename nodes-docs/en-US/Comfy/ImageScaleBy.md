---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Image By
## Documentation
- Class name: `ImageScaleBy`
- Category: `image/upscaling`
- Output node: `False`

The ImageScaleBy node is designed for upscaling images by a specified scale factor using various interpolation methods. It allows for the adjustment of the image size in a flexible manner, catering to different upscaling needs.
## Input types
### Required
- **`image`**
    - The input image to be upscaled. This parameter is crucial as it provides the base image that will undergo the upscaling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_method`**
    - Specifies the interpolation method to be used for upscaling. The choice of method can affect the quality and characteristics of the upscaled image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scale_by`**
    - The factor by which the image will be upscaled. This determines the increase in size of the output image relative to the input image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled image, which is larger than the input image according to the specified scale factor and interpolation method.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [RIFE VFI](../../ComfyUI-Frame-Interpolation/Nodes/RIFE VFI.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)
    - Reroute
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [SaveImage](../../Comfy/Nodes/SaveImage.md)
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [SEGSPreview](../../ComfyUI-Impact-Pack/Nodes/SEGSPreview.md)
    - [ImageFilterSharpen](../../ComfyUI-Allor/Nodes/ImageFilterSharpen.md)



## Source code
```python
class ImageScaleBy:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",), "upscale_method": (s.upscale_methods,),
                              "scale_by": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 8.0, "step": 0.01}),}}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = "image/upscaling"

    def upscale(self, image, upscale_method, scale_by):
        samples = image.movedim(-1,1)
        width = round(samples.shape[3] * scale_by)
        height = round(samples.shape[2] * scale_by)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, "disabled")
        s = s.movedim(1,-1)
        return (s,)

```
