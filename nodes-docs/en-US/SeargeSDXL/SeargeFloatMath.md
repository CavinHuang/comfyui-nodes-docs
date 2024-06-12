# Float Math
## Documentation
- Class name: `SeargeFloatMath`
- Category: `Searge/_deprecated_/Floats`
- Output node: `False`

SeargeFloatMath provides mathematical operations on floating-point numbers, allowing for the execution of basic arithmetic operations with customizable operands and operation types.
## Input types
### Required
- **`op`**
    - Specifies the arithmetic operation to be performed, chosen from a predefined list of operations. This affects the calculation result by determining which mathematical operation is applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first operand in the arithmetic operation, serving as a base value for calculations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`b`**
    - The second operand, used in multiplication and division operations with the first operand.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`c`**
    - An additional operand used in operations involving addition or subtraction, enhancing the flexibility of calculations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`result`**
    - Comfy dtype: `FLOAT`
    - The result of the specified arithmetic operation performed on the input operands.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeFloatMath:
    OPERATIONS = ["a * b + c", "a + c", "a - c", "a * b", "a / b"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "op": (SeargeFloatMath.OPERATIONS, {"default": "a * b + c"}),
            "a": ("FLOAT", {"default": 0.0, "step": 0.01}),
            "b": ("FLOAT", {"default": 1.0, "step": 0.01}),
            "c": ("FLOAT", {"default": 0.0, "step": 0.01}),
        },
        }

    RETURN_TYPES = ("FLOAT",)
    RETURN_NAMES = ("result",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Floats"

    def get_value(self, op, a, b, c):
        res = 0.0
        if op == "a * b + c":
            res = a * b + c
        elif op == "a + c":
            res = a + c
        elif op == "a - c":
            res = a - c
        elif op == "a * b":
            res = a * b
        elif op == "a / b":
            res = a / b
        return (res,)

```
