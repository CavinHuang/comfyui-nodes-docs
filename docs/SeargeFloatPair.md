# Documentation
- Class name: SeargeFloatPair
- Category: Searge/_deprecated_/Floats
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点类旨在处理并返回一对浮点数值，强调在已弃用的框架内对数值数据进行比较和操作。

# Input types
## Required
- value1
    - 第一个输入值是一个浮点数，在节点的操作中起着至关重要的作用，影响计算的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- value2
    - 第二个输入值是另一个浮点数，与第一个值一起，对于节点执行其预期功能至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- value 1
    - 第一个输出是一个浮点数，代表节点对初始输入值处理的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- value 2
    - 第二个输出是一个浮点数，对应于第二个输入值的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeFloatPair:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value1': ('FLOAT', {'default': 0.0, 'step': 0.01}), 'value2': ('FLOAT', {'default': 0.0, 'step': 0.01})}}
    RETURN_TYPES = ('FLOAT', 'FLOAT')
    RETURN_NAMES = ('value 1', 'value 2')
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Floats'

    def get_value(self, value1, value2):
        return (value1, value2)
```