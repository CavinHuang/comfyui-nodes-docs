---
tags:
- Math
- UnaryOperations
- VectorMath
---

# FloatUnaryOperation
## Documentation
- Class name: `CM_FloatUnaryOperation`
- Category: `math/float`
- Output node: `False`

This node performs unary operations on floating-point numbers, allowing for the application of a variety of mathematical functions to a single float input.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the input float. The choice of operation directly influences the outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The floating-point number to be operated on. It serves as the input to the unary operation specified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`float`**
    - Comfy dtype: `FLOAT`
    - The result of applying the specified unary operation on the input float.
    - Python dtype: `Tuple[float]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_UNARY_OPERATIONS.keys()),),
                "a": DEFAULT_FLOAT,
            }
        }

    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "op"
    CATEGORY = "math/float"

    def op(self, op: str, a: float) -> tuple[float]:
        return (FLOAT_UNARY_OPERATIONS[op](a),)

```
