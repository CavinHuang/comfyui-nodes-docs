---
tags:
- MathematicalFunctions
- Multiplication
---

# ⚙️ CR Integer Multiple
## Documentation
- Class name: `CR Integer Multiple`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/⚙️ Other`
- Output node: `False`

The CR_IntegerMultipleOf node is designed to multiply an integer by a specified multiple, adjusting the integer's value accordingly. It provides a straightforward way to scale integers by a factor, with an option to access help documentation for further guidance.
## Input types
### Required
- **`integer`**
    - Specifies the integer to be multiplied. This parameter is central to the node's operation, determining the base value that will be scaled.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiple`**
    - Defines the factor by which the integer will be multiplied. This parameter allows for the dynamic scaling of the integer's value.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The result of multiplying the input integer by the specified multiple.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing access to additional documentation and help for using this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IntegerMultipleOf:
       
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "integer": ("INT", {"default": 1, "min": -18446744073709551615, "max": 18446744073709551615}),
                "multiple": ("FLOAT", {"default": 8, "min": 1, "max": 18446744073709551615}),
            }
        }
    
    RETURN_TYPES =("INT", "STRING", )
    RETURN_NAMES =("INT", "show_help", )
    FUNCTION = "int_multiple_of"    
    CATEGORY = icons.get("Comfyroll/Utils/Other")
    
    def int_multiple_of(self, integer, multiple=8):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-integer-multiple"
        
        if multiple == 0:
            return (int(integer), show_help, )
        integer = integer * multiple   
        
        return (int(integer), show_help, )

```
