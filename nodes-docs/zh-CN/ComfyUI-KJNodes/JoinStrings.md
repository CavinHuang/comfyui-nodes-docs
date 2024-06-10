# Documentation
- Class name: JoinStrings
- Category: KJNodes/constants
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

JoinStrings节点旨在将两个输入字符串合并为一个单独的字符串。它通过在两个字符串之间插入一个指定的分隔符来实现这一点，有效地将它们合并成一个连贯的字符序列。在需要将多个字符串合并为一个的字符串操作任务中，如数据格式化或进一步处理的准备中，该节点发挥着关键作用。

# Input types
## Required
- string1
    - 第一个要连接的字符串。它作为最终连接字符串的初始部分，对确定连接过程的结果至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- string2
    - 第二个要连接的字符串。它在最终连接字符串中跟在第一个字符串和分隔符之后，对输出的整体结构有所贡献。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- delimiter
    - 将要插入两个输入字符串之间的字符或字符序列。分隔符在定义最终字符串的阅读方式中起着重要作用，可以根据手头任务的具体要求进行调整。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- joined_string
    - JoinStrings节点的输出是连接后的字符串，这是将两个输入字符串与指定的分隔符连接的结果。这个输出很重要，因为它代表了节点操作的最终产品，并准备好用于后续的任务或流程。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class JoinStrings:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'string1': ('STRING', {'default': '', 'forceInput': True}), 'string2': ('STRING', {'default': '', 'forceInput': True}), 'delimiter': ('STRING', {'default': ' ', 'multiline': False})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'joinstring'
    CATEGORY = 'KJNodes/constants'

    def joinstring(self, string1, string2, delimiter):
        joined_string = string1 + delimiter + string2
        return (joined_string,)
```