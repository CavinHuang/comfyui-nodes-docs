---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# InstantID Mask Prepare Pipe (JPS)
## Documentation
- Class name: `InstantID Mask Prepare Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The InstantIDMaskPrepare_Pipe node is designed for preparing image masks with specific configurations for Instant ID generation. It processes settings to adjust image preparation parameters such as resizing, cropping, padding, and interpolation, tailored for mask generation in the context of identity verification or similar applications.
## Input types
### Required
- **`imageprepare_settings`**
    - Specifies the settings for preparing the image mask, including resizing, cropping, padding, and interpolation details, which are crucial for the mask's final appearance and alignment.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[str, int, str, int, int, int, int, int, int, int, int, int, int, str, float]`
## Output types
- **`mask_type`**
    - Comfy dtype: `INT`
    - Indicates the type of mask generated.
    - Python dtype: `int`
- **`resize_to`**
    - Comfy dtype: `INT`
    - Specifies the target size to which the image should be resized.
    - Python dtype: `int`
- **`resize_type`**
    - Comfy dtype: `COMBO[STRING]`
    - Describes the method used for resizing the image, such as cropping or stretching.
    - Python dtype: `str`
- **`offset_width`**
    - Comfy dtype: `INT`
    - The width offset applied during image preparation.
    - Python dtype: `int`
- **`offset_height`**
    - Comfy dtype: `INT`
    - The height offset applied during image preparation.
    - Python dtype: `int`
- **`crop_left`**
    - Comfy dtype: `INT`
    - The amount of pixels cropped from the left side of the image.
    - Python dtype: `int`
- **`crop_right`**
    - Comfy dtype: `INT`
    - The amount of pixels cropped from the right side of the image.
    - Python dtype: `int`
- **`crop_top`**
    - Comfy dtype: `INT`
    - The amount of pixels cropped from the top of the image.
    - Python dtype: `int`
- **`crop_bottom`**
    - Comfy dtype: `INT`
    - The amount of pixels cropped from the bottom of the image.
    - Python dtype: `int`
- **`padding_left`**
    - Comfy dtype: `INT`
    - The amount of padding added to the left side of the image.
    - Python dtype: `int`
- **`padding_right`**
    - Comfy dtype: `INT`
    - The amount of padding added to the right side of the image.
    - Python dtype: `int`
- **`padding_top`**
    - Comfy dtype: `INT`
    - The amount of padding added to the top of the image.
    - Python dtype: `int`
- **`padding_bottom`**
    - Comfy dtype: `INT`
    - The amount of padding added to the bottom of the image.
    - Python dtype: `int`
- **`interpolation`**
    - Comfy dtype: `COMBO[STRING]`
    - The interpolation method used for resizing the image, affecting the image quality.
    - Python dtype: `str`
- **`sharpening`**
    - Comfy dtype: `FLOAT`
    - The level of sharpening applied to the image, enhancing detail visibility.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDMaskPrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT",["Crop","Stretch"],"INT","INT","INT","INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",)
    RETURN_NAMES = ("mask_type","resize_to","resize_type","offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","padding_left","padding_right","padding_top","padding_bottom","interpolation","sharpening",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        masktype,resizeto,resizetype,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening = imageprepare_settings

        return(masktype,resizeto,resizetype,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening)

```
