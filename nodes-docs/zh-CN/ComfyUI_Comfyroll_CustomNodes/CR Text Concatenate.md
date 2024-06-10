# Documentation
- Class name: CR_TextConcatenate
- Category: Comfyroll/Utils/Text
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextConcatenate节点旨在将两个独立的文本字符串合并为一个单一的字符串。它通过在两个输入文本之间插入指定的分隔符来实现这一点，有效地将它们合并为一个连贯的序列。这个节点在从多个来源创建统一的文本块时特别有用，这在各种文本处理任务中可以发挥关键作用。

# Input types
## Required
- text1
    - 参数'text1'表示要连接的第一个文本字符串。它在确定最终输出的初始内容中起着关键作用。节点的执行直接受到此参数的内容和长度的影响。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 参数'text2'是将与'text1'连接的第二个文本字符串。它在形成最终输出时至关重要，因为它提供了文本序列的后续部分。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- separator
    - 参数'separator'定义了将被插入'text1'和'text2'之间的字符串。它在控制连接文本的格式方面很重要，允许用户根据需要自定义空格和分隔符。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- STRING
    - 输出'STRING'是使用提供的'separator'连接'text1'和'text2'的结果。它代表了组合后的文本，是节点功能的主要输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextConcatenate:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'text1': ('STRING', {'multiline': False, 'default': '', 'forceInput': True}), 'text2': ('STRING', {'multiline': False, 'default': '', 'forceInput': True}), 'separator': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = (any_type, 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'concat_text'
    CATEGORY = icons.get('Comfyroll/Utils/Text')

    def concat_text(self, text1='', text2='', separator=''):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-save-text-to-file'
        return (text1 + separator + text2,)
```