# Documentation
- Class name: SeargeIntegerMath
- Category: Searge/_deprecated_/Integers
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点根据用户选择的选项执行各种整数算术运算，有助于系统内整数数据的处理和转换。

# Input types
## Required
- op
    - 操作参数决定了要应用的算术函数，是节点计算过程的基石。
    - Comfy dtype: COMBO[SeargeIntegerMath.OPERATIONS]
    - Python dtype: str
- a
    - 参数'a'代表整数运算中的第一个操作数，在决定运算结果中起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - 参数'b'是乘法和除法操作的第二个操作数，对最终结果有重大影响。
    - Comfy dtype: INT
    - Python dtype: int
- c
    - 参数'c'是加法和减法操作中的第三个操作数，影响整体计算。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - 输出'result'显示应用所选算术运算后的计算值，代表了节点功能的最终成果。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeIntegerMath:
    OPERATIONS = ['a * b + c', 'a + c', 'a - c', 'a * b', 'a / b']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'op': (SeargeIntegerMath.OPERATIONS, {'default': 'a * b + c'}), 'a': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'b': ('INT', {'default': 1, 'min': 0, 'max': 18446744073709551615}), 'c': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('result',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Integers'

    def get_value(self, op, a, b, c):
        res = 0
        if op == 'a * b + c':
            res = a * b + c
        elif op == 'a + c':
            res = a + c
        elif op == 'a - c':
            res = a - c
        elif op == 'a * b':
            res = a * b
        elif op == 'a / b':
            res = a // b
        return (int(res),)
```