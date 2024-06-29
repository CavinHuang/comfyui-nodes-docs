---
tags:
- Math
- VectorMath
---

# Vec2UnaryCondition
## Documentation
- Class name: `CM_Vec2UnaryCondition`
- Category: `math/vec2`
- Output node: `False`

This node performs unary condition operations on 2-dimensional vectors, evaluating a specified condition for a given vector.
## Input types
### Required
- **`op`**
    - Specifies the unary condition operation to be performed on the vector. The choice of operation affects the outcome of the condition evaluation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The 2-dimensional vector on which the unary condition operation is to be performed.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the unary condition operation, indicating whether the specified condition holds true for the given vector.
    - Python dtype: `tuple[bool]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec2UnaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_UNARY_CONDITIONS.keys()),),
                "a": DEFAULT_VEC2,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/vec2"

    def op(self, op: str, a: Vec2) -> tuple[bool]:
        return (VEC_UNARY_CONDITIONS[op](numpy.array(a)),)

```
