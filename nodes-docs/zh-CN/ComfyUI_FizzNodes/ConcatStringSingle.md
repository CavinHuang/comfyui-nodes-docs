# Documentation
- Class name: ConcatStringSingle
- Category: FizzNodes 📅🅕🅝/HelperNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

此节点旨在将两个字符串合并为一个单一的字符串。它作为文本操作中的基础工具，使用户能够无缝地合并文本数据。

# Input types
## Required
- string_a
    - 要连接的第一个字符串。它在确定最终输出中起着关键作用，因为它构成了组合字符串的初始部分。
    - Comfy dtype: STRING
    - Python dtype: str
- string_b
    - 要连接的第二个字符串。它很重要，因为它提供了最终输出中跟在第一个字符串后面的字符串部分。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- concatenated_string
    - 输出是 'string_a' 和 'string_b' 连接后产生的组合字符串。它代表了合并后的文本数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class ConcatStringSingle:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'string_a': ('STRING', {'forceInput': True, 'default': '', 'multiline': True}), 'string_b': ('STRING', {'forceInput': True, 'default': '', 'multiline': True})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'concat'
    CATEGORY = 'FizzNodes 📅🅕🅝/HelperNodes'

    def concat(self, string_a, string_b):
        c = string_a + string_b
        return (c,)
```