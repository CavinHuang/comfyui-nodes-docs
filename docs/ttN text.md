
# Documentation
- Class name: ttN text
- Category: ttN/text
- Output node: False

ttN text节点专为处理文本输入而设计，特别允许使用动态提示进行多行文本输入。它作为ttN/text类别中文本处理的基础元素，支持文本数据的自定义和操作。

# Input types
## Required
- text
    - 该参数接受可能跨越多行的文本字符串，并支持动态提示。它对于定义要由节点处理或操作的文本内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- text
    - Comfy dtype: STRING
    - 输出经过处理或操作的文本作为字符串，保持输入的完整性和格式。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SDXLPromptStyler](../../comfyui-art-venture/Nodes/SDXLPromptStyler.md)
    - comfy-qr-by-module-split
    - comfy-qr-validate



## Source code
```python
class ttN_text:
    version = '1.0.0'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "text": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": True}),
                },
                "hidden": {"ttNnodeVersion": ttN_text.version},
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("text",)
    FUNCTION = "conmeow"

    CATEGORY = "ttN/text"

    @staticmethod
    def conmeow(text):
        return text,

```
