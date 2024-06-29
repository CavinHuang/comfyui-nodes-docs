# Documentation
- Class name: CR_TextListToString
- Category: Comfyroll/List/Utils
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextListToString节点旨在将字符串列表连接成一个单独的字符串，每个字符串之间用换行符分隔。它用于简化将多个文本条目转换为易于管理和显示的连贯统一格式的过程。

# Input types
## Required
- text_list
    - 参数'text_list'是一个字符串列表，节点将这些字符串连接成一个单独的字符串。它在确定最终输出中起着关键作用，因为它直接影响结果字符串的内容和结构。
    - Comfy dtype: STRING
    - Python dtype: List[str]

# Output types
- STRING
    - 'STRING'输出是由输入文本列表的所有元素通过换行符连接形成的串联字符串。它代表了节点操作的主要结果。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - 'show_help'输出提供了一个URL链接，指向节点功能的文档，以供进一步的帮助或信息。它是用户寻求额外指导的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextListToString:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text_list': ('STRING', {'forceInput': True})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    INPUT_IS_LIST = True
    FUNCTION = 'joinlist'
    CATEGORY = icons.get('Comfyroll/List/Utils')

    def joinlist(self, text_list):
        string_out = '\n'.join(text_list)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-list-to-string'
        return (string_out, show_help)
```