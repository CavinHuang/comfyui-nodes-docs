# Documentation
- Class name: Float
- Category: EasyUse/Logic/Type
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点提供基础的浮点数处理操作，专注于在指定精度内对小数值进行操作和计算。

# Input types
## Required
- value
    - ‘value’参数对节点的操作至关重要，它是节点操作或计算的输入小数值。
    - Comfy dtype: FLOAT
    - Python dtype: Union[Decimal, float, int]

# Output types
- float
    - 输出‘float’代表节点计算或操作的结果，反映了处理后的数值。
    - Comfy dtype: FLOAT
    - Python dtype: Union[Decimal, float]

# Usage tips
- Infra type: CPU

# Source code
```
class Float:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('FLOAT', {'default': 0, 'step': 0.01})}}
    RETURN_TYPES = ('FLOAT',)
    RETURN_NAMES = ('float',)
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Logic/Type'

    def execute(self, value):
        return (value,)
```