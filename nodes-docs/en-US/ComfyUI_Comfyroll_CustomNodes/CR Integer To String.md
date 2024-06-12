---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# 🔧 CR Integer To String
## Documentation
- Class name: `CR Integer To String`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔧 Conversion`
- Output node: `False`

This node is designed to convert an integer value into its string representation. It aims to facilitate the conversion process within data processing pipelines, making it easier to handle numerical data as text for various applications.
## Input types
### Required
- **`int_`**
    - The integer value to be converted into a string. This parameter is crucial as it determines the exact numerical value that will be transformed into its textual form.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The string representation of the input integer value.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the integer to string conversion process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IntegerToString:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"int_": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff, "forceInput": True}),
                }
        }

    RETURN_TYPES = ("STRING","STRING", )
    RETURN_NAMES = ("STRING","show_help", )
    FUNCTION = 'convert'
    CATEGORY = icons.get("Comfyroll/Utils/Conversion")

    def convert(self, int_):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-integer-to-string"
        return (f'{int_}', show_help, )

```
