---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# 🔧 CR String To Number
## Documentation
- Class name: `CR String To Number`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔧 Conversion`
- Output node: `False`

This node is designed to convert a string representation of a number into its numerical form, offering options for rounding the result to the nearest integer, rounding up, or rounding down. It abstracts the complexity of handling numeric conversions and rounding decisions from the user, providing a straightforward interface for processing textual numeric data.
## Input types
### Required
- **`text`**
    - The text input is the string representation of a number that the node attempts to convert into a numerical form. Its correctness is crucial for the successful execution of the node.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`round_integer`**
    - This parameter determines the rounding strategy (nearest, up, or down) to be applied to the converted number, affecting the final integer output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The integer output of the conversion process, affected by the chosen rounding strategy.
    - Python dtype: `int`
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the input text, providing a non-rounded numerical version.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the node's documentation, offering additional help and examples.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_StringToNumber: 

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"text": ("STRING", {"multiline": False, "default": "text", "forceInput": True}),
                "round_integer": (["round", "round down","round up"],),
                },
        }

    RETURN_TYPES = ("INT", "FLOAT", "STRING", )
    RETURN_NAMES = ("INT", "FLOAT", "show_help", )
    FUNCTION = "convert"
    CATEGORY = icons.get("Comfyroll/Utils/Conversion")

    def convert(self, text, round_integer):

        # Check if the text starts with a minus sign
        if text.startswith('-') and text[1:].replace('.','',1).isdigit():
            # If it starts with '-', remove it and convert the rest to int and float
            float_out = -float(text[1:])
        else:
            # Check if number
            if text.replace('.','',1).isdigit():
                float_out = float(text)
            else:
                print(f"[Error] CR String To Number. Not a number.")
                return {}

        if round_integer == "round up":
            if text.startswith('-'):
                int_out = int(float_out)
            else:
                int_out = int(float_out) + 1
        elif round_integer == "round down": 
            if text.startswith('-'):
                int_out = int(float_out) - 1
            else:
                int_out = int(float_out)
        else:
            int_out = round(float_out)
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-string-to-number"
        return (int_out, float_out, show_help,)

```
