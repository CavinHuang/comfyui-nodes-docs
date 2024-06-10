---
tags:
- BooleanLogic
- ConditionalSelection
---

# 🔧 CR String To Boolean
## Documentation
- Class name: `CR String To Boolean`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔧 Conversion`
- Output node: `False`

The CR String To Boolean node is designed to convert a string input into a boolean output based on predefined string values representing true or false. It also provides a link to further documentation or help related to its functionality.
## Input types
### Required
- **`text`**
    - The 'text' parameter accepts a string input that is evaluated to determine its boolean value. The conversion is based on specific string values representing true or false, making it crucial for controlling the node's output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`BOOLEAN`**
    - Comfy dtype: `BOOLEAN`
    - The BOOLEAN output represents the boolean value derived from the input string, indicating either true or false based on the input's content.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - The 'show_help' output provides a URL to further documentation or help related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_StringToBoolean:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": False, "default": "", "forceInput": True}),
            },
        }

    RETURN_TYPES = ("BOOLEAN", "STRING", )
    RETURN_NAMES = ("BOOLEAN", "show_help", )
    FUNCTION = "convert"
    CATEGORY = icons.get("Comfyroll/Utils/Conversion")

    def convert(self, text):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-string-to-boolean"

        if text == "True" or text == "true":
            boolean_out = True
        if text == "False" or text == "false":
            boolean_out = False
        else:
            pass

        return (boolean_out, show_help, )

```
