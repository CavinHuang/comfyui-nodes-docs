---
tags:
- Math
- VectorMath
---

# Vec3BinaryCondition
## Documentation
- Class name: `CM_Vec3BinaryCondition`
- Category: `math/vec3`
- Output node: `False`

This node performs a binary condition operation on two 3-dimensional vectors (Vec3), evaluating the condition specified by the operation and returning a boolean result. It abstracts complex vector comparison logic into a simple interface, allowing for easy integration of vector-based conditions into larger computational workflows.
## Input types
### Required
- **`op`**
    - Specifies the binary condition operation to be performed on the vectors. The choice of operation determines how the two vectors are compared.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first 3-dimensional vector (Vec3) to be compared.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
- **`b`**
    - The second 3-dimensional vector (Vec3) to be compared.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the binary condition operation, indicating whether the specified condition holds true for the given vectors.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3BinaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_BINARY_CONDITIONS.keys()),),
                "a": DEFAULT_VEC3,
                "b": DEFAULT_VEC3,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3, b: Vec3) -> tuple[bool]:
        return (VEC_BINARY_CONDITIONS[op](numpy.array(a), numpy.array(b)),)

```
