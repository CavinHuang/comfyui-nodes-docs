# Documentation
- Class name: Boolean
- Category: EasyUse/Logic/Type
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点类封装了处理布尔值的逻辑，使得对逻辑数据处理的基本操作和转换成为可能。

# Input types
## Required
- value
    - ‘value’参数至关重要，因为它决定了布尔操作的输入。它是应用节点逻辑的基础元素，并直接影响节点执行的结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- boolean
    - 输出‘boolean’代表节点执行的布尔操作的结果。这是一个关键的数据片段，可以用于进一步的逻辑决策或作为工作流中的条件。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class Boolean:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('BOOLEAN',)
    RETURN_NAMES = ('boolean',)
    FUNCTION = 'execute'
    CATEGORY = 'EasyUse/Logic/Type'

    def execute(self, value):
        return (value,)
```