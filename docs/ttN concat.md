
# Documentation
- Class name: ttN concat
- Category: ttN/text
- Output node: False

ttN_concat节点旨在使用指定的分隔符连接三个输入字符串，从而实现文本处理工作流中灵活的字符串操作和组合。

# Input types
## Required
- text1
    - 要连接的第一个文本字符串。它支持多行输入和动态提示，能够处理复杂的文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 要连接的第二个文本字符串，同样支持多行输入和动态提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 要连接的第三个文本字符串，进一步扩展了该节点处理复杂文本组合的能力。
    - Comfy dtype: STRING
    - Python dtype: str
- delimiter
    - 用于分隔连接文本的字符串。它可以是单个字符或一系列字符，默认情况下不包括换行符。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- concat
    - 使用指定分隔符连接text1、text2和text3的结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_concat:
    version = '1.0.0'
    def __init__(self):
        pass
    """
    Concatenate 2 strings
    """
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text1": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text2": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text3": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "delimiter": ("STRING", {"default":",","multiline": False}),
                    },
                "hidden": {"ttNnodeVersion": ttN_concat.version},
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("concat",)
    FUNCTION = "conmeow"

    CATEGORY = "ttN/text"

    def conmeow(self, text1='', text2='', text3='', delimiter=''):
        text1 = '' if text1 == 'undefined' else text1
        text2 = '' if text2 == 'undefined' else text2
        text3 = '' if text3 == 'undefined' else text3

        if delimiter == '\\n':
            delimiter = '\n'

        concat = delimiter.join([text1, text2, text3])
       
        return (concat,)

```
