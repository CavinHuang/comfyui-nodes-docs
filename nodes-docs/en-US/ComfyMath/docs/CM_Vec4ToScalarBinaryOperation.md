---
tags:
- Math
- VectorMath
---

# Vec4ToScalarBinaryOperation
## Documentation
- Class name: `CM_Vec4ToScalarBinaryOperation`
- Category: `math/vec4`
- Output node: `False`

This node performs a binary operation between two Vec4 vectors, resulting in a scalar value. It supports operations like dot product and distance calculation, transforming vector relationships into a single numerical outcome.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed, such as dot product or distance, affecting the scalar result.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first Vec4 vector operand in the binary operation.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
- **`b`**
    - The second Vec4 vector operand in the binary operation.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The scalar result of the binary operation between the two Vec4 vectors.
    - Python dtype: `float`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Vec4ToScalarBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_TO_SCALAR_BINARY_OPERATION.keys()),),
                "a": DEFAULT_VEC4,
                "b": DEFAULT_VEC4,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4, b: Vec4) -> tuple[float]:
        return (VEC_TO_SCALAR_BINARY_OPERATION[op](numpy.array(a), numpy.array(b)),)

```
