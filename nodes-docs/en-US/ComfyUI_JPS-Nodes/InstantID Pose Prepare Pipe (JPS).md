---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# InstantID Pose Prepare Pipe (JPS)
## Documentation
- Class name: `InstantID Pose Prepare Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The InstantIDPosePrepare_Pipe node is designed for preparing image settings specifically tailored for pose estimation in the context of Instant ID generation. It processes various image preparation parameters such as resizing, cropping, padding, and interpolation to optimize images for subsequent pose analysis.
## Input types
### Required
- **`imageprepare_settings`**
    - Specifies the settings for preparing an image, including resizing, cropping, padding, and interpolation, crucial for optimizing the image for pose estimation.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[str]`
## Output types
- **`resize_to`**
    - Comfy dtype: `INT`
    - The target size to which the image should be resized.
    - Python dtype: `int`
- **`offset_width`**
    - Comfy dtype: `INT`
    - The width offset applied to the image.
    - Python dtype: `int`
- **`offset_height`**
    - Comfy dtype: `INT`
    - The height offset applied to the image.
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
    - The interpolation method used for resizing the image.
    - Python dtype: `List[str]`
- **`sharpening`**
    - Comfy dtype: `FLOAT`
    - The level of sharpening applied to the image.
    - Python dtype: `float`
- **`flip`**
    - Comfy dtype: `COMBO[STRING]`
    - Specifies if the image should be flipped and along which axis.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDPosePrepare_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "imageprepare_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT","INT","INT","INT","INT","INT","INT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT",["No", "X-Axis", "Y-Axis"],)
    RETURN_NAMES = ("resize_to","offset_width","offset_height","crop_left","crop_right","crop_top","crop_bottom","padding_left","padding_right","padding_top","padding_bottom","interpolation","sharpening","flip")
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Pipes"

    def get_imageprepare(self,imageprepare_settings):

        resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip = imageprepare_settings

        return(resizeto,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip)

```
