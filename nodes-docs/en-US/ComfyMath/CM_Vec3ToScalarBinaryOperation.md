---
tags:
- Math
- VectorMath
---

# Vec3ToScalarBinaryOperation
## Documentation
- Class name: `CM_Vec3ToScalarBinaryOperation`
- Category: `math/vec3`
- Output node: `False`

This node performs a binary operation between two 3-dimensional vectors (Vec3) and returns a scalar value as a result. It supports a variety of operations such as dot product and distance calculation, abstracting complex mathematical operations into a simple interface.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the two Vec3 inputs, such as dot product or distance calculation. This choice determines how the vectors are mathematically combined.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first 3-dimensional vector (Vec3) input for the binary operation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
- **`b`**
    - The second 3-dimensional vector (Vec3) input for the binary operation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The scalar result of the binary operation performed on the two Vec3 inputs.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3ToScalarBinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_TO_SCALAR_BINARY_OPERATION.keys()),),
                "a": DEFAULT_VEC3,
                "b": DEFAULT_VEC3,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3, b: Vec3) -> tuple[float]:
        return (VEC_TO_SCALAR_BINARY_OPERATION[op](numpy.array(a), numpy.array(b)),)

```
