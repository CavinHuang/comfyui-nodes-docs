---
tags:
- Math
- VectorMath
---

# Vec3UnaryCondition
## Documentation
- Class name: `CM_Vec3UnaryCondition`
- Category: `math/vec3`
- Output node: `False`

The CM_Vec3UnaryCondition node is designed to evaluate unary conditions on 3-dimensional vectors, providing a boolean result based on the specified operation and vector input.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the vector. The choice of operation determines the condition being evaluated. The operations are limited to a predefined set of unary conditions applicable to 3-dimensional vectors.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The 3-dimensional vector on which the unary condition is evaluated.
    - Comfy dtype: `VEC3`
    - Python dtype: `Vec3`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the unary condition evaluation, indicating whether the condition holds true for the given vector.
    - Python dtype: `Tuple[bool]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec3UnaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_UNARY_CONDITIONS.keys()),),
                "a": DEFAULT_VEC3,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/vec3"

    def op(self, op: str, a: Vec3) -> tuple[bool]:
        return (VEC_UNARY_CONDITIONS[op](numpy.array(a)),)

```
