---
tags:
- Math
- VectorMath
---

# Number Input Condition
## Documentation
- Class name: `Number Input Condition`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node performs a variety of comparison operations between two numbers, such as checking if one is greater than, less than, equal to, or not equal to the other, among others. It can return either the result of the comparison as a boolean value or one of the input numbers based on the comparison result.
## Input types
### Required
- **`number_a`**
    - The first number to be compared. It plays a central role in the comparison operations, serving as the basis for determining the outcome of the comparison.
    - Comfy dtype: `NUMBER`
    - Python dtype: `int or float`
- **`number_b`**
    - The second number to be compared. It is used in conjunction with 'number_a' to perform the comparison operation.
    - Comfy dtype: `NUMBER`
    - Python dtype: `int or float`
- **`return_boolean`**
    - Determines whether the node returns a boolean result of the comparison or one of the input numbers based on the comparison result.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`comparison`**
    - Specifies the type of comparison to be performed between 'number_a' and 'number_b'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`number`**
    - Comfy dtype: `NUMBER`
    - The outcome of the comparison operation, which can be either a boolean value or one of the input numbers, depending on the 'return_boolean' parameter.
    - Python dtype: `int, float, or bool`
- **`float`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the comparison result.
    - Python dtype: `float`
- **`int`**
    - Comfy dtype: `INT`
    - The integer representation of the comparison result.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Number_Input_Condition:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "number_a": ("NUMBER",),
                "number_b": ("NUMBER",),
                "return_boolean": (["false", "true"],),
                "comparison": (["and", "or", "greater-than", "greater-than or equals", "less-than", "less-than or equals", "equals", "does not equal", "divisible by", "if A odd", "if A even", "if A prime", "factor of"],),
            }
        }

    RETURN_TYPES = ("NUMBER", "FLOAT", "INT")
    FUNCTION = "number_input_condition"

    CATEGORY = "WAS Suite/Logic"

    def number_input_condition(self, number_a, number_b, return_boolean="false", comparison="greater-than"):

        if comparison:
            if return_boolean == 'true':
                if comparison == 'and':
                    result = 1 if number_a != 0 and number_b != 0 else 0
                elif comparison == 'or':
                    result = 1 if number_a != 0 or number_b != 0 else 0
                elif comparison == 'greater-than':
                    result = 1 if number_a > number_b else 0
                elif comparison == 'greater-than or equals':
                    result = 1 if number_a >= number_b else 0
                elif comparison == 'less-than':
                    result = 1 if number_a < number_b else 0
                elif comparison == 'less-than or equals':
                    result = 1 if number_a <= number_b else 0
                elif comparison == 'equals':
                    result = 1 if number_a == number_b else 0
                elif comparison == 'does not equal':
                    result = 1 if number_a != number_b else 0
                elif comparison == 'divisible by':
                    result = 1 if number_b % number_a == 0 else 0
                elif comparison == 'if A odd':
                    result = 1 if number_a % 2 != 0 else 0
                elif comparison == 'if A even':
                    result = 1 if number_a % 2 == 0 else 0
                elif comparison == 'if A prime':
                    result = 1 if self.is_prime(number_a) else 0
                elif comparison == 'factor of':
                    result = 1 if number_b % number_a == 0 else 0
                else:
                    result = 0
            else:
                if comparison == 'and':
                    result = number_a if number_a != 0 and number_b != 0 else number_b
                elif comparison == 'or':
                    result = number_a if number_a != 0 or number_b != 0 else number_b
                elif comparison == 'greater-than':
                    result = number_a if number_a > number_b else number_b
                elif comparison == 'greater-than or equals':
                    result = number_a if number_a >= number_b else number_b
                elif comparison == 'less-than':
                    result = number_a if number_a < number_b else number_b
                elif comparison == 'less-than or equals':
                    result = number_a if number_a <= number_b else number_b
                elif comparison == 'equals':
                    result = number_a if number_a == number_b else number_b
                elif comparison == 'does not equal':
                    result = number_a if number_a != number_b else number_b
                elif comparison == 'divisible by':
                    result = number_a if number_b % number_a == 0 else number_b
                elif comparison == 'if A odd':
                    result = number_a if number_a % 2 != 0 else number_b
                elif comparison == 'if A even':
                    result = number_a if number_a % 2 == 0 else number_b
                elif comparison == 'if A prime':
                    result = number_a if self.is_prime(number_a) else number_b
                elif comparison == 'factor of':
                    result = number_a if number_b % number_a == 0 else number_b
                else:
                    result = number_a

        return (result, float(result), int(result))

    def is_prime(self, n):
        if n <= 1:
            return False
        elif n <= 3:
            return True
        elif n % 2 == 0 or n % 3 == 0:
            return False
        i = 5
        while i * i <= n:
            if n % i == 0 or n % (i + 2) == 0:
                return False
            i += 6
        return True

```
