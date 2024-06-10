---
tags:
- Math
- UnaryOperations
- VectorMath
---

# NumberUnaryOperation
## Documentation
- Class name: `CM_NumberUnaryOperation`
- Category: `math/number`
- Output node: `False`

This node performs unary operations on numbers, allowing for the manipulation of a single numerical input through predefined operations.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be performed on the input number. The choice of operation affects the outcome of the node's computation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The numerical input on which the unary operation will be performed. This input is central to the node's functionality.
    - Comfy dtype: `NUMBER`
    - Python dtype: `number`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The result of applying the specified unary operation on the input number.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class NumberUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {
                "op": (list(FLOAT_UNARY_OPERATIONS.keys()),),
                "a": DEFAULT_NUMBER,
            }
        }

    RETURN_TYPES = ("NUMBER",)
    FUNCTION = "op"
    CATEGORY = "math/number"

    def op(self, op: str, a: number) -> tuple[float]:
        return (FLOAT_UNARY_OPERATIONS[op](float(a)),)

```
