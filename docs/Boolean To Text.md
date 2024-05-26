# Documentation
- Class name: WAS_Boolean_To_Text
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Boolean_To_Text节点旨在将布尔值转换为'True'或'False'的文本表示。它作为一个简单而有效的桥梁，将布尔逻辑与文本输出相连接，促进了布尔运算与基于文本的系统或流程的整合。

# Input types
## Required
- boolean
    - 参数'boolean'对节点的操作至关重要，因为它是决定节点输出的输入。它直接影响节点的执行，通过指示返回文本'True'或'False'来决定。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text
    - 输出参数'text'代表输入布尔值的文本等价物。它很重要，因为它提供了一种清晰直接的方式来将布尔逻辑转换为人类可读的格式。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Boolean_To_Text:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'boolean': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = 'do'
    CATEGORY = 'WAS Suite/Logic'

    def do(self, boolean):
        if boolean:
            return ('True',)
        return ('False',)
```