# Documentation
- Class name: CR_TextInputSwitch
- Category: Comfyroll/Utils/Logic
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextInputSwitch节点旨在根据给定的整数输入促进文本输入的条件选择。它提供了一个简单的机制，用于在两个文本输入之间切换，这在需要根据输入值选择不同文本输出的场景中特别有用。

# Input types
## Required
- Input
    - 'Input'参数至关重要，因为它决定了将选择哪个文本输入。它在整数范围内工作，其中1的输入对应于'text1'，2的输入对应于'text2'，从而控制节点的输出。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- text1
    - 'text1'参数是一个可选的字符串输入，它表示当'Input'参数设置为1时要返回的文本。它在定义可能的输入条件之一的输出中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 'text2'参数是另一个可选的字符串输入，它表示当'Input'参数设置为2时要返回的文本。它通过为不同的输入条件提供替代文本输出，补充了'text1'参数。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 节点的主要输出是一个字符串，根据'Input'参数的值，它对应于'text1'或'text2'。这个输出很重要，因为它代表了条件切换后选定的文本。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 'show_help'输出提供了一个指向节点文档页面的URL链接，使用户可以轻松获取有关如何有效使用该节点的更多信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2})}, 'optional': {'text1': ('STRING', {'forceInput': True}), 'text2': ('STRING', {'forceInput': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Utils/Logic')

    def switch(self, Input, text1=None, text2=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-text-input-switch'
        if Input == 1:
            return (text1, show_help)
        else:
            return (text2, show_help)
```