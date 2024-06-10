# Documentation
- Class name: promptReplace
- Category: EasyUse/Prompt
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过识别并替换给定文本中的指定子字符串来促进文本转换过程。其主要目的是简化编辑过程，使用户能够高效地进行目标修改。

# Input types
## Required
- prompt
    - ‘prompt’参数是节点操作的基础，代表将要进行替换处理的文本。它至关重要，因为它决定了替换发生的内容和上下文。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- find1
    - ‘find1’参数指定了文本中要识别并替换的第一个子字符串。其重要性在于编辑的目标性，有助于节点进行精确的修改。
    - Comfy dtype: STRING
    - Python dtype: str
- replace1
    - ‘replace1’参数定义了将替换识别出的‘find1’子字符串的文本。它是转换过程中不可或缺的一部分，因为它决定了替换的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- find2
    - ‘find2’参数用于识别并替换文本中的第二组子字符串。其作用是扩展节点的编辑能力，允许进行多个目标替换。
    - Comfy dtype: STRING
    - Python dtype: str
- replace2
    - ‘replace2’参数对应于将替换‘find2’子字符串的文本，进一步促进整体文本转换过程。
    - Comfy dtype: STRING
    - Python dtype: str
- find3
    - ‘find3’参数用于识别并替换第三组子字符串，增强了节点在文本编辑中的多功能性和适应性。
    - Comfy dtype: STRING
    - Python dtype: str
- replace3
    - ‘replace3’参数用于最终替换，确保节点能够在单一操作中解决各种编辑需求。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 输出‘prompt’是应用了所有指定替换的修改后的文本。它代表了节点功能的最终成果，为用户提供了原始文本的更新版本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class promptReplace:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'prompt': ('STRING', {'multiline': True, 'default': '', 'forceInput': True})}, 'optional': {'find1': ('STRING', {'multiline': False, 'default': ''}), 'replace1': ('STRING', {'multiline': False, 'default': ''}), 'find2': ('STRING', {'multiline': False, 'default': ''}), 'replace2': ('STRING', {'multiline': False, 'default': ''}), 'find3': ('STRING', {'multiline': False, 'default': ''}), 'replace3': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('prompt',)
    FUNCTION = 'replace_text'
    CATEGORY = 'EasyUse/Prompt'

    def replace_text(self, text, find1='', replace1='', find2='', replace2='', find3='', replace3=''):
        text = text.replace(find1, replace1)
        text = text.replace(find2, replace2)
        text = text.replace(find3, replace3)
        return (text,)
```