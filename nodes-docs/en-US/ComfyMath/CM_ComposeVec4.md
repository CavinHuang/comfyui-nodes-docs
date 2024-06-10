---
tags:
- VectorMath
---

# ComposeVec4
## Documentation
- Class name: `CM_ComposeVec4`
- Category: `math/conversion`
- Output node: `False`

The `CM_ComposeVec4` node is designed for the mathematical conversion of individual float values into a four-dimensional vector (Vec4). This operation is fundamental in various mathematical and graphical computations where a Vec4 representation is required.
## Input types
### Required
- **`x`**
    - Represents the first component of the Vec4, influencing its spatial or graphical representation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y`**
    - Denotes the second component of the Vec4, contributing to its spatial or graphical characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`z`**
    - Defines the third component of the Vec4, affecting its spatial or graphical attributes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`w`**
    - Indicates the fourth component of the Vec4, impacting its spatial or graphical representation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`vec4`**
    - Comfy dtype: `VEC4`
    - Outputs a four-dimensional vector (Vec4) constructed from the input float values.
    - Python dtype: `tuple[Vec4]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ComposeVec4:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "x": ("FLOAT", {"default": 0.0}),
                "y": ("FLOAT", {"default": 0.0}),
                "z": ("FLOAT", {"default": 0.0}),
                "w": ("FLOAT", {"default": 0.0}),
            }
        }

    RETURN_TYPES = ("VEC4",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, x: float, y: float, z: float, w: float) -> tuple[Vec4]:
        return ((x, y, z, w),)

```
