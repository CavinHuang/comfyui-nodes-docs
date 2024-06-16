# Documentation
- Class name: TextBoxNode
- Category: 😺dzNodes/LayerUtility/Data
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

输出一段字符串。

# Input types
## Required

- text
    - 类型: STRING
    - 文本内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types

- text
    - 类型: STRING
    - 文本内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class TextBoxNode:
    def __init__(self):
        pass
    @classmethod
    def INPUT_TYPES(self):
        return {"required": {
                "text": ("STRING", {"multiline": True}),
            },}

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = 'text_box_node'
    CATEGORY = '😺dzNodes/LayerUtility/Data'

    def text_box_node(self, text):
        return (text,)
```