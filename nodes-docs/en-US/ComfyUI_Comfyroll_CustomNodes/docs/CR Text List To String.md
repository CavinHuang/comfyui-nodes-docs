---
tags:
- List
- Text
---

# 🛠️ CR Text List To String
## Documentation
- Class name: `CR Text List To String`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/🛠️ Utils`
- Output node: `False`

This node is designed to convert a list of text items into a single string representation, potentially for display or further processing. It emphasizes the transformation of a collection of textual elements into a unified text format, facilitating operations that require a singular text entity.
## Input types
### Required
- **`text_list`**
    - The 'text_list' parameter represents the list of text items to be concatenated into a single string. It plays a crucial role in determining the content and structure of the resulting string.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The 'STRING' output is the concatenated result of the input text list, transformed into a single string for ease of use or display.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page related to this node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextListToString:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                "text_list": ("STRING", {"forceInput": True}),
                    },
                }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    INPUT_IS_LIST = True    
    FUNCTION = "joinlist"
    CATEGORY = icons.get("Comfyroll/List/Utils")

    def joinlist(self, text_list):
    
        string_out = "\n".join(text_list)

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-list-to-string"

        return (string_out, show_help, )

```
