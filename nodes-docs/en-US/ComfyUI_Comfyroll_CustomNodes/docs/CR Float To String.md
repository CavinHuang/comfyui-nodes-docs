---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# 🔧 CR Float To String
## Documentation
- Class name: `CR Float To String`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔧 Conversion`
- Output node: `False`

This node is designed to convert floating-point numbers into their string representation, facilitating the transition between numerical data types and text for further processing or display purposes.
## Input types
### Required
- **`float_`**
    - The floating-point number to be converted into a string. This input is essential for defining the numerical value that will undergo the conversion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The string representation of the input floating-point number.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional information and guidance on using the CR Float To String node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_FloatToString:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"float_": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000000.0, "forceInput": True}),
                }        
        }

    RETURN_TYPES = ('STRING', "STRING", )
    RETURN_NAMES = ('STRING', "show_help", )
    FUNCTION = 'convert'
    CATEGORY = icons.get("Comfyroll/Utils/Conversion")

    def convert(self, float_):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-float-to-string"
        return (f'{float_}', show_help, )

```
