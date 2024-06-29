# Documentation
- Class name: StringConstantMultiline
- Category: KJNodes/constants
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

`StringConstantMultiline` 节点旨在处理和操作多行字符串。它提供将多行输入转换为单个字符串的功能，可选择性地剥离换行符以创建连续的文本块。该节点特别适用于需要进一步处理或显示的清洁、格式化文本的任务。

# Input types
## Required
- string
    - “string”参数是节点的主要输入，期望一个多行字符串。它在节点的操作中起着关键作用，因为它是将要处理的文本。节点处理多行输入的能力对于需要跨多行进行文本操作的应用程序来说非常重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- strip_newlines
    - “strip_newlines”参数是一个可选的布尔标志，用于确定是否应从输入字符串中删除换行符。当设置为True时，它确保输出是一个没有换行符的单一连续文本块，这对于某些文本处理任务来说很重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- new_string
    - “new_string”输出是输入字符串的加工版本，根据“strip_newlines”参数，可能会删除换行符。这个输出很重要，因为它代表了可以用于后续操作或分析的最终格式化文本。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StringConstantMultiline:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'string': ('STRING', {'default': '', 'multiline': True}), 'strip_newlines': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'stringify'
    CATEGORY = 'KJNodes/constants'

    def stringify(self, string, strip_newlines):
        new_string = []
        for line in io.StringIO(string):
            if not line.strip().startswith('\n') and strip_newlines:
                line = line.replace('\n', '')
            new_string.append(line)
        new_string = '\n'.join(new_string)
        return (new_string,)
```