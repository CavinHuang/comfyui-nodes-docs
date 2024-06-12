---
tags:
- Math
- VectorMath
---

# Vec3ToScalarUnaryOperation
## Documentation
- Class name: `CM_Vec3ToScalarUnaryOperation`
- Category: `math/vec3`
- Output node: `False`

This node performs a unary operation that transforms a 3-dimensional vector into a scalar value, based on a specified operation. It abstracts complex mathematical operations into a simple interface, allowing for the transformation of vector data into scalar form.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the 3-dimensional vector. This operation determines how the vector is transformed into a scalar value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The 3-dimensional vector to be transformed into a scalar value through the specified unary operation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The scalar result of applying the specified unary operation on the input 3-dimensional vector.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3ToScalarUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_TO_SCALAR_UNARY_OPERATION.keys()),),
                "a": DEFAULT_VEC3,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3) -> tuple[float]:
        return (VEC_TO_SCALAR_UNARY_OPERATION[op](numpy.array(a)),)

```
