---
tags:
- Math
- VectorMath
---

# Vec3ScalarOperation
## Documentation
- Class name: `CM_Vec3ScalarOperation`
- Category: `math/vec3`
- Output node: `False`

Performs scalar operations on 3-dimensional vectors, allowing for mathematical manipulations such as scaling and division by a scalar value.
## Input types
### Required
- **`op`**
    - Specifies the scalar operation to be performed on the vector, such as multiplication or division, influencing the resulting vector's magnitude or direction.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The 3-dimensional vector to be operated on, serving as the primary operand for the scalar operation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
- **`b`**
    - The scalar value to be used in the operation, affecting the vector's magnitude or direction based on the specified operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`vec3`**
    - Comfy dtype: `VEC3`
    - The resulting 3-dimensional vector after applying the specified scalar operation, reflecting changes in magnitude or direction.
    - Python dtype: `tuple[Vec3]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3ScalarOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_SCALAR_OPERATION.keys()),),
                "a": DEFAULT_VEC3,
                "b": ("FLOAT",),
            }
        }

    RETURN_TYPES = ("VEC3",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3, b: float) -> tuple[Vec3]:
        return (_vec3_from_numpy(VEC_SCALAR_OPERATION[op](numpy.array(a), b)),)

```
