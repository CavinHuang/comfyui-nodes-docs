---
tags:
- Math
- VectorMath
---

# Vec4UnaryOperation
## Documentation
- Class name: `CM_Vec4UnaryOperation`
- Category: `math/vec4`
- Output node: `False`

This node performs unary operations on 4-dimensional vectors, applying a specified operation to a single Vec4 input and producing a Vec4 output. It abstracts complex vector manipulations into simple, callable operations, facilitating mathematical computations on 4D vectors.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the Vec4 input. The choice of operation directly influences the result, enabling a variety of mathematical manipulations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The Vec4 input on which the unary operation is to be performed. This vector serves as the primary data for the operation, determining the nature of the computation.
    - Comfy dtype: `VEC4`
    - Python dtype: `Vec4`
## Output types
- **`vec4`**
    - Comfy dtype: `VEC4`
    - The result of applying the specified unary operation on the Vec4 input, returned as a Vec4. This output encapsulates the transformed vector, reflecting the mathematical computation performed.
    - Python dtype: `Tuple[Vec4]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Vec4UnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_UNARY_OPERATIONS.keys()),),
                "a": DEFAULT_VEC4,
            }
        }

    RETURN_TYPES = ("VEC4",)
    FUNCTION = "op"
    CATEGORY = "math/vec4"

    def op(self, op: str, a: Vec4) -> tuple[Vec4]:
        return (_vec4_from_numpy(VEC_UNARY_OPERATIONS[op](numpy.array(a))),)

```
