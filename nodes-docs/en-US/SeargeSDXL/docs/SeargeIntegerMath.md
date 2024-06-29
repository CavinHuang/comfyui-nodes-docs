# Integer Math
## Documentation
- Class name: `SeargeIntegerMath`
- Category: `Searge/_deprecated_/Integers`
- Output node: `False`

The SeargeIntegerMath node provides mathematical operations on integer values, supporting basic arithmetic functions such as addition, subtraction, multiplication, and division. It allows for the dynamic execution of predefined operations based on input parameters, facilitating various integer math computations.
## Input types
### Required
- **`op`**
    - Specifies the mathematical operation to be performed, chosen from a predefined set of operations. This determines how the input integers are processed and affects the outcome of the computation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`a`**
    - The first integer operand in the mathematical operation, serving as a primary input for the computation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`b`**
    - The second integer operand, used in operations involving two inputs, such as multiplication or division.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`c`**
    - An optional third integer operand, used in operations that require an additional input, such as adding a constant after multiplication.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`result`**
    - Comfy dtype: `INT`
    - The integer result of the specified mathematical operation.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VHS_SplitImages](../../ComfyUI-VideoHelperSuite/Nodes/VHS_SplitImages.md)



## Source code
```python
class SeargeIntegerMath:
    OPERATIONS = ["a * b + c", "a + c", "a - c", "a * b", "a / b"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "op": (SeargeIntegerMath.OPERATIONS, {"default": "a * b + c"}),
            "a": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "b": ("INT", {"default": 1, "min": 0, "max": 0xffffffffffffffff}),
            "c": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
        },
        }

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("result",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Integers"

    def get_value(self, op, a, b, c):
        res = 0
        if op == "a * b + c":
            res = a * b + c
        elif op == "a + c":
            res = a + c
        elif op == "a - c":
            res = a - c
        elif op == "a * b":
            res = a * b
        elif op == "a / b":
            res = a // b
        return (int(res),)

```
