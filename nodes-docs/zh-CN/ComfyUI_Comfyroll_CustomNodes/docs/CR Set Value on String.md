# Documentation
- Class name: CR_SetValueOnString
- Category: Comfyroll/Utils/Conditional
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SetValueOnString 是一个根据特定子字符串的存在条件替换字符串部分的节点。它评估输入文本中给定的测试字符串，并根据是否找到测试字符串，将文本替换为一个值或另一个值。这个节点适用于在满足某些条件时创建动态文本。

# Input types
## Required
- text
    - 'text' 参数是节点将评估的主要内容。它至关重要，因为它是确定是否存在 'test_string' 以及将使用哪个替换值的基础。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- test_string
    - 'test_string' 参数是节点在 'text' 中搜索的子字符串。如果找到，则使用 'value_if_true' 作为替换；否则，使用 'value_if_false'。
    - Comfy dtype: STRING
    - Python dtype: str
- value_if_true
    - 'value_if_true' 参数指定了如果在 'text' 中找到 'test_string'，则将替换 'text' 的字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- value_if_false
    - 'value_if_false' 参数定义了如果未在 'text' 中找到 'test_string'，则将用于替换 'text' 的字符串。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 输出 'STRING' 是条件替换过程的结果。如果输入文本中存在 'test_string'，则为 'value_if_true'；如果不存在，则为 'value_if_false'。
    - Comfy dtype: STRING
    - Python dtype: str
- BOOLEAN
    - 'BOOLEAN' 输出指示是否在输入文本中找到了 'test_string'。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- show_help
    - 'show_help' 输出提供了指向节点文档的 URL 链接，以供进一步帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SetValueOnString:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': False, 'default': '', 'forceInput': True})}, 'optional': {'test_string': ('STRING', {'multiline': False, 'default': ''}), 'value_if_true': ('STRING', {'multiline': False, 'default': ''}), 'value_if_false': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = (any_type, 'BOOLEAN', 'STRING')
    RETURN_NAMES = ('STRING', 'BOOLEAN', 'show_help')
    FUNCTION = 'replace_text'
    CATEGORY = icons.get('Comfyroll/Utils/Conditional')

    def replace_text(self, text, test_string, value_if_true, value_if_false):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-set-value-on-string'
        if test_string in text:
            text_out = value_if_true
            bool_out = True
        else:
            text_out = value_if_false
            bool_out = False
        return (text_out, bool_out, show_help)
```