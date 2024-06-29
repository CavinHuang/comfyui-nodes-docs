# Documentation
- Class name: INTConstant
- Category: KJNodes/constants
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

INTConstant节点旨在网络中提供一个常量整数值。当操作需要一个固定的整数时，如索引、阈值或任何需要常量值的场景，它都会被使用。此节点确保在执行过程中该值保持不变，提供一个稳定且可预测的整数引用。

# Input types
## Required
- value
    - ‘value’参数是INTConstant节点的核心，代表将被输出的常量整数。它在节点操作中扮演着关键角色，因为它定义了要提供给网络的固定整数值。此参数的重要性在于其能够为各种计算任务提供一致且不变的整数引用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- value
    - 来自INTConstant节点的‘value’输出是被设置为输入的常量整数。它作为网络中下游操作的固定整数的可靠来源，确保该值保持恒定，不受外部影响而改变。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class INTConstant:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('value',)
    FUNCTION = 'get_value'
    CATEGORY = 'KJNodes/constants'

    def get_value(self, value):
        return (value,)
```