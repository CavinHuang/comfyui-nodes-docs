# Documentation
- Class name: SeargeIntegerConstant
- Category: Searge/_deprecated_/Integers
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeIntegerConstant节点在工作流中提供一个常量整数值。它旨在提供稳定且不变的整数，可以在各种计算或比较中使用，无需外部输入或数据处理。

# Input types
## Required
- value
    - 参数'value'是SeargeIntegerConstant节点的核心，代表节点将始终返回的固定整数。它作为工作流中的基础组件，确保下游操作能够访问到一个一致且预定义的整数值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- value
    - 输出'value'是SeargeIntegerConstant节点提供的唯一结果，即作为输入设置的常量整数。它的重要性在于确保整数在整个工作流中保持不变，从而促进可预测和稳定的操作。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeIntegerConstant:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('value',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Integers'

    def get_value(self, value):
        return (value,)
```