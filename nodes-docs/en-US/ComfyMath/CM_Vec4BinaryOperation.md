---
tags:
- Math
- VectorMath
---

# Vec4BinaryOperation
## Documentation
- Class name: `CM_Vec4BinaryOperation`
- Category: `math/vec4`
- Output node: `False`

The node CM_Vec4BinaryOperation performs binary operations on two 4-dimensional vectors (Vec4), resulting in a new Vec4 that represents the outcome of the operation. It abstracts complex vector arithmetic into simple, high-level operations, facilitating mathematical manipulations in vector space.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the vectors. It determines how the two Vec4 inputs will be combined to produce the output Vec4.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first 4-dimensional vector (Vec4) input for the binary operation. Acts as one of the operands in the vector arithmetic.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
- **`b`**
    - The second 4-dimensional vector (Vec4) input for the binary operation. Acts as the other operand in the vector arithmetic.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`vec4`**
    - Comfy dtype: `VEC4`
    - The result of the binary operation on the two Vec4 inputs, returned as a new Vec4.
    - Python dtype: `Vec4`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec4BinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_VEC4,
                "b": DEFAULT_VEC4,
            }
        }

    RETURN_TYPES = ("VEC4",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4, b: Vec4) -> tuple[Vec4]:
        return (
            _vec4_from_numpy(VEC_BINARY_OPERATIONS[op](numpy.array(a), numpy.array(b))),
        )

```
