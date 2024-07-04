
# Documentation
- Class name: ttN text3BOX_3WAYconcat
- Category: ttN/text
- Output node: False

该节点旨在使用指定的分隔符以多种方式连接三个输入字符串。它能够从提供的输入创建多个连接字符串结果，为文本操作提供了灵活性。

# Input types
## Required
- text1
    - 要连接的第一个文本字符串。它在连接过程中起着至关重要的作用，其内容会影响最终结果。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 要连接的第二个文本字符串。它的包含允许与其他输入文本进行多样化的连接组合。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 要连接的第三个文本字符串。它增加了可能的连接结果的多样性，丰富了文本操作能力。
    - Comfy dtype: STRING
    - Python dtype: str
- delimiter
    - 用于在连接过程中分隔文本的字符串。它定义了文本之间的边界，影响最终连接字符串的格式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text1
    - 原始的第一个输入文本，保持不变返回。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 原始的第二个输入文本，保持不变返回。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 原始的第三个输入文本，保持不变返回。
    - Comfy dtype: STRING
    - Python dtype: str
- 1 & 2
    - 第一个和第二个输入文本的连接，用指定的分隔符分隔。
    - Comfy dtype: STRING
    - Python dtype: str
- 1 & 3
    - 第一个和第三个输入文本的连接，用指定的分隔符分隔。
    - Comfy dtype: STRING
    - Python dtype: str
- 2 & 3
    - 第二个和第三个输入文本的连接，用指定的分隔符分隔。
    - Comfy dtype: STRING
    - Python dtype: str
- concat
    - 按顺序连接所有三个输入文本，用指定的分隔符分隔。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_text3BOX_3WAYconcat:
    version = '1.0.0'
    def __init__(self):
        pass
    """
    Concatenate 3 strings, in various ways.
    """
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text1": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text2": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text3": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "delimiter": ("STRING", {"default":",","multiline": False}),
                    },
                "hidden": {"ttNnodeVersion": ttN_text3BOX_3WAYconcat.version},
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING",)
    RETURN_NAMES = ("text1", "text2", "text3", "1 & 2", "1 & 3", "2 & 3", "concat",)
    FUNCTION = "conmeow"

    CATEGORY = "ttN/text"

    def conmeow(self, text1='', text2='', text3='', delimiter=''):
        text1 = '' if text1 == 'undefined' else text1
        text2 = '' if text2 == 'undefined' else text2
        text3 = '' if text3 == 'undefined' else text3

        if delimiter == '\\n':
            delimiter = '\n'

        t_1n2 = delimiter.join([text1, text2])
        t_1n3 = delimiter.join([text1, text3])
        t_2n3 = delimiter.join([text2, text3])
        concat = delimiter.join([text1, text2, text3])
       
        return text1, text2, text3, t_1n2, t_1n3, t_2n3, concat

```
