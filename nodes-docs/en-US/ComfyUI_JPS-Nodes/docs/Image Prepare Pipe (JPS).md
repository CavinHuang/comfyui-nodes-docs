---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# Image Prepare Pipe (JPS)
## Documentation
- Class name: `Image Prepare Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The Image Prepare Pipe node is designed to configure and apply various preprocessing steps to images before they are processed further. This includes setting parameters for resizing, cropping, padding, interpolation, and sharpening to prepare images for optimal processing in subsequent stages.
## Input types
### Required
- **`imageprepare_settings`**
    - Specifies the settings for image preparation, including resizing, cropping, padding, interpolation, and sharpening. This configuration is crucial for tailoring the image processing pipeline to the specific needs of the application.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[int, int, str, int, int, int, int, int, int, int, int, str, float]`
## Output types
- **`offset_width`**
    - Comfy dtype: `INT`
    - The horizontal offset applied to the image during preparation.
    - Python dtype: `int`
- **`offset_height`**
    - Comfy dtype: `INT`
    - The vertical offset applied to the image during preparation.
    - Python dtype: `int`
- **`crop_left`**
    - Comfy dtype: `INT`
    - The amount of cropping from the left side of the image.
    - Python dtype: `int`
- **`crop_right`**
    - Comfy dtype: `INT`
    - The amount of cropping from the right side of the image.
    - Python dtype: `int`
- **`crop_top`**
    - Comfy dtype: `INT`
    - The amount of cropping from the top of the image.
    - Python dtype: `int`
- **`crop_bottom`**
    - Comfy dtype: `INT`
    - The amount of cropping from the bottom of the image.
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
    - The interpolation method used during image resizing.
    - Python dtype: `str`
- **`sharpening`**
    - Comfy dtype: `FLOAT`
    - The level of sharpening applied to the image.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",)
    RETURN_NAMES = ("offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","padding_left","padding_right","padding_top","padding_bottom","interpolation","sharpening",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening = imageprepare_settings

        return(offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening)

```
