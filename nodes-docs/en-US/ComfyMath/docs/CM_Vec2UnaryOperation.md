---
tags:
- Math
- VectorMath
---

# Vec2UnaryOperation
## Documentation
- Class name: `CM_Vec2UnaryOperation`
- Category: `math/vec2`
- Output node: `False`

The node performs unary operations on 2-dimensional vectors, transforming a single vector based on a specified operation.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the vector, affecting the transformation result.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The 2-dimensional vector to be transformed by the unary operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
## Output types
- **`vec2`**
    - Comfy dtype: `VEC2`
    - The transformed 2-dimensional vector resulting from the specified unary operation.
    - Python dtype: `tuple[Vec2]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec2UnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_UNARY_OPERATIONS.keys()),),
                "a": DEFAULT_VEC2,
            }
        }

    RETURN_TYPES = ("VEC2",)
    FUNCTION = "op"
    CATEGORY = "math/vec2"

    def op(self, op: str, a: Vec2) -> tuple[Vec2]:
        return (_vec2_from_numpy(VEC_UNARY_OPERATIONS[op](numpy.array(a))),)

```
