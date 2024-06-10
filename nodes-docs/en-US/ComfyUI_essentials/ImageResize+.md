---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# 🔧 Image Resize
## Documentation
- Class name: `ImageResize+`
- Category: `essentials`
- Output node: `False`

The ImageResize+ node is designed to adjust the size of an image to specified dimensions, offering a fundamental operation in image processing that can be crucial for both preprocessing before further analysis or modification, and for adapting images to fit specific display or storage requirements.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the image data to be resized. It is central to the node's operation, determining the source image that will undergo resizing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - The 'width' parameter specifies the target width for the resizing operation. It directly influences the horizontal dimension of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The 'height' parameter specifies the target height for the resizing operation. It directly influences the vertical dimension of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - The 'interpolation' parameter defines the method used for resizing, affecting the quality and characteristics of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`keep_proportion`**
    - The 'keep_proportion' parameter determines whether the original aspect ratio of the image should be preserved during resizing.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`condition`**
    - The 'condition' parameter allows for conditional execution of the resizing based on specific criteria.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`multiple_of`**
    - The 'multiple_of' parameter ensures the dimensions of the resized image are multiples of a specified value, useful for certain processing or model input requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - unknown
    - Python dtype: `unknown`
- **`width`**
    - Comfy dtype: `INT`
    - The output 'width' represents the actual width of the resized image.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The output 'height' represents the actual height of the resized image.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - SetNode
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [PrepImageForClipVision](../../ComfyUI_IPAdapter_plus/Nodes/PrepImageForClipVision.md)



## Source code
```python
class ImageResize:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "width": ("INT", { "default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8, }),
                "height": ("INT", { "default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 8, }),
                "interpolation": (["nearest", "bilinear", "bicubic", "area", "nearest-exact", "lanczos"],),
                "keep_proportion": ("BOOLEAN", { "default": False }),
                "condition": (["always", "downscale if bigger", "upscale if smaller"],),
                "multiple_of": ("INT", { "default": 0, "min": 0, "max": 512, "step": 1, }),
            }
        }

    RETURN_TYPES = ("IMAGE", "INT", "INT",)
    RETURN_NAMES = ("IMAGE", "width", "height",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, width, height, keep_proportion, interpolation="nearest", condition="always", multiple_of=0):
        _, oh, ow, _ = image.shape

        if keep_proportion is True:
            if width == 0 and oh < height:
                width = MAX_RESOLUTION
            elif width == 0 and oh >= height:
                width = ow

            if height == 0 and ow < width:
                height = MAX_RESOLUTION
            elif height == 0 and ow >= width:
                height = ow

            #width = ow if width == 0 else width
            #height = oh if height == 0 else height
            ratio = min(width / ow, height / oh)
            width = round(ow*ratio)
            height = round(oh*ratio)
        else:
            if width == 0:
                width = ow
            if height == 0:
                height = oh

        if multiple_of > 1:
            width = width - (width % multiple_of)
            height = height - (height % multiple_of)

        outputs = p(image)

        if "always" in condition or ("bigger" in condition and (oh > height or ow > width)) or ("smaller" in condition and (oh < height or ow < width)):
            if interpolation == "lanczos":
                outputs = comfy.utils.lanczos(outputs, width, height)
            else:
                outputs = F.interpolate(outputs, size=(height, width), mode=interpolation)

        outputs = pb(outputs)

        return(outputs, outputs.shape[2], outputs.shape[1],)

```
