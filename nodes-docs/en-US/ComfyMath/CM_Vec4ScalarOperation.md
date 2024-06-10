---
tags:
- Math
- VectorMath
---

# Vec4ScalarOperation
## Documentation
- Class name: `CM_Vec4ScalarOperation`
- Category: `math/vec4`
- Output node: `False`

Performs scalar operations on 4-dimensional vectors, allowing for the manipulation of vector components with a scalar value. This node abstracts mathematical operations such as multiplication or division, facilitating vector transformations in a 4D space.
## Input types
### Required
- **`op`**
    - Specifies the scalar operation to be performed on the vector, such as multiplication or division, influencing the resulting vector transformation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The 4-dimensional vector to be transformed, serving as the primary operand in the scalar operation.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
- **`b`**
    - The scalar value to be applied to the vector, acting as the secondary operand in the operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`vec4`**
    - Comfy dtype: `VEC4`
    - The transformed 4-dimensional vector resulting from the specified scalar operation.
    - Python dtype: `tuple[Vec4]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec4ScalarOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_SCALAR_OPERATION.keys()),),
                "a": DEFAULT_VEC4,
                "b": ("FLOAT",),
            }
        }

    RETURN_TYPES = ("VEC4",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4, b: float) -> tuple[Vec4]:
        return (_vec4_from_numpy(VEC_SCALAR_OPERATION[op](numpy.array(a), b)),)

```
