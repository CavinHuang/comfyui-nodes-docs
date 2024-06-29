---
tags:
- Text
---

# text
## Documentation
- Class name: `ttN text`
- Category: `ttN/text`
- Output node: `False`

The ttN text node is designed for handling text input, specifically allowing for multiline text input with dynamic prompts. It serves as a foundational element in text processing within the ttN/text category, enabling the customization and manipulation of text data.
## Input types
### Required
- **`text`**
    - This parameter accepts a string of text, potentially spanning multiple lines, and supports dynamic prompts. It's essential for defining the text content to be processed or manipulated by the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - Outputs the processed or manipulated text as a string, maintaining the input's integrity and format.
    - Python dtype: `str`
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
