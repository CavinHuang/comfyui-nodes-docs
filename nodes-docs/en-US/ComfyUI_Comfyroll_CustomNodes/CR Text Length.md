---
tags:
- Text
---

# 🔤 CR Text Length
## Documentation
- Class name: `CR Text Length`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `False`

This node calculates the length of a given text string and provides a link to further documentation or help related to the node.
## Input types
### Required
- **`text`**
    - The text string whose length is to be calculated. This input is essential for determining the output integer value representing the text's length.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The length of the input text string, represented as an integer.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL string pointing to further documentation or help related to the CR Text Length node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextLength:

    @ classmethod
    def INPUT_TYPES(cls):
         
        return {
            "required": {
                "text": ("STRING", {"multiline": False, "default": "", "forceInput": True}),            
            },
        }

    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("INT", "show_help", )
    FUNCTION = "len_text"
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def len_text(self, text):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-text-length" 
  
        int_out = len(text)

        return (int_out, show_help, )

```
