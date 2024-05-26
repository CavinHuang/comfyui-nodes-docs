# Documentation
- Class name: CR_StringToCombo
- Category: Comfyroll/Utils/Conversion
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_StringToCombo 节点旨在将文本字符串转换为值的列表，提供了一种更有效地处理和操作文本数据的方法。它在数据转换过程中扮演着关键角色，特别是在处理逗号分隔值时。

# Input types
## Required
- text
    - ‘text’参数对于节点的操作至关重要，因为它是待转换的输入文本。它的重要性在于确定输出列表的内容和结构，使其成为转换过程的基本部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- any
    - ‘any’输出代表从输入文本派生出的转换后的值列表。它很重要，因为它是节点转换功能的主要结果，包含了转换后的数据以供进一步使用。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- show_help
    - ‘show_help’输出提供了指向节点文档页面的URL链接，为用户提供了直接参考，以便有效使用该节点的进一步信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_StringToCombo:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '', 'forceInput': True})}}
    RETURN_TYPES = (any, 'STRING')
    RETURN_NAMES = ('any', 'show_help')
    FUNCTION = 'convert'
    CATEGORY = icons.get('Comfyroll/Utils/Conversion')

    def convert(self, text):
        text_list = list()
        if text != '':
            values = text.split(',')
            text_list = values[0]
            print(text_list)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-string-to-combo'
        return (text_list, show_help)
```