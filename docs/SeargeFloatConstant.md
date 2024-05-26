# Documentation
- Class name: SeargeFloatConstant
- Category: Searge/_deprecated_/Floats
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeFloatConstant 是一个节点，旨在工作流中提供一个常量的浮点数值。它确保在系统或实验的不同部分使用一致且不变的值，有助于提高结果的可靠性和可复现性。

# Input types
## Required
- value
    - 参数 'value' 是这个节点将提供的常量浮点数。它在维持系统稳定性中起着关键作用，通过提供计算和比较的固定参考点。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- value
    - 输出 'value' 是作为输入设置的常量浮点数。它很重要，因为它代表了将在后续操作或分析中使用的未改变且预定义的常量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeFloatConstant:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('FLOAT', {'default': 0.0, 'step': 0.01})}}
    RETURN_TYPES = ('FLOAT',)
    RETURN_NAMES = ('value',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Floats'

    def get_value(self, value):
        return (value,)
```