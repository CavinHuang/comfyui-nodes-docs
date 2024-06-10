---
tags:
- VectorMath
---

# BreakoutVec4
## Documentation
- Class name: `CM_BreakoutVec4`
- Category: `math/conversion`
- Output node: `False`

The node is designed to decompose a four-dimensional vector into its individual components, facilitating operations that require access to the separate elements of a Vec4.
## Input types
### Required
- **`a`**
    - This parameter represents the four-dimensional vector to be decomposed. It is crucial for the operation as it provides the vector whose components are to be extracted.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - Each output represents one of the four components of the input Vec4, allowing for individual manipulation or analysis.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BreakoutVec4:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {"required": {"a": ("VEC4", {"default": VEC4_ZERO})}}

    RETURN_TYPES = ("FLOAT", "FLOAT", "FLOAT", "FLOAT")
    FUNCTION = "op"
    CATEGORY = "math/conversion"

    def op(self, a: Vec4) -> tuple[float, float, float, float]:
        return (a[0], a[1], a[2], a[3])

```
