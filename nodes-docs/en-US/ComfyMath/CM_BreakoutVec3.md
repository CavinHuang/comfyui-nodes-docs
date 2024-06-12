---
tags:
- VectorMath
---

# BreakoutVec3
## Documentation
- Class name: `CM_BreakoutVec3`
- Category: `math/conversion`
- Output node: `False`

The node is designed to decompose a 3-dimensional vector into its individual components, facilitating operations that require access to the separate dimensions of a vector.
## Input types
### Required
- **`a`**
    - This parameter represents the 3-dimensional vector to be decomposed. It allows for operations on individual vector components by breaking down the vector into its x, y, and z components.
    - Comfy dtype: `VEC3`
    - Python dtype: `tuple[float, float, float]`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Each output represents one of the three components of the input vector, allowing for individual manipulation or analysis of the vector's dimensions.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BreakoutVec3:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("VEC3", {"default": VEC3_ZERO})}}

    RETURN_TYPES = ("FLOAT", "FLOAT", "FLOAT")
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: Vec3) -> tuple[float, float, float]:
        return (a[0], a[1], a[2])

```
