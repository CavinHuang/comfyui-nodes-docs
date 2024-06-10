# Documentation
- Class name: CR_MathOperation
- Category: Comfyroll/Utils/Other
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_MathOperation 节点旨在对给定输入值执行多种数学运算。它抽象了数学函数的复杂性，使用户能够轻松应用正弦、余弦和对数等运算。该节点强调简单易用性，确保数学转换易于访问，而无需深入了解底层算法细节。

# Input types
## Required
- a
    - 参数 'a' 表示将执行数学运算的输入值。它是节点功能的核心，因为它直接影响运算的结果。这个值的选择可以显著影响结果，使其成为节点执行的关键组成部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- operation
    - 参数 'operation' 指示将应用于输入值的数学函数。它至关重要，因为它决定了将发生的变换类型。选择一个操作对于实现节点执行的预期结果是关键的。
    - Comfy dtype: COMBO['sin', 'cos', 'tan', 'sqrt', 'exp', 'log', 'neg', 'abs']
    - Python dtype: str
- decimal_places
    - 参数 'decimal_places' 指定结果将被四舍五入到的小数位数。它在确定输出精度方面起着关键作用，允许用户控制最终结果的细节水平。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- a
    - 输出 'a' 提供了数学运算结果在被四舍五入到指定小数位数后的值。它很重要，因为它代表了节点处理的最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - 输出 'show_help' 提供了指向节点文档页面的 URL 链接，为用户提供了关于如何有效使用该节点的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_MathOperation:

    @classmethod
    def INPUT_TYPES(cls):
        operations = ['sin', 'cos', 'tan', 'sqrt', 'exp', 'log', 'neg', 'abs']
        return {'required': {'a': ('FLOAT', {'default': 1.0}), 'operation': (operations,), 'decimal_places': ('INT', {'default': 2, 'min': 0, 'max': 10})}}
    RETURN_TYPES = ('FLOAT', 'STRING')
    RETURN_NAMES = ('a', 'show_help')
    FUNCTION = 'do_math'
    CATEGORY = icons.get('Comfyroll/Utils/Other')

    def do_math(self, a, operation, decimal_places):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-math-operation'
        if operation == 'sin':
            result = math.sin(a)
        elif operation == 'cos':
            result = math.cos(a)
        elif operation == 'tan':
            result = math.cos(a)
        elif operation == 'sqrt':
            result = math.sqrt(a)
        elif operation == 'exp':
            result = math.exp(a)
        elif operation == 'log':
            result = math.log(a)
        elif operation == 'neg':
            result = -a
        elif operation == 'abs':
            result = abs(a)
        else:
            raise ValueError('CR Math Operation: Unsupported operation.')
        result = round(result, decimal_places)
        return (result, show_help)
```