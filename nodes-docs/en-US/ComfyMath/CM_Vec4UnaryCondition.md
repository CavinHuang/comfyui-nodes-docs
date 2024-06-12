---
tags:
- Math
- VectorMath
---

# Vec4UnaryCondition
## Documentation
- Class name: `CM_Vec4UnaryCondition`
- Category: `math/vec4`
- Output node: `False`

This node performs unary operations on 4-dimensional vectors based on predefined conditions, evaluating to a boolean result. It abstracts complex vector operations into simple, condition-based checks.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the vector, chosen from a predefined set of conditions. This determines how the vector is evaluated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The 4-dimensional vector to be operated on. It serves as the input for the unary operation.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The boolean result of the unary operation performed on the 4-dimensional vector.
    - Python dtype: `Tuple[bool]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec4UnaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_UNARY_CONDITIONS.keys()),),
                "a": DEFAULT_VEC4,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4) -> tuple[bool]:
        return (VEC_UNARY_CONDITIONS[op](numpy.array(a)),)

```
