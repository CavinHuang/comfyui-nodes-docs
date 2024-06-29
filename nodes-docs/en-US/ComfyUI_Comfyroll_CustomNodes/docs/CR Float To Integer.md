---
tags:
- DataConversion
- DataTypeConversion
- NumericConversion
---

# 🔧 CR Float To Integer
## Documentation
- Class name: `CR Float To Integer`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔧 Conversion`
- Output node: `False`

The node is designed to convert floating-point numbers to integers, providing a straightforward way to perform numerical type conversion within a workflow. Additionally, it offers a link to further documentation or help regarding its usage.
## Input types
### Required
- **`_float`**
    - This parameter accepts a floating-point number as input, which is then converted to an integer. The conversion process is essential for scenarios where integer values are required from floating-point inputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The integer result obtained from converting the input floating-point number.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL string pointing to additional documentation or help related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_FloatToInteger:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"_float": ("FLOAT", {"default": 0.0, "forceInput": True, "forceInput": True}),
                }
        }

    RETURN_TYPES = ("INT", "STRING", )
    RETURN_NAMES = ("INT", "show_help", )
    FUNCTION = "convert"
    CATEGORY = icons.get("Comfyroll/Utils/Conversion")

    def convert(self, _float):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Conversion-Nodes#cr-float-to-integer"
        return (int(_float), show_help, )

```
