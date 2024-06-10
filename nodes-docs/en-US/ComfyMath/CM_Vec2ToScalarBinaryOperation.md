---
tags:
- Math
- VectorMath
---

# Vec2ToScalarBinaryOperation
## Documentation
- Class name: `CM_Vec2ToScalarBinaryOperation`
- Category: `math/vec2`
- Output node: `False`

This node performs a binary operation between two 2-dimensional vectors, resulting in a scalar value. It abstracts mathematical operations that take two vectors as input and produce a single scalar output, such as dot product or distance calculation.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the vectors. It affects the nature of the scalar result obtained from the operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first 2-dimensional vector involved in the binary operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
- **`b`**
    - The second 2-dimensional vector involved in the binary operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The scalar result of the binary operation performed on the two vectors.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec2ToScalarBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_TO_SCALAR_BINARY_OPERATION.keys()),),
                "a": DEFAULT_VEC2,
                "b": DEFAULT_VEC2,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/vec2"

    def op(self, op: str, a: Vec2, b: Vec2) -> tuple[float]:
        return (VEC_TO_SCALAR_BINARY_OPERATION[op](numpy.array(a), numpy.array(b)),)

```
