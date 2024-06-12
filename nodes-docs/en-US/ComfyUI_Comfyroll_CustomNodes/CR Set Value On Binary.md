---
tags:
- ComfyrollNodes
---

# ⚙️ CR Set Value On Binary
## Documentation
- Class name: `CR Set Value On Binary`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Conditional`
- Output node: `False`

The CR_SetValueOnBinary node is designed to conditionally assign a value based on a binary input. It facilitates decision-making processes within a workflow by allowing users to specify different outcomes (values) depending on whether the binary input is 1 or 0.
## Input types
### Required
- **`binary`**
    - The binary input determines the branch of execution: if the input is 1, one value is returned; if 0, another value is chosen. This binary decision-making forms the core functionality of the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`value_if_1`**
    - Specifies the value to return if the binary input is 1, enabling conditional logic based on binary input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`value_if_0`**
    - Specifies the value to return if the binary input is 0, enabling conditional logic based on binary input.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The integer representation of the selected value based on the binary input.
    - Python dtype: `int`
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the selected value based on the binary input.
    - Python dtype: `float`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SetValueOnBinary:
       
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "binary": ("INT", {"default": 1, "min": 0, "max": 1, "forceInput": True}),
                "value_if_1": ("FLOAT", {"default": 1, "min": -18446744073709551615, "max": 18446744073709551615}),   
                "value_if_0": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615}),   
            }
        }
    
    RETURN_TYPES =("INT", "FLOAT", "STRING", )
    RETURN_NAMES =("INT", "FLOAT", "show_help", )
    FUNCTION = "set_value"    
    CATEGORY = icons.get("Comfyroll/Utils/Conditional")
    
    def set_value(self, binary, value_if_1, value_if_0):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-set-value-on-boolean"

        if binary == 1:
            return (int(value_if_1), value_if_1, show_help, )   
        else:
            return (int(value_if_0), value_if_0, show_help, )

```
