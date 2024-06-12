---
tags:
- Concatenate
- Text
---

# 🔤 CR Text Concatenate
## Documentation
- Class name: `CR Text Concatenate`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

The CR Text Concatenate node is designed to merge two text strings into a single string, optionally inserting a separator between them. This functionality is useful for combining pieces of text in a controlled manner, allowing for the creation of new strings from existing ones.
## Input types
### Required
### Optional
- **`text1`**
    - The first text string to be concatenated. It serves as the starting point of the new string.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text string to be concatenated. It is appended to the first string, optionally separated by a specified separator.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`separator`**
    - A text string used as a separator between the first and second text strings during concatenation. If left empty, the texts are directly concatenated without any separation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `*`
    - The concatenated text resulting from merging the first and second text strings with an optional separator.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for the CR Text Concatenate node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Text Concatenate](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Text Concatenate.md)
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
class CR_TextConcatenate:

    @ classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                },
                "optional": {
                "text1": ("STRING", {"multiline": False, "default": "", "forceInput": True}),                
                "text2": ("STRING", {"multiline": False, "default": "", "forceInput": True}), 
                "separator": ("STRING", {"multiline": False, "default": ""}),                
            },
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "concat_text"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def concat_text(self, text1="", text2="", separator=""):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-save-text-to-file" 
        
        return (text1 + separator + text2, )

```
