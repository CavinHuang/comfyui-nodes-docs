---
tags:
- Math
- VectorMath
---

# Number Operation
## Documentation
- Class name: `Number Operation`
- Category: `WAS Suite/Number/Operations`
- Output node: `False`

The `Number Operation` node performs a variety of mathematical operations on two input numbers, including basic arithmetic (addition, subtraction, multiplication, division, etc.), comparison operations (greater than, less than, equals, etc.), and specific checks (divisibility, odd/even, prime). It abstracts complex conditional logic into simple, configurable operations, facilitating mathematical computations and comparisons within workflows.
## Input types
### Required
- **`number_a`**
    - The first number involved in the operation. It serves as the primary operand for arithmetic operations or the base for comparison and specific checks.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float | int`
- **`number_b`**
    - The second number involved in the operation. It acts as the secondary operand for arithmetic operations or the comparator for comparison and specific checks.
    - Comfy dtype: `NUMBER`
    - Python dtype: `float | int`
- **`operation`**
    - Specifies the mathematical operation to perform on `number_a` and `number_b`. This includes a wide range of arithmetic, comparison, and specific checks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The primary outcome of the specified operation on the input numbers, potentially in its original data type.
    - Python dtype: `float | int`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The outcome of the operation represented as a floating-point number, providing precision for division operations.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The outcome of the operation converted into an integer, suitable for operations resulting in whole numbers.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [Display Int (rgthree)](../../rgthree-comfy/Nodes/Display Int (rgthree).md)



## Source code
```python
class WAS_Number_Operation:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number_a": ("NUMBER",),
                "number_b": ("NUMBER",),
                "operation": (["addition", "subtraction", "division", "floor division", "multiplication", "exponentiation", "modulus", "greater-than", "greater-than or equals", "less-than", "less-than or equals", "equals", "does not equal"],),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    FUNCTION = "math_operations"

    CATEGORY = "WAS Suite/Number/Operations"

    def math_operations(self, number_a, number_b, operation="addition"):

        # Return random number
        if operation:
            if operation == 'addition':
                result = (number_a + number_b)
                return result, result, int(result)
            elif operation == 'subtraction':
                result = (number_a - number_b)
                return result, result, int(result)
            elif operation == 'division':
                result = (number_a / number_b)
                return result, result, int(result)
            elif operation == 'floor division':
                result = (number_a // number_b)
                return result, result, int(result)
            elif operation == 'multiplication':
                result = (number_a * number_b)
                return result, result, int(result)
            elif operation == 'exponentiation':
                result = (number_a ** number_b)
                return result, result, int(result)
            elif operation == 'modulus':
                result = (number_a % number_b)
                return result, result, int(result)
            elif operation == 'greater-than':
                result = +(number_a > number_b)
                return result, result, int(result)
            elif operation == 'greater-than or equals':
                result = +(number_a >= number_b)
                return result, result, int(result)
            elif operation == 'less-than':
                result = +(number_a < number_b)
                return result, result, int(result)
            elif operation == 'less-than or equals':
                result = +(number_a <= number_b)
                return result, result, int(result)
            elif operation == 'equals':
                result = +(number_a == number_b)
                return result, result, int(result)
            elif operation == 'does not equal':
                result = +(number_a != number_b)
                return result, result, int(result)
            else:
                cstr("Invalid number operation selected.").error.print()
                return (number_a, number_a, int(number_a))

```
