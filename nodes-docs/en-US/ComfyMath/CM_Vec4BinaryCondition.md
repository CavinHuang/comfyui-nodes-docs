---
tags:
- Math
- VectorMath
---

# Vec4BinaryCondition
## Documentation
- Class name: `CM_Vec4BinaryCondition`
- Category: `math/vec4`
- Output node: `False`

This node performs binary conditional operations on two 4-dimensional vectors (Vec4), evaluating to a boolean result based on the specified operation. It abstracts complex vector comparisons into simple, reusable logic.
## Input types
### Required
- **`op`**
    - Specifies the binary conditional operation to be performed on the vectors, determining the nature of the comparison.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first 4-dimensional vector (Vec4) to be compared.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
- **`b`**
    - The second 4-dimensional vector (Vec4) to be compared.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The boolean result of the binary conditional operation between the two Vec4 inputs.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec4BinaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_BINARY_CONDITIONS.keys()),),
                "a": DEFAULT_VEC4,
                "b": DEFAULT_VEC4,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4, b: Vec4) -> tuple[bool]:
        return (VEC_BINARY_CONDITIONS[op](numpy.array(a), numpy.array(b)),)

```
