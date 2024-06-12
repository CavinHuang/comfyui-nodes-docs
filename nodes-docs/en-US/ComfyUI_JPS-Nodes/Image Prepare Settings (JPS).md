---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# Image Prepare Settings (JPS)
## Documentation
- Class name: `Image Prepare Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to configure and prepare image settings for further processing or transformation. It allows for the customization of various parameters such as resizing, cropping, padding, and applying specific image adjustments like sharpening or interpolation, facilitating tailored image preparation workflows.
## Input types
### Required
- **`offset_width`**
    - The horizontal offset applied to the image, useful for precise positioning or adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_height`**
    - The vertical offset applied to the image, useful for precise positioning or adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_left`**
    - The amount of cropping from the left side of the image, allowing for tailored image composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_right`**
    - The amount of cropping from the right side of the image, allowing for tailored image composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_top`**
    - The amount of cropping from the top of the image, allowing for tailored image composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_bottom`**
    - The amount of cropping from the bottom of the image, allowing for tailored image composition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_left`**
    - The amount of padding added to the left side of the image, useful for framing or specific layout requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_right`**
    - The amount of padding added to the right side of the image, useful for framing or specific layout requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_top`**
    - The amount of padding added to the top of the image, useful for framing or specific layout requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_bottom`**
    - The amount of padding added to the bottom of the image, useful for framing or specific layout requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - Specifies the interpolation method used during resizing or transforming the image, affecting the image's smoothness and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - The level of sharpening applied to the image, enhancing detail and clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`imageprepare_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - The configured settings for image preparation, encapsulating all adjustments and transformations to be applied.
    - Python dtype: `Tuple[int, int, str, int, int, int, int, int, int, int, int, int, int, str, float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePrepare_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
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
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("imageprepare_settings",)
    FUNCTION = "get_imageprepare"

    CATEGORY="JPS Nodes/Settings"

    def get_imageprepare(self,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening):

        imageprepare_settings = offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening

        return(imageprepare_settings,)

```
