---
tags:
- Math
- VectorMath
---

# Vec3BinaryOperation
## Documentation
- Class name: `CM_Vec3BinaryOperation`
- Category: `math/vec3`
- Output node: `False`

Performs binary operations on two 3-dimensional vectors, resulting in a new 3-dimensional vector. This node abstracts complex vector arithmetic into simple, high-level operations.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to perform on the vectors, such as addition or subtraction, influencing the result of the operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first 3-dimensional vector operand in the binary operation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
- **`b`**
    - The second 3-dimensional vector operand in the binary operation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
## Output types
- **`vec3`**
    - Comfy dtype: `VEC3`
    - The resulting 3-dimensional vector after performing the specified binary operation on the input vectors.
    - Python dtype: `tuple[Vec3]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3BinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_VEC3,
                "b": DEFAULT_VEC3,
            }
        }

    RETURN_TYPES = ("VEC3",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3, b: Vec3) -> tuple[Vec3]:
        return (
            _vec3_from_numpy(VEC_BINARY_OPERATIONS[op](numpy.array(a), numpy.array(b))),
        )

```
