---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# InstantID Source Prepare Settings (JPS)
## Documentation
- Class name: `InstantID Source Prepare Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to prepare the settings for source image processing in the context of InstantID generation, focusing on aspects such as resizing, cropping, and flipping the source image to meet specific requirements for further processing steps.
## Input types
### Required
- **`resize_to`**
    - Determines the resizing strategy for the source image, affecting how it will be scaled to fit the desired dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`offset_width`**
    - Specifies the horizontal offset to apply during image processing, adjusting the image's position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_height`**
    - Specifies the vertical offset to apply during image processing, adjusting the image's position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_left`**
    - Defines the amount to crop from the left side of the image, tailoring its dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_right`**
    - Defines the amount to crop from the right side of the image, tailoring its dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_top`**
    - Defines the amount to crop from the top of the image, tailoring its dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_bottom`**
    - Defines the amount to crop from the bottom of the image, tailoring its dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - Specifies the interpolation method to be used for resizing the image, affecting image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Determines the level of sharpening to be applied to the image, enhancing its details.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`flip`**
    - Indicates whether the image should be flipped horizontally or vertically, altering its orientation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`imageprepare_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Encapsulates the configured settings for preparing the source image, including resizing, cropping, and flipping parameters.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDSourcePrepare_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resize_to": (["Resize to Target","Keep Size"],),
                "offset_width": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_height": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
                "flip": (["No", "X-Axis", "Y-Axis"],),                
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,resize_to,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip):

        resizeto = int (0)
        if(resize_to == "Keep Size"):
            resizeto = int(1)
        elif(resize_to == "Resize to Target"):
            resizeto = int(2)

        imageprepare_settings = resizeto, offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,interpolation,sharpening,flip

        return(imageprepare_settings,)

```
