---
tags:
- Text
- TextReplacement
---

# 🔤 CR Text Replace
## Documentation
- Class name: `CR Text Replace`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

This node allows for the replacement of specified substrings within a given text with new substrings. It supports up to three distinct find-and-replace operations within a single execution, making it a versatile tool for text manipulation and content editing.
## Input types
### Required
- **`text`**
    - The primary text in which the replacements will be made. It serves as the foundational content for the node's operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`find1`**
    - The first substring to be searched for within the primary text. If found, it will be replaced with 'replace1'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace1`**
    - The replacement for the first found substring 'find1' within the primary text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`find2`**
    - The second substring to be searched for within the primary text. If found, it will be replaced with 'replace2'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace2`**
    - The replacement for the second found substring 'find2' within the primary text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`find3`**
    - The third substring to be searched for within the primary text. If found, it will be replaced with 'replace3'.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`replace3`**
    - The replacement for the third found substring 'find3' within the primary text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `*`
    - The modified text after all specified replacements have been made.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and documentation about the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Aspect Ratio](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Aspect Ratio.md)



## Source code
```python
class CR_TextReplace:

    @ classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "default": "", "forceInput": True}),            
                },
            "optional": {
                "find1": ("STRING", {"multiline": False, "default": ""}),
                "replace1": ("STRING", {"multiline": False, "default": ""}),
                "find2": ("STRING", {"multiline": False, "default": ""}),
                "replace2": ("STRING", {"multiline": False, "default": ""}),
                "find3": ("STRING", {"multiline": False, "default": ""}),
                "replace3": ("STRING", {"multiline": False, "default": ""}),    
            },
        }

    RETURN_TYPES = (any_type, "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "replace_text"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def replace_text(self, text, find1="", replace1="", find2="", replace2="", find3="", replace3=""):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-replace" 
        
        text = text.replace(find1, replace1)
        text = text.replace(find2, replace2)
        text = text.replace(find3, replace3)
        
        return (text, show_help)    

```
