---
tags:
- VectorMath
---

# ComposeVec2
## Documentation
- Class name: `CM_ComposeVec2`
- Category: `math/conversion`
- Output node: `False`

The CM_ComposeVec2 node is designed to construct a 2-dimensional vector from individual scalar components, facilitating the conversion of separate scalar values into a structured vector format.
## Input types
### Required
- **`x`**
    - The 'x' parameter represents the x-coordinate of the 2-dimensional vector. It plays a crucial role in defining the vector's horizontal component.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`y`**
    - The 'y' parameter represents the y-coordinate of the 2-dimensional vector. It is essential for defining the vector's vertical component.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`vec2`**
    - Comfy dtype: `VEC2`
    - Outputs a 2-dimensional vector constructed from the input scalar values, encapsulating both the horizontal and vertical components.
    - Python dtype: `tuple[Vec2]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ComposeVec2:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "x": ("FLOAT", {"default": 0.0}),
                "y": ("FLOAT", {"default": 0.0}),
            }
        }

    RETURN_TYPES = ("VEC2",)
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, x: float, y: float) -> tuple[Vec2]:
        return ((x, y),)

```
