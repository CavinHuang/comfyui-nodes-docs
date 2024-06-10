---
tags:
- Math
- VectorMath
---

# Vec4ToScalarUnaryOperation
## Documentation
- Class name: `CM_Vec4ToScalarUnaryOperation`
- Category: `math/vec4`
- Output node: `False`

This node performs unary operations on a 4-dimensional vector (Vec4) to produce a scalar value. It supports a variety of operations that can transform a Vec4 into a single floating-point number, emphasizing the node's ability to abstract and reduce vectorial data into a simpler form.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the Vec4. The choice of operation determines how the vector is transformed into a scalar value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The Vec4 on which the unary operation is to be performed. This vector serves as the input for the transformation process.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The resulting scalar value obtained from applying the specified unary operation on the Vec4 input.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec4ToScalarUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_TO_SCALAR_UNARY_OPERATION.keys()),),
                "a": DEFAULT_VEC4,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4) -> tuple[float]:
        return (VEC_TO_SCALAR_UNARY_OPERATION[op](numpy.array(a)),)

```
