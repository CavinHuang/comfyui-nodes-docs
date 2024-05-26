# Documentation
- Class name: FloatConstant
- Category: KJNodes/constants
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

FloatConstant节点旨在数据处理或机器学习流程中提供一个常量浮点数值。它确保一个一致且预定义的数值可用于后续操作，有助于系统性能的稳定性和可预测性。

# Input types
## Required
- value
    - 参数'value'是FloatConstant节点的核心，定义了将被输出的特定浮点数。它在节点的操作中起着关键作用，因为它直接影响节点的结果，无需进一步计算。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- value
    - 输出'value'代表了FloatConstant节点提供的常量浮点数。它很重要，因为它作为工作流中下游过程的可靠和不变的输入。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class FloatConstant:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('FLOAT', {'default': 0.0, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 0.001})}}
    RETURN_TYPES = ('FLOAT',)
    RETURN_NAMES = ('value',)
    FUNCTION = 'get_value'
    CATEGORY = 'KJNodes/constants'

    def get_value(self, value):
        return (value,)
```