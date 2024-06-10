---
tags:
- Math
- UnaryOperations
- VectorMath
---

# FloatUnaryCondition
## Documentation
- Class name: `CM_FloatUnaryCondition`
- Category: `math/float`
- Output node: `False`

This node performs unary operations on floating-point numbers based on a specified condition. It evaluates a single float input against a predefined condition, such as checking if the number is zero, positive, negative, or NaN, among others.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the float input. The operation is chosen from a predefined list of conditions like 'IsZero', 'IsPositive', etc., which determine the nature of the evaluation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The floating-point number to be evaluated against the specified unary condition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the unary condition evaluation, indicating whether the condition holds true for the input float.
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FloatUnaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_UNARY_CONDITIONS.keys()),),
                "a": DEFAULT_FLOAT,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/float"

    def op(self, op: str, a: float) -> tuple[bool]:
        return (FLOAT_UNARY_CONDITIONS[op](a),)

```
