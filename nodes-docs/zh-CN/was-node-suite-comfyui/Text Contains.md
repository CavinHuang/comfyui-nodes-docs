# Documentation
- Class name: WAS_Text_Contains
- Category: WAS Suite/Logic
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

`text_contains` 方法旨在确定一个指定的子字符串是否存在于一个较大的文本字符串中。它通过比较这两个字符串并返回一个布尔值来指示子字符串的存在或缺失。此方法对于文本分析和数据验证任务至关重要，其中特定文本模式的存在是感兴趣的。

# Input types
## Required
- text
    - ‘text’ 参数代表方法将搜索 'sub_text' 的较大文本主体。它对节点的操作至关重要，因为它定义了搜索的范围并直接影响方法的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- sub_text
    - ‘sub_text’ 参数是方法将在 'text' 参数中查找的特定字符串。它在较大文本中的存在是方法旨在确定的，使其成为节点功能的关键输入。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- case_insensitive
    - ‘case_insensitive’ 参数决定在 'text' 中搜索 'sub_text' 是否应该忽略字母的大小写。这对于确保搜索不受大小写差异的阻碍可能是重要的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- result
    - ‘result’ 输出指示是否在 'text' 中找到了 'sub_text'。它是一个二进制指示器，为方法所提出的问题提供了清晰而简洁的答案。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Text_Contains:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'text': ('STRING', {'default': '', 'multiline': False}), 'sub_text': ('STRING', {'default': '', 'multiline': False})}, 'optional': {'case_insensitive': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('BOOLEAN',)
    FUNCTION = 'text_contains'
    CATEGORY = 'WAS Suite/Logic'

    def text_contains(self, text, sub_text, case_insensitive):
        if case_insensitive:
            sub_text = sub_text.lower()
            text = text.lower()
        return (sub_text in text,)
```