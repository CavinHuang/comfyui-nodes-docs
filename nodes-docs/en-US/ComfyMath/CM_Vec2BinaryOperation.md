---
tags:
- Math
- VectorMath
---

# Vec2BinaryOperation
## Documentation
- Class name: `CM_Vec2BinaryOperation`
- Category: `math/vec2`
- Output node: `False`

The node performs binary operations on two-dimensional vectors, producing a new vector as a result. It abstracts mathematical operations that combine two vectors into one, based on a specified operation.
## Input types
### Required
- **`op`**
    - Specifies the binary operation to be performed on the vectors. It determines how the two input vectors will be combined.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first two-dimensional vector involved in the binary operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
- **`b`**
    - The second two-dimensional vector involved in the binary operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
## Output types
- **`vec2`**
    - Comfy dtype: `VEC2`
    - The resulting two-dimensional vector after applying the specified binary operation on the input vectors.
    - Python dtype: `tuple[Vec2]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Vec2BinaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_BINARY_OPERATIONS.keys()),),
                "a": DEFAULT_VEC2,
                "b": DEFAULT_VEC2,
            }
        }

    RETURN_TYPES = ("VEC2",)
    FUNCTION = "op"
    CATEGORY = "math/vec2"

    def op(self, op: str, a: Vec2, b: Vec2) -> tuple[Vec2]:
        return (
            _vec2_from_numpy(VEC_BINARY_OPERATIONS[op](numpy.array(a), numpy.array(b))),
        )

```
