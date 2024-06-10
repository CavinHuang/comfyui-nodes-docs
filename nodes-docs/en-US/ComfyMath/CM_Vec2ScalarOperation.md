---
tags:
- Math
- VectorMath
---

# Vec2ScalarOperation
## Documentation
- Class name: `CM_Vec2ScalarOperation`
- Category: `math/vec2`
- Output node: `False`

This node performs a scalar operation on a 2-dimensional vector, applying a specified operation (such as multiplication or division) between the vector and a scalar value. It abstracts complex vector arithmetic into simple, reusable logic.
## Input types
### Required
- **`op`**
    - Specifies the scalar operation to perform on the vector, such as multiplication or division, affecting the overall transformation of the vector.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The 2-dimensional vector to be operated on, serving as the primary operand in the scalar operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
- **`b`**
    - The scalar value to be used in the operation, acting as the secondary operand that modifies the vector.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`vec2`**
    - Comfy dtype: `VEC2`
    - The resulting 2-dimensional vector after applying the specified scalar operation.
    - Python dtype: `tuple[Vec2]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec2ScalarOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_SCALAR_OPERATION.keys()),),
                "a": DEFAULT_VEC2,
                "b": ("FLOAT",),
            }
        }

    RETURN_TYPES = ("VEC2",)
    FUNCTION = "op"
    CATEGORY = "math/vec2"

    def op(self, op: str, a: Vec2, b: float) -> tuple[Vec2]:
        return (_vec2_from_numpy(VEC_SCALAR_OPERATION[op](numpy.array(a), b)),)

```
