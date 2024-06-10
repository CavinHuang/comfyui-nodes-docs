# Documentation
- Class name: TextConcat
- Category: Mikey/Text
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

TextConcat节点旨在高效地将多个字符串组合成单个字符串。它通过接受文本列表和分隔符，然后使用指定的分隔符将提供的文本串联起来，实现这一功能。这个节点在从不同的信息片段中创建一个连贯的字符串时非常有用，这在文本处理和数据准备任务中至关重要。

# Input types
## Required
- delimiter
    - 分隔符参数是一个字符串，用于在串联各个文本输入时分隔它们。它在确定输出字符串的最终格式中起着关键作用，允许用户控制串联文本之间的空格和分隔。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- text1
    - text1参数代表可以与其他文本串联的第一个文本输入。它是可选的，如果提供，它将被包含在最终串联的字符串中。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - text2参数是另一个可选的文本输入，可以包含在串联过程中。它允许进一步定制最终字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - text3参数是串联中的另一个额外的可选文本输入。它扩展了功能，以在最终输出中包含更多的文本元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text4
    - text4参数是另一个可选输入，可以与其他文本串联。它在构建所需的输出字符串中提供了进一步的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- text5
    - text5参数是用于串联的最后一个可选文本输入。它提供了在字符串最终确定之前添加文本的最后机会。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- concatenated_text
    - concatenated_text输出是使用指定的分隔符将所有输入文本连接在一起后得到的最终字符串。它代表了串联过程的成果，是TextConcat节点的主要输出。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextConcat:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'delimiter': ('STRING', {'default': ' '})}, 'optional': {'text1': ('STRING', {'default': ''}), 'text2': ('STRING', {'default': ''}), 'text3': ('STRING', {'default': ''}), 'text4': ('STRING', {'default': ''}), 'text5': ('STRING', {'default': ''})}}
    RETURN_TYPES = ('STRING',)
    FUNCTION = 'concat'
    CATEGORY = 'Mikey/Text'

    def concat(self, delimiter, text1, text2, text3, text4, text5):
        texts = []
        if text1:
            texts.append(text1)
        if text2:
            texts.append(text2)
        if text3:
            texts.append(text3)
        if text4:
            texts.append(text4)
        if text5:
            texts.append(text5)
        text = delimiter.join(texts)
        return (text,)
```