
# Documentation
- Class name: Text Concatenate (JPS)
- Category: JPS Nodes/Text
- Output node: False

Text Concatenate节点旨在将多个文本输入合并成一个单一字符串，使用指定的分隔符来分隔这些文本。这一功能对于从各种输入创建连接字符串至关重要，允许灵活的文本操作和聚合。

# Input types
## Required
- delimiter
    - 指定用于分隔文本输入的分隔符类型，如空格或逗号，影响连接文本的格式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- text1
    - 要连接的第一个文本输入。
    - Comfy dtype: STRING
    - Python dtype: str
- text2
    - 要连接的第二个文本输入，将在第一个输入后添加，中间使用指定的分隔符。
    - Comfy dtype: STRING
    - Python dtype: str
- text3
    - 要连接的第三个文本输入，将在前面的输入后添加，中间使用指定的分隔符。
    - Comfy dtype: STRING
    - Python dtype: str
- text4
    - 要连接的第四个文本输入，将在前面的输入后添加，中间使用指定的分隔符。
    - Comfy dtype: STRING
    - Python dtype: str
- text5
    - 要连接的第五个文本输入，将在前面的输入后添加，中间使用指定的分隔符。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - 使用指定分隔符连接给定文本输入后得到的结果字符串。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Text_Concatenate:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "delimiter": (["none", "space", "comma"],),
            },
            "optional": {
                "text1": ("STRING", {"forceInput": True}),
                "text2": ("STRING", {"forceInput": True}),      
                "text3": ("STRING", {"forceInput": True}),      
                "text4": ("STRING", {"forceInput": True}),      
                "text5": ("STRING", {"forceInput": True}),       
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "get_contxt"
    CATEGORY = "JPS Nodes/Text"

    def get_contxt(self, delimiter, text1=None, text2=None, text3=None, text4=None, text5=None):
        needdelim = False
        delim = ""
        if delimiter == "space":
            delim = " "
        if delimiter == "comma":
            delim = ", "

        concatenated = ""

        if text1:
            concatenated = text1
            needdelim = True
        
        if text2:
            if needdelim:
                concatenated += delim
            concatenated += text2
            needdelim = True
        
        if text3:
            if needdelim:
                concatenated += delim
            concatenated += text3
            needdelim = True

        if text4:
            if needdelim:
                concatenated += delim
            concatenated += text4
            needdelim = True

        if text5:
            if needdelim:
                concatenated += delim
            concatenated += text5
            needdelim = True

        return (concatenated,)

```
