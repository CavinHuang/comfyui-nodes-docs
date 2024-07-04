
# Documentation
- Class name: ttN text7BOX_concat
- Category: ttN/text
- Output node: False

该节点旨在将最多七个文本输入连接成一个单一字符串，使用指定的分隔符来分隔每个文本输入。这一功能允许灵活的文本操作和聚合，适用于需要以结构化方式组合多个文本片段的场景。

# Input types
## Required
- text1
    - 要连接的第一个文本输入。它在连接过程中扮演基础角色，作为组合输出的起点。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 要连接的第二个文本输入。它紧随第一个输入，加入到被合并的文本序列中。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 要连接的第三个文本输入。它继续被合并的文本序列，在第二个输入之后添加更多内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text4
    - 要连接的第四个文本输入。它扩展了文本序列，为组合输出添加额外内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text5
    - 要连接的第五个文本输入。它进一步扩展了文本序列，用更多内容丰富组合输出。
    - Comfy dtype: STRING
    - Python dtype: str
- text6
    - 要连接的第六个文本输入。它为组合输出增添深度，为序列贡献额外内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text7
    - 要连接的第七个也是最后一个文本输入。它完成了文本序列，最终确定组合输出的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- delimiter
    - 指定用于在连接输出中分隔每个文本输入的字符或字符序列。此参数允许自定义输出格式。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text1
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- text2
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- text3
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- text4
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- text5
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- text6
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- text7
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- concat
    - Comfy dtype: STRING
    - 最终连接的字符串，由最多七个文本输入组成，用指定的分隔符分隔。这个输出代表了连接过程的最终结果。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_text7BOX_concat:
    version = '1.0.0'
    def __init__(self):
        pass
    """
    Concatenate many strings
    """
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text1": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text2": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text3": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text4": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text5": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text6": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "text7": ("STRING", {"multiline": True, "default": '', "dynamicPrompts": True}),
                    "delimiter": ("STRING", {"default":",","multiline": False}),
                    },
                "hidden": {"ttNnodeVersion": ttN_text7BOX_concat.version},
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING", "STRING",)
    RETURN_NAMES = ("text1", "text2", "text3", "text4", "text5", "text6", "text7", "concat",)
    FUNCTION = "conmeow"

    CATEGORY = "ttN/text"

    def conmeow(self, text1, text2, text3, text4, text5, text6, text7, delimiter):
        text1 = '' if text1 == 'undefined' else text1
        text2 = '' if text2 == 'undefined' else text2
        text3 = '' if text3 == 'undefined' else text3
        text4 = '' if text4 == 'undefined' else text4
        text5 = '' if text5 == 'undefined' else text5
        text6 = '' if text6 == 'undefined' else text6
        text7 = '' if text7 == 'undefined' else text7

        if delimiter == '\\n':
            delimiter = '\n'
            
        texts = [text1, text2, text3, text4, text5, text6, text7]        
        concat = delimiter.join(text for text in texts if text)
        return text1, text2, text3, text4, text5, text6, text7, concat

```
