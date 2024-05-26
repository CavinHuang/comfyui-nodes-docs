# Documentation
- Class name: SeargeFloatMath
- Category: Searge/_deprecated_/Floats
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeFloatMath节点旨在对浮点数执行基本的算术运算。它提供了一系列操作，如乘法、加法、减法、除法以及乘法与加法的组合。该节点的目标是提供一种直接的方法来执行这些基本的数学函数，从而在更广泛的计算环境中促进浮点值的操控。

# Input types
## Required
- op
    - 参数'op'决定了要执行的算术运算。它至关重要，因为它指示了节点将执行的数学程序，从而影响计算的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- a
    - 参数'a'代表算术运算中的一个操作数。它的值显著影响最终结果，使其成为节点功能的重要组成部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 参数'b'用作需要两个输入的运算（如乘法或除法）中的一个操作数。它的存在取决于所选择的操作，但在需要时，它在计算中起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- c
    - 参数'c'是另一个操作数，它参与特定的算术运算，如加法或减法。在必要时，它对最终计算做出贡献，突出了它在某些情况下的重要性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 输出'result'提供了节点执行的算术运算的结果。它是输入参数和所选操作的直接反映，概括了节点的目的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeFloatMath:
    OPERATIONS = ['a * b + c', 'a + c', 'a - c', 'a * b', 'a / b']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'op': (SeargeFloatMath.OPERATIONS, {'default': 'a * b + c'}), 'a': ('FLOAT', {'default': 0.0, 'step': 0.01}), 'b': ('FLOAT', {'default': 1.0, 'step': 0.01}), 'c': ('FLOAT', {'default': 0.0, 'step': 0.01})}}
    RETURN_TYPES = ('FLOAT',)
    RETURN_NAMES = ('result',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Floats'

    def get_value(self, op, a, b, c):
        res = 0.0
        if op == 'a * b + c':
            res = a * b + c
        elif op == 'a + c':
            res = a + c
        elif op == 'a - c':
            res = a - c
        elif op == 'a * b':
            res = a * b
        elif op == 'a / b':
            res = a / b
        return (res,)
```