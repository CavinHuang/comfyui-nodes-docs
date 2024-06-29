---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# InstantID Pose Prepare Settings (JPS)
## Documentation
- Class name: `InstantID Pose Prepare Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure settings for preparing images for Instant ID Pose processing. It allows users to specify various parameters related to image preparation, such as resizing, cropping, padding, and more, to ensure images are optimally prepared for pose detection and analysis.
## Input types
### Required
- **`resize_to`**
    - Determines how the image should be resized, with options like 'Keep Size', 'Resize to Target', and 'Resize to Source', affecting the final dimensions of the prepared image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`offset_width`**
    - Specifies the horizontal offset to apply to the image, adjusting its position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_height`**
    - Specifies the vertical offset to apply to the image, adjusting its position.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_left`**
    - Defines the amount to crop from the left side of the image, adjusting its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_right`**
    - Defines the amount to crop from the right side of the image, adjusting its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_top`**
    - Defines the amount to crop from the top of the image, adjusting its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_bottom`**
    - Defines the amount to crop from the bottom of the image, adjusting its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_left`**
    - Specifies the amount of padding to add to the left side of the image, expanding its border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_right`**
    - Specifies the amount of padding to add to the right side of the image, expanding its border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_top`**
    - Specifies the amount of padding to add to the top of the image, expanding its border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_bottom`**
    - Specifies the amount of padding to add to the bottom of the image, expanding its border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - Determines the method used for resizing or transforming the image, such as 'nearest', 'bilinear', etc.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Specifies the intensity of the sharpening effect applied to the image, enhancing its details.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`flip`**
    - Indicates whether the image should be flipped horizontally, vertically, or not at all, affecting its orientation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`imageprepare_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - The tuple containing all the specified settings for image preparation, ready to be applied for pose processing.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDPosePrepare_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "resize_to": (["Resize to Target","Resize to Source","Keep Size"],),
                "offset_width": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_height": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "padding_left": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_right": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_top": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_bottom": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", { "default": 0.0, "min": 0, "max": 1, "step": 0.05, "display": "number" }),
                "flip": (["No", "X-Axis", "Y-Axis"],),      
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,resize_to,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip):

        resizeto = int (0)
        if(resize_to == "Keep Size"):
            resizeto = int(1)
        elif(resize_to == "Resize to Target"):
            resizeto = int(2)
        elif(resize_to == "Resize to Source"):
            resizeto = int(3)

        imageprepare_settings = resizeto, offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening,flip

        return(imageprepare_settings,)

```
