# Documentation
- Class name: CR_TextReplace
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextReplace 是一个用于执行文本替换操作的节点。它能够高效地在给定的文本中替换指定的字符串。这个节点特别适用于预处理文本数据，其中需要在数据集中一致地更改某些模式或字符串。

# Input types
## Required
- text
    - ‘text’参数是节点的主要输入。它是将经历替换操作的文本数据。此参数至关重要，因为它是将由节点修改的内容。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- find1
    - ‘find1’参数是一个可选的字符串，用于指定文本中要替换的第一个子字符串。它与‘replace1’一起使用，以定义第一次替换操作。
    - Comfy dtype: STRING
    - Python dtype: str
- replace1
    - ‘replace1’参数是将替换文本中‘find1’子字符串的字符串。它是一个可选参数，与‘find1’一起工作。
    - Comfy dtype: STRING
    - Python dtype: str
- find2
    - ‘find2’参数用于指定需要替换的第二个子字符串。它是节点内第二组查找和替换操作的一部分。
    - Comfy dtype: STRING
    - Python dtype: str
- replace2
    - ‘replace2’参数定义了将替换文本中‘find2’子字符串的字符串。它是第二对替换中的一个可选组件。
    - Comfy dtype: STRING
    - Python dtype: str
- find3
    - ‘find3’参数用于指定打算替换的第三个子字符串。它完成了节点内的第三组查找和替换动作。
    - Comfy dtype: STRING
    - Python dtype: str
- replace3
    - ‘replace3’参数是将替换文本中‘find3’子字符串的字符串。它是可选替换参数的最后一部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - ‘STRING’输出参数表示所有替换操作完成后的文本。它是节点执行的主要结果。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - ‘show_help’输出参数提供了一个链接到节点文档页面的URL，如果需要，可以提供进一步的帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextReplace:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': '', 'forceInput': True})}, 'optional': {'find1': ('STRING', {'multiline': False, 'default': ''}), 'replace1': ('STRING', {'multiline': False, 'default': ''}), 'find2': ('STRING', {'multiline': False, 'default': ''}), 'replace2': ('STRING', {'multiline': False, 'default': ''}), 'find3': ('STRING', {'multiline': False, 'default': ''}), 'replace3': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'replace_text'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def replace_text(self, text, find1='', replace1='', find2='', replace2='', find3='', replace3=''):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-replace'
        text = text.replace(find1, replace1)
        text = text.replace(find2, replace2)
        text = text.replace(find3, replace3)
        return (text, show_help)
```