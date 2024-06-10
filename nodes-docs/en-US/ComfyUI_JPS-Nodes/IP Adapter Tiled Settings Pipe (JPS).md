---
tags:
- Image
- ImagePreprocessing
---

# IP Adapter Tiled Settings Pipe (JPS)
## Documentation
- Class name: `IP Adapter Tiled Settings Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The IP Adapter Tiled Settings Pipe node is designed to configure and apply image processing adapter settings for tiled images. It allows for the customization of various image processing parameters to enhance or modify the tiled images according to the specified settings.
## Input types
### Required
- **`ip_adapter_settings`**
    - Defines the comprehensive configuration for image processing adapter settings tailored for tiled images, impacting the processing and enhancement outcomes by adjusting parameters such as model, weight types, noise levels, and more.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[str, str, float, float, float, float, int, float, int, int, int, int, str, float]`
## Output types
- **`ipa_model`**
    - Comfy dtype: `INT`
    - The model used for image processing.
    - Python dtype: `str`
- **`ipa_wtype`**
    - Comfy dtype: `COMBO[STRING]`
    - The weight type applied during image processing.
    - Python dtype: `List[str]`
- **`ipa_weight`**
    - Comfy dtype: `FLOAT`
    - The weight applied to the image processing.
    - Python dtype: `float`
- **`ipa_noise`**
    - Comfy dtype: `FLOAT`
    - The noise level applied to the image.
    - Python dtype: `float`
- **`ipa_start`**
    - Comfy dtype: `FLOAT`
    - The start point for image processing.
    - Python dtype: `float`
- **`ipa_end`**
    - Comfy dtype: `FLOAT`
    - The end point for image processing.
    - Python dtype: `float`
- **`tile_short`**
    - Comfy dtype: `INT`
    - The short side length of the tile.
    - Python dtype: `int`
- **`tile_weight`**
    - Comfy dtype: `FLOAT`
    - The weight applied to the tile.
    - Python dtype: `float`
- **`zoom`**
    - Comfy dtype: `INT`
    - The zoom level applied to the image.
    - Python dtype: `int`
- **`offset_w`**
    - Comfy dtype: `INT`
    - The width offset applied to the image.
    - Python dtype: `int`
- **`offset_h`**
    - Comfy dtype: `INT`
    - The height offset applied to the image.
    - Python dtype: `int`
- **`prepare_type`**
    - Comfy dtype: `INT`
    - The preparation type used for the image.
    - Python dtype: `int`
- **`prepare_intpol`**
    - Comfy dtype: `COMBO[STRING]`
    - The interpolation method used for image preparation.
    - Python dtype: `str`
- **`prepare_sharpening`**
    - Comfy dtype: `FLOAT`
    - The sharpening level applied to the image.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IP_Adapter_Tiled_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "ip_adapter_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT",["linear", "ease in", "ease out", "ease in-out", "reverse in-out", "weak input", "weak output", "weak middle", "strong middle"],"FLOAT","FLOAT","FLOAT","FLOAT","INT","FLOAT","INT","INT","INT","INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],"FLOAT")
    RETURN_NAMES = ("ipa_model","ipa_wtype","ipa_weight","ipa_noise","ipa_start","ipa_end","tile_short","tile_weight","zoom","offset_w","offset_h","prepare_type","prepare_intpol","prepare_sharpening")
    FUNCTION = "get_ipatiled"

    CATEGORY="JPS Nodes/Pipes"

    def get_ipatiled(self,ip_adapter_settings):

        ipamodel,ipa_wtype,ipa_weight,ipa_noise,ipa_start,ipa_end,tile_short,tile_weight,zoom,offset_w,offset_h,preparetype,prepare_intpol,prepare_sharpening = ip_adapter_settings

        return(ipamodel,ipa_wtype,ipa_weight,ipa_noise,ipa_start,ipa_end,tile_short,tile_weight,zoom,offset_w,offset_h,preparetype,prepare_intpol,prepare_sharpening)

```
