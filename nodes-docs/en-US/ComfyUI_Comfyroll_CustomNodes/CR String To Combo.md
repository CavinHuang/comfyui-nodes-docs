---
tags:
- ComfyrollNodes
---

# 🔧 CR String To Combo
## Documentation
- Class name: `CR String To Combo`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔧 Conversion`
- Output node: `False`

The CR_StringToCombo node is designed to convert a string input into a combination or list based on specified delimiters, facilitating the manipulation and analysis of textual data in a structured format.
## Input types
### Required
- **`text`**
    - The 'text' parameter accepts a string input that the node will attempt to split into a combination or list based on commas. It plays a crucial role in determining the output structure and content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`any`**
    - Comfy dtype: `*`
    - The output is a list derived from the first element of the split input string, intended for further processing or analysis.
    - Python dtype: `list`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for the CR_StringToCombo node, offering users guidance and additional information.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_StringToCombo:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": False, "default": "", "forceInput": True}),
            },
        }

    RETURN_TYPES = (any, "STRING", )
    RETURN_NAMES = ("any", "show_help", )
    FUNCTION = "convert"
    CATEGORY = icons.get("Comfyroll/Utils/Conversion")

    def convert(self, text):
    
        text_list = list()
        
        if text != "":
            values = text.split(',')
            text_list = values[0]
            print(text_list)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-string-to-combo"

        return (text_list, show_help, )

```
