---
tags:
- Math
- UnaryOperations
- VectorMath
---

# NumberUnaryCondition
## Documentation
- Class name: `CM_NumberUnaryCondition`
- Category: `math/number`
- Output node: `False`

This node performs unary operations on numbers based on predefined conditions, allowing for the evaluation of mathematical conditions involving a single numeric input. It abstracts the complexity of various unary mathematical operations into a simple interface.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed, chosen from a predefined set of conditions. This determines how the input number is evaluated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The numeric input on which the unary operation is to be performed. This is the subject of the mathematical condition being evaluated.
    - Comfy dtype: `NUMBER`
    - Python dtype: `Union[int, float]`
## Output types
- **`bool`**
    - Comfy dtype: `BOOL`
    - The result of the unary operation, indicating whether the condition is met (True) or not (False).
    - Python dtype: `bool`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NumberUnaryCondition:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_UNARY_CONDITIONS.keys()),),
                "a": DEFAULT_NUMBER,
            }
        }

    RETURN_TYPES = ("BOOL",)
    FUNCTION = "op"
    CATEGORY = "math/number"

    def op(self, op: str, a: number) -> tuple[bool]:
        return (FLOAT_UNARY_CONDITIONS[op](float(a)),)

```
