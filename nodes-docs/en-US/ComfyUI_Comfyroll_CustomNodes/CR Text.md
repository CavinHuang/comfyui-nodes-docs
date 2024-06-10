---
tags:
- List
- MultilineText
- Text
---

# 🔤 CR Text
## Documentation
- Class name: `CR Text`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

This node is designed to handle multiline text input, providing a straightforward way to work with text data within the node's ecosystem. It simplifies the process of inputting and manipulating text, offering a link to further help and guidance on its usage.
## Input types
### Required
- **`text`**
    - The 'text' parameter allows users to input multiline text. This input is essential for the node's operation, serving as the primary data that the node processes and manipulates.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `*`
    - Returns the original text input by the user.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to a help page for further information and guidance on using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_Text:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": '', "multiline": True}),
            }
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("text", "show_help", )
    FUNCTION = "text_multiline"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def text_multiline(self, text):
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-text"

        return (text, show_help,)

```
