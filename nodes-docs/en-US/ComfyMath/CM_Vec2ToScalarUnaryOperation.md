---
tags:
- Math
- VectorMath
---

# Vec2ToScalarUnaryOperation
## Documentation
- Class name: `CM_Vec2ToScalarUnaryOperation`
- Category: `math/vec2`
- Output node: `False`

This node performs a unary operation that transforms a 2-dimensional vector into a scalar value, based on a specified operation. It abstracts complex mathematical operations into a simple interface, allowing for the transformation of vector data into a single numerical outcome.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the vector, determining the nature of the transformation from a 2D vector to a scalar value.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`a`**
    - The 2-dimensional vector to be transformed into a scalar value through the specified operation.
    - Comfy dtype: `VEC2`
    - Python dtype: `Vec2`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The scalar result of the unary operation performed on the input 2-dimensional vector.
    - Python dtype: `float`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Vec2ToScalarUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(VEC_TO_SCALAR_UNARY_OPERATION.keys()),),
                "a": DEFAULT_VEC2,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/vec2"

    def op(self, op: str, a: Vec2) -> tuple[float]:
        return (VEC_TO_SCALAR_UNARY_OPERATION[op](numpy.array(a)),)

```
