# Documentation
- Class name: EvalFloats
- Category: Mikey/Math
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

EvalFloats节点旨在评估作为字符串提供的数学表达式，使用两个浮点数作为公式中的变量。它作为一个多功能工具，用于执行可以动态定义的计算，提供了在数学运算中的灵活性，无需硬编码表达式。

# Input types
## Required
- a
    - 参数'a'是一个浮点数，代表数学公式中的一个变量。它对于定义计算的初始状态至关重要，并直接影响评估表达式的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 参数'b'是另一个浮点数，与'a'一起在数学表达式中使用。它在计算中扮演重要角色，因为它有助于从公式派生出最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- formula
    - 参数'formula'是一个包含要评估的数学表达式的字符串。它至关重要，因为它决定了对输入变量'a'和'b'执行的操作，确定了计算的性质。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result_float
    - 输出'result_float'提供了评估数学表达式的浮点结果。它很重要，因为它代表了基于输入变量和公式的计算的直接结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- result_int
    - 输出'result_int'是评估结果的整数表示。当需要从计算中获得整数值时，它很有用，提供了计算结果的一个离散版本。
    - Comfy dtype: INT
    - Python dtype: int
- result_str
    - 输出'result_str'是评估结果的字符串表示。它特别适用于以人类可读格式显示结果，或在需要字符串的进一步处理中使用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class EvalFloats:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'a': ('FLOAT', {'default': 0.0}), 'b': ('FLOAT', {'default': 0.0}), 'formula': ('STRING', {'multiline': False, 'default': 'a + b'})}}
    RETURN_TYPES = ('FLOAT',)
    RETURN_NAMES = ('result_float', 'result_int', 'result_str')
    FUNCTION = 'process'
    CATEGORY = 'Mikey/Math'

    def process(self, a, b, formula):
        formula = formula.replace('a', str(a))
        formula = formula.replace('b', str(b))
        result = eval(formula)
        return (result, int(result), str(result))
```