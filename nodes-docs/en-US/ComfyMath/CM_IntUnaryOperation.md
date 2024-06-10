---
tags:
- Math
- UnaryOperations
- VectorMath
---

# IntUnaryOperation
## Documentation
- Class name: `CM_IntUnaryOperation`
- Category: `math/int`
- Output node: `False`

Performs unary operations on integers, applying a specified operation to a single integer input and producing an integer result. This node abstracts mathematical operations that modify the value or state of an integer based on predefined unary operations.
## Input types
### Required
- **`op`**
    - Specifies the unary operation to be applied to the integer. This determines how the integer's value will be modified.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The integer to which the unary operation will be applied. This is the input integer that will be modified by the specified operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The result of applying the unary operation to the input integer.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IntUnaryOperation:
    @classmethod
    def INPUT_TYPES(cls) -> Mapping[str, Any]:
        return {
            "required": {"op": (list(INT_UNARY_OPERATIONS.keys()),), "a": DEFAULT_INT}
        }

    RETURN_TYPES = ("INT",)
    FUNCTION = "op"
    CATEGORY = "math/int"

    def op(self, op: str, a: int) -> tuple[int]:
        return (INT_UNARY_OPERATIONS[op](a),)

```
