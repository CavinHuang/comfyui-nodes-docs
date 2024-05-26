# Documentation
- Class name: WAS_Number_Operation
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_Operation节点旨在对两个输入数字执行多种数学运算。它支持加法、减法、除法等操作，为数值计算提供了一种多功能工具。

# Input types
## Required
- number_a
    - 数学运算的第一个操作数，可以是整数或浮点数。它在确定运算结果中起着关键作用。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
- number_b
    - 数学运算的第二个操作数，也是一个整数或浮点数。它对计算至关重要，并影响最终结果。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
## Optional
- operation
    - 指定要执行的数学运算类型。操作的选择直接影响计算和产生的结果类型。
    - Comfy dtype: COMBO['addition', 'subtraction', 'division', 'floor division', 'multiplication', 'exponentiation', 'modulus', 'greater-than', 'greater-than or equals', 'less-than', 'less-than or equals', 'equals', 'does not equal']
    - Python dtype: str

# Output types
- result
    - 数学运算的结果，可以是一个数字、一个浮点值或一个整数，这取决于执行的操作。
    - Comfy dtype: COMBO[NUMBER, FLOAT, INT]
    - Python dtype: Union[int, float]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_Operation:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number_a': ('NUMBER',), 'number_b': ('NUMBER',), 'operation': (['addition', 'subtraction', 'division', 'floor division', 'multiplication', 'exponentiation', 'modulus', 'greater-than', 'greater-than or equals', 'less-than', 'less-than or equals', 'equals', 'does not equal'],)}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'math_operations'
    CATEGORY = 'WAS Suite/Number/Operations'

    def math_operations(self, number_a, number_b, operation='addition'):
        if operation:
            if operation == 'addition':
                result = number_a + number_b
                return (result, result, int(result))
            elif operation == 'subtraction':
                result = number_a - number_b
                return (result, result, int(result))
            elif operation == 'division':
                result = number_a / number_b
                return (result, result, int(result))
            elif operation == 'floor division':
                result = number_a // number_b
                return (result, result, int(result))
            elif operation == 'multiplication':
                result = number_a * number_b
                return (result, result, int(result))
            elif operation == 'exponentiation':
                result = number_a ** number_b
                return (result, result, int(result))
            elif operation == 'modulus':
                result = number_a % number_b
                return (result, result, int(result))
            elif operation == 'greater-than':
                result = +(number_a > number_b)
                return (result, result, int(result))
            elif operation == 'greater-than or equals':
                result = +(number_a >= number_b)
                return (result, result, int(result))
            elif operation == 'less-than':
                result = +(number_a < number_b)
                return (result, result, int(result))
            elif operation == 'less-than or equals':
                result = +(number_a <= number_b)
                return (result, result, int(result))
            elif operation == 'equals':
                result = +(number_a == number_b)
                return (result, result, int(result))
            elif operation == 'does not equal':
                result = +(number_a != number_b)
                return (result, result, int(result))
            else:
                cstr('Invalid number operation selected.').error.print()
                return (number_a, number_a, int(number_a))
```