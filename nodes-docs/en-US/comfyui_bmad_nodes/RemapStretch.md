---
tags:
- ImageTransformation
---

# RemapStretch
## Documentation
- Class name: `RemapStretch`
- Category: `Bmad/CV/Transform`
- Output node: `False`

The RemapStretch node applies a stretching transformation to images, adjusting their geometry based on specified power factors along the x and y axes, centered around a given point. This node is designed to manipulate image dimensions in a non-linear fashion, offering a way to simulate or correct distortions.
## Input types
### Required
- **`power_x`**
    - Specifies the power factor for stretching along the x-axis. A higher value results in more pronounced stretching.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`power_y`**
    - Specifies the power factor for stretching along the y-axis. Similar to `power_x`, it controls the degree of stretching but in the vertical direction.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`center_x`**
    - Determines the horizontal center point of the stretch effect. Values range from 0 to 1, representing a percentage of the image's width.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`center_y`**
    - Determines the vertical center point of the stretch effect. Values range from 0 to 1, representing a percentage of the image's height.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`remap`**
    - Comfy dtype: `REMAP`
    - The output is a set of parameters or a transformation map that defines how the image should be stretched according to the input parameters. This map is used to adjust the image geometry for stretching effects.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapStretch(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return RemapPinch.INPUT_TYPES_DICT

    def send_remap(self, power_x, power_y, center_x, center_y):
        from .utils.remaps import remap_pinch_or_stretch
        return ({
                    "func": remap_pinch_or_stretch,
                    "xargs": [(1 / power_x, 1 / power_y), (center_x, center_y)]
                },)

```
