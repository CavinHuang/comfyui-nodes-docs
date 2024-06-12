---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# InstantID Mask Prepare Settings (JPS)
## Documentation
- Class name: `InstantID Mask Prepare Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to prepare settings for image masking in the context of InstantID processing. It configures various parameters such as mask type, resizing options, cropping, padding, and image interpolation, tailored to enhance and adjust the input image for optimal InstantID generation.
## Input types
### Required
- **`mask_type`**
    - Specifies the type of mask to be applied, such as 'Mask Editor' or 'Red from Image', affecting how the image is processed for InstantID.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
- **`resize_to`**
    - Determines the resizing strategy, like 'Keep Size' or 'Resize to Target', which impacts the dimensions of the processed image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resize_type`**
    - Defines the method of resizing, either by 'Crop' or 'Stretch', to fit the specified dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`offset_width`**
    - The horizontal offset applied to the image, adjusting its position relative to the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_height`**
    - The vertical offset applied to the image, adjusting its position relative to the mask.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_left`**
    - Specifies the amount to crop from the left edge of the image, customizing its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_right`**
    - Specifies the amount to crop from the right edge of the image, customizing its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_top`**
    - Specifies the amount to crop from the top edge of the image, customizing its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_bottom`**
    - Specifies the amount to crop from the bottom edge of the image, customizing its visible area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_left`**
    - The amount of padding to add on the left side of the image, affecting its final dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_right`**
    - The amount of padding to add on the right side of the image, affecting its final dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_top`**
    - The amount of padding to add on the top side of the image, affecting its final dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_bottom`**
    - The amount of padding to add on the bottom side of the image, affecting its final dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - The method used for resizing the image, such as 'lanczos' or 'bilinear', which influences the quality of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - The level of sharpening applied to the image, enhancing its clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`imageprepare_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - A tuple containing the configured settings for mask type, resizing, cropping, padding, and image processing parameters, ready for use in InstantID image preparation.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstantIDMaskPrepare_Settings:

    masktypes = ["No Mask","Mask Editor","Mask Editor (inverted)","Red from Image","Green from Image","Blue from Image"]        

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask_type": (s.masktypes,),
                "resize_to": (["Resize to Target","Resize to Source","Keep Size"],),
                "resize_type": (["Crop","Stretch"],),
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

    def get_imageprepare(self,mask_type,resize_to,resize_type,offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening):

        resizeto = int (0)
        if(resize_to == "Keep Size"):
            resizeto = int(1)
        elif(resize_to == "Resize to Target"):
            resizeto = int(2)
        elif(resize_to == "Resize to Source"):
            resizeto = int(3)

        resizetype = "Crop"
        if(resize_type == "Stretch"):
            resizetype = "Stretch"

        masktype = int(0)
        if(mask_type == "Mask Editor"):
            masktype = int(1)
        elif(mask_type == "Mask Editor (inverted)"):
            masktype = int(2)
        elif(mask_type == "Red from Image"):
            masktype = int(3)
        elif(mask_type == "Green from Image"):
            masktype = int(4)
        elif(mask_type == "Blue from Image"):
            masktype = int(5)

        imageprepare_settings = masktype, resizeto, resizetype, offset_width,offset_height,crop_left,crop_right,crop_top,crop_bottom,padding_left,padding_right,padding_top,padding_bottom,interpolation,sharpening

        return(imageprepare_settings,)

```
