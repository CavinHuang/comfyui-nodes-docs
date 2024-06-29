---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# InstantID Source Prepare Pipe (JPS)
## Documentation
- Class name: `InstantID Source Prepare Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

This node is designed to prepare source images for InstantID processing by applying a series of transformations such as resizing, cropping, and flipping. It allows for detailed customization of the image preparation process to fit specific requirements for InstantID analysis.
## Input types
### Required
- **`imageprepare_settings`**
    - Specifies the settings for preparing the source image, including resizing, cropping, and flipping parameters. This configuration directly influences the output image's dimensions and appearance, tailoring it for optimal InstantID processing.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, int, int, int, int, int, int, str, float, str]`
## Output types
- **`resize_to`**
    - Comfy dtype: `INT`
    - The target size to which the source image will be resized.
    - Python dtype: `int`
- **`offset_width`**
    - Comfy dtype: `INT`
    - The horizontal offset applied during the image preparation process.
    - Python dtype: `int`
- **`offset_height`**
    - Comfy dtype: `INT`
    - The vertical offset applied during the image preparation process.
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
- **`interpolation`**
    - Comfy dtype: `COMBO[STRING]`
    - The method used for resizing the image.
    - Python dtype: `str`
- **`sharpening`**
    - Comfy dtype: `FLOAT`
    - The level of sharpening applied to the image.
    - Python dtype: `float`
- **`flip`**
    - Comfy dtype: `COMBO[STRING]`
    - Specifies if the image should be flipped and along which axis.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDSourcePrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",["No", "X-Axis", "Y-Axis"],)
    RETURN_NAMES = ("resize_to","offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","interpolation","sharpening","flip",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip = imageprepare_settings

        return(resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip)

```
