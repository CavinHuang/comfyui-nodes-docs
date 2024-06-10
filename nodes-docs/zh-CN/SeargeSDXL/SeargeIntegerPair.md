# Documentation
- Class name: SeargeIntegerPair
- Category: Searge/_deprecated_/Integers
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在处理并返回整数对，是涉及数值分析或数据操作的工作流中的基本组件。

# Input types
## Required
- value1
    - 这对中的第一个整数，对于节点的操作至关重要，因为它构成了这对数值关系的基础。
    - Comfy dtype: INT
    - Python dtype: int
- value2
    - 这对中的第二个整数，与第一个值一起，完成了数值集并影响了节点的输出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- value 1
    - 输出元组的第一个元素，代表提供给节点的初始整数值。
    - Comfy dtype: INT
    - Python dtype: int
- value 2
    - 输出元组的第二个元素，代表提供给节点的第二个整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeIntegerPair:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value1': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'value2': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('value 1', 'value 2')
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Integers'

    def get_value(self, value1, value2):
        return (value1, value2)
```