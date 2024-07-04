
# Documentation
- Class name: PresentString
- Category: klinter
- Output node: True

PresentString节点旨在UI界面中展示给定的字符串，它能够解析并如实呈现输入的文本内容。

# Input types
## Required
- text
    - text参数是PresentString节点的主要输入，需要一个待显示的字符串。它的作用至关重要，因为它直接决定了将呈现给用户的具体内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - Comfy dtype: STRING
    - 未知
    - Python dtype: unknown
- ui
    - ui输出参数包含了输入文本的用户界面表示，允许直接可视化展示所提供的字符串。
    - Comfy dtype: 未知
    - Python dtype: 未知


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PresentString:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "PresentString"
    OUTPUT_NODE = True

    CATEGORY = "klinter"

    def PresentString(self, text):
        # Parse the string
        return {"ui": {"text": text}, "result": (text,)}

```
