# Documentation
- Class name: CR_Text
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Text节点旨在处理和处理文本数据，提供有效管理多行文本输入的功能。它特别适用于需要文本操作和与外部文档交互能力的应用。

# Input types
## Required
- text
    - ‘text’参数对于节点的操作至关重要，因为它是文本处理的主要输入。它允许多行输入，增强了节点处理各种文本格式的多功能性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - ‘text’输出参数代表处理后的文本数据，可能包括节点内部函数所做的修改或增强。它是依赖文本更新状态的下游应用的关键元素。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’输出提供了一个指向外部文档的URL链接，为用户提供了额外的资源来理解节点的功能和使用方式。对于寻求更多信息或帮助的用户来说，这是一个宝贵的工具。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Text:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'default': '', 'multiline': True})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('text', 'show_help')
    FUNCTION = 'text_multiline'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def text_multiline(self, text):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-text'
        return (text, show_help)
```