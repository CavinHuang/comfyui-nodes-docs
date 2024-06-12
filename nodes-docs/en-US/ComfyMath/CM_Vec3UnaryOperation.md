---
tags:
- Math
- VectorMath
---

# Vec3UnaryOperation
## Documentation
- Class name: `CM_Vec3UnaryOperation`
- Category: `math/vec3`
- Output node: `False`

The CM_Vec3UnaryOperation node performs unary operations on 3-dimensional vectors, applying a specified operation to a single vector and producing a modified vector as a result. This node abstracts the complexity of vector manipulation, enabling efficient and straightforward vector transformations.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the vector. The choice of operation directly influences the outcome of the transformation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The 3-dimensional vector to be transformed. It serves as the input for the unary operation, determining the base vector for the transformation.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
## Output types
- **`vec3`**
    - Comfy dtype: `VEC3`
    - The result of applying the specified unary operation to the input vector, represented as a 3-dimensional vector.
    - Python dtype: `Tuple[Vec3]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3UnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_UNARY_OPERATIONS.keys()),),
                "a": DEFAULT_VEC3,
            }
        }

    RETURN_TYPES = ("VEC3",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3) -> tuple[Vec3]:
        return (_vec3_from_numpy(VEC_UNARY_OPERATIONS[op](numpy.array(a))),)

```
