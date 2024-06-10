---
tags:
- ImageTransformation
---

# RemapPinch
## Documentation
- Class name: `RemapPinch`
- Category: `Bmad/CV/Transform`
- Output node: `False`

The RemapPinch node is designed to apply a pinch distortion effect to images, allowing for the manipulation of image geometry around a specified center point with varying degrees of power.
## Input types
### Required
- **`power_x`**
    - Specifies the degree of horizontal pinch effect to apply. Higher values result in more pronounced pinching.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`power_y`**
    - Specifies the degree of vertical pinch effect to apply. Higher values result in more pronounced pinching.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`center_x`**
    - Determines the horizontal center around which the pinch effect is applied. Values range from 0 to 1, representing the width of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`center_y`**
    - Determines the vertical center around which the pinch effect is applied. Values range from 0 to 1, representing the height of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - This node returns a remap output, which is used to apply the specified pinch distortion effect to the image.
    - Python dtype: `Tuple[np.ndarray, np.ndarray, NoneType]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapPinch(RemapBase):
    INPUT_TYPES_DICT = {
        "required": {
            "power_x": ("FLOAT", {"default": 1, "min": 1, "max": 3, "step": .05}),
            "power_y": ("FLOAT", {"default": 1, "min": 1, "max": 3, "step": .05}),
            "center_x": ("FLOAT", {"default": .5, "min": 0, "max": 1, "step": .05}),
            "center_y": ("FLOAT", {"default": .5, "min": 0, "max": 1, "step": .05}),
        }
    }

    @classmethod
    def INPUT_TYPES(s):
        return RemapPinch.INPUT_TYPES_DICT

    def send_remap(self, power_x, power_y, center_x, center_y):
        from .utils.remaps import remap_pinch_or_stretch
        return ({
                    "func": remap_pinch_or_stretch,
                    "xargs": [(power_x, power_y), (center_x, center_y)]
                },)

```
