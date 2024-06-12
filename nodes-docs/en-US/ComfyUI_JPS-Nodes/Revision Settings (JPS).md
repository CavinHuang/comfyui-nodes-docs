---
tags:
- Image
---

# Revision Settings (JPS)
## Documentation
- Class name: `Revision Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

The Revision Settings (JPS) node is designed to configure and apply various revision settings for image processing tasks. It allows for the adjustment of parameters such as strength and noise augmentation for revisions, as well as crop and offset settings, providing a flexible tool for fine-tuning image revisions.
## Input types
### Required
- **`rev1_strength`**
    - Defines the strength of the first revision. It influences the intensity of the applied adjustments, affecting the overall impact on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rev2_strength`**
    - Specifies the strength of the second revision. This parameter controls the intensity of adjustments for the second revision, impacting the final image outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rev1_noiseaug`**
    - Determines the level of noise augmentation for the first revision. It adds noise to the image, simulating various effects or enhancing realism.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rev2_noiseaug`**
    - Sets the noise augmentation level for the second revision, adding noise to simulate effects or enhance the image's realism.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rev1_crop`**
    - Specifies the cropping area for the first revision. It defines how the image is cropped, affecting the composition and focus area.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rev1_offset`**
    - Defines the offset for the first revision's crop. It adjusts the crop's position, allowing for precise control over the image's framing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rev2_crop`**
    - Indicates the cropping area for the second revision. This parameter determines the cropping strategy, influencing the image's composition and focus.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rev2_offset`**
    - Sets the offset for the second revision's crop, adjusting its position for targeted framing and composition adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_intpol`**
    - Specifies the interpolation method for cropping. It affects the quality and appearance of the cropped area, offering various options for different effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop_res`**
    - Defines the resolution for cropping. It determines the size of the cropped area, impacting the detail and scale of the final image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`revision_settings`**
    - Comfy dtype: `BASIC_PIPE`
    - Outputs the configured revision settings as a tuple, ready for application in image processing tasks.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Revision_Settings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "rev1_strength": ("FLOAT", {"default": 1, "min": 0, "max": 10, "step": 0.1}),
                "rev2_strength": ("FLOAT", {"default": 1, "min": 0, "max": 10, "step": 0.1}),

                "rev1_noiseaug": ("FLOAT", {"default": 0, "min": 0, "max": 1, "step": 0.1}),
                "rev2_noiseaug": ("FLOAT", {"default": 0, "min": 0, "max": 1, "step": 0.1}),

                "rev1_crop": (["center","top", "bottom", "left", "right"],),
                "rev1_offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),

                "rev2_crop": (["center","top", "bottom", "left", "right"],),
                "rev2_offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),                

                "crop_intpol": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),                
                "crop_res": ("INT", { "default": 224 , "min": 224, "max": 1792, "step": 224, "display": "number" }),
            }
        }
    RETURN_TYPES = ("BASIC_PIPE",)
    RETURN_NAMES = ("revision_settings",)
    FUNCTION = "get_revmode"

    CATEGORY="JPS Nodes/Settings"

    def get_revmode(self,crop_res,crop_intpol,rev1_crop,rev1_offset,rev2_crop,rev2_offset,rev1_strength,rev2_strength,rev1_noiseaug,rev2_noiseaug,):
        rev1strength = 0
        rev1noiseaug = 0 
        rev2strength = 0
        rev2noiseaug = 0 
 
        rev1strength = rev1_strength
        rev1noiseaug = rev1_noiseaug
        rev2strength = rev2_strength
        rev2noiseaug = rev2_noiseaug

        revision_settings = crop_res,crop_intpol,rev1_crop,rev1_offset,rev2_crop,rev2_offset,rev1strength,rev2strength,rev1noiseaug,rev2_noiseaug

        return(revision_settings,)

```
