# Documentation
- Class name: WAS_Number_Input_Condition
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

方法 `number_input_condition` 旨在基于一组输入参数评估数值条件。它执行逻辑运算和比较以确定结果，该结果可以是布尔值或数值类型，具体取决于指定的返回类型。此节点功能多样，可以处理各种数学和逻辑运算，适用于广泛的数值分析任务。

# Input types
## Required
- number_a
    - 用于比较操作的第一个数字。它在确定所评估的逻辑条件的结果中起着关键作用。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
- number_b
    - 参与比较的第二个数字。它对于节点执行的逻辑运算至关重要。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]
## Optional
- return_boolean
    - 确定方法是否应根据比较结果返回布尔值（真或假）或数值类型。
    - Comfy dtype: COMBO['false', 'true']
    - Python dtype: str
- comparison
    - 指定要对两个数字执行的逻辑比较或操作的类型。
    - Comfy dtype: COMBO['and', 'or', 'greater-than', 'greater-than or equals', 'less-than', 'less-than or equals', 'equals', 'does not equal', 'divisible by', 'if A odd', 'if A even', 'if A prime', 'factor of']
    - Python dtype: str

# Output types
- result
    - 逻辑条件评估的结果，根据 'return_boolean' 参数，可以是数值或布尔值。
    - Comfy dtype: COMBO['NUMBER', 'FLOAT', 'INT']
    - Python dtype: Union[int, float, bool]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_Input_Condition:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number_a': ('NUMBER',), 'number_b': ('NUMBER',), 'return_boolean': (['false', 'true'],), 'comparison': (['and', 'or', 'greater-than', 'greater-than or equals', 'less-than', 'less-than or equals', 'equals', 'does not equal', 'divisible by', 'if A odd', 'if A even', 'if A prime', 'factor of'],)}}
    RETURN_TYPES = ('NUMBER', 'FLOAT', 'INT')
    FUNCTION = 'number_input_condition'
    CATEGORY = 'WAS Suite/Logic'

    def number_input_condition(self, number_a, number_b, return_boolean='false', comparison='greater-than'):
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
            elif comparison == 'and':
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