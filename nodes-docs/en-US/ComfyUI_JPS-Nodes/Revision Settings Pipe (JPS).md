---
tags:
- Image
---

# Revision Settings Pipe (JPS)
## Documentation
- Class name: `Revision Settings Pipe (JPS)`
- Category: `JPS Nodes/Pipes`
- Output node: `False`

The Revision Settings Pipe node is designed to process and adjust image revision settings, facilitating the customization of image processing parameters such as cropping, interpolation, and noise augmentation. It serves as a configurable pipeline component within image processing workflows, enabling precise control over the revision effects applied to images.
## Input types
### Required
- **`revision_settings`**
    - Specifies the settings for image revision, including resolution, interpolation method, cropping preferences, offsets, strengths, and noise augmentation levels. This input is crucial for determining how the image will be modified during the revision process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `Tuple[str, List[str], str, int, str, int, float, float, float, float]`
## Output types
- **`crop_res`**
    - Comfy dtype: `INT`
    - The resolution to which the image will be cropped.
    - Python dtype: `int`
- **`crop_intpol`**
    - Comfy dtype: `COMBO[STRING]`
    - The interpolation method used for cropping the image.
    - Python dtype: `List[str]`
- **`rev1_crop`**
    - Comfy dtype: `COMBO[STRING]`
    - Specifies the first revision cropping preference.
    - Python dtype: `str`
- **`rev1_offset`**
    - Comfy dtype: `INT`
    - The offset applied during the first revision.
    - Python dtype: `int`
- **`rev2_crop`**
    - Comfy dtype: `COMBO[STRING]`
    - Specifies the second revision cropping preference.
    - Python dtype: `str`
- **`rev2_offset`**
    - Comfy dtype: `INT`
    - The offset applied during the second revision.
    - Python dtype: `int`
- **`rev1_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the first revision effect.
    - Python dtype: `float`
- **`rev2_strength`**
    - Comfy dtype: `FLOAT`
    - The strength of the second revision effect.
    - Python dtype: `float`
- **`rev1_noiseaug`**
    - Comfy dtype: `FLOAT`
    - The level of noise augmentation applied during the first revision.
    - Python dtype: `float`
- **`rev2_noiseaug`**
    - Comfy dtype: `FLOAT`
    - The level of noise augmentation applied during the second revision.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Revision_Settings_Pipe:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "revision_settings": ("BASIC_PIPE",),
            }
        }
    RETURN_TYPES = ("INT",["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],["center","top", "bottom", "left", "right"],"INT",["center","top", "bottom", "left", "right"],"INT","FLOAT","FLOAT","FLOAT","FLOAT",)
    RETURN_NAMES = ("crop_res", "crop_intpol", "rev1_crop", "rev1_offset", "rev2_crop", "rev2_offset", "rev1_strength", "rev2_strength", "rev1_noiseaug", "rev2_noiseaug",)
    FUNCTION = "get_revmode"

    CATEGORY="JPS Nodes/Pipes"

    def get_revmode(self,revision_settings):

        crop_res,crop_intpol,rev1_crop,rev1_offset,rev2_crop,rev2_offset,rev1strength,rev2strength,rev1noiseaug,rev2noiseaug = revision_settings

        return(int(crop_res),crop_intpol,rev1_crop,int(rev1_offset),rev2_crop,int(rev2_offset),float(rev1strength),float(rev2strength),float(rev1noiseaug),float(rev2noiseaug),)

```
