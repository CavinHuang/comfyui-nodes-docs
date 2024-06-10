---
tags:
- VectorMath
---

# BreakoutVec2
## Documentation
- Class name: `CM_BreakoutVec2`
- Category: `math/conversion`
- Output node: `False`

The CM_BreakoutVec2 node is designed for decomposing a 2-dimensional vector into its individual components, facilitating operations that require access to the separate x and y values.
## Input types
### Required
- **`a`**
    - The 'a' parameter represents the 2-dimensional vector to be decomposed. It allows for operations on vectors by breaking them down into their individual x and y components.
    - Comfy dtype: `VEC2`
    - Python dtype: `tuple[float, float]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The output consists of two float values, representing the x and y components of the input vector, respectively.
    - Python dtype: `tuple[float, float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BreakoutVec2:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("VEC2", {"default": VEC2_ZERO})}}

    RETURN_TYPES = ("FLOAT", "FLOAT")
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: Vec2) -> tuple[float, float]:
        return (a[0], a[1])

```
