---
tags:
- BooleanLogic
- ConditionalSelection
---

# ⚙️ CR Set Value On Boolean
## Documentation
- Class name: `CR Set Value On Boolean`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Conditional`
- Output node: `False`

This node dynamically assigns a value based on a boolean input, allowing for conditional logic within node flows. It provides a straightforward mechanism to output different values depending on whether a given boolean condition is true or false.
## Input types
### Required
- **`boolean`**
    - Determines the branch of conditional logic to follow. If true, the node outputs the value specified for 'true' conditions; otherwise, it outputs the value for 'false' conditions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`value_if_true`**
    - The value to output if the 'boolean' input is true. This allows for dynamic responses based on conditional checks.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`value_if_false`**
    - The value to output if the 'boolean' input is false. This enables the node to adapt its output based on the evaluated condition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - The integer representation of the output value, providing a numeric outcome based on the boolean condition.
    - Python dtype: `int`
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The floating-point representation of the output value, offering a more precise numeric outcome.
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
class CR_SetValueOnBoolean:
       
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "boolean": ("BOOLEAN", {"default": True, "forceInput": True}),
                "value_if_true": ("FLOAT", {"default": 1, "min": -18446744073709551615, "max": 18446744073709551615}),   
                "value_if_false": ("FLOAT", {"default": 0, "min": -18446744073709551615, "max": 18446744073709551615}),   
            }
        }
    
    RETURN_TYPES =("INT", "FLOAT", "STRING", )
    RETURN_NAMES =("INT", "FLOAT", "show_help", )
    FUNCTION = "set_value"    
    CATEGORY = icons.get("Comfyroll/Utils/Conditional")
    
    def set_value(self, boolean, value_if_true, value_if_false):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-set-value-on-boolean"

        if boolean == True:
            return (int(value_if_true), value_if_true, show_help, )   
        else:
            return (int(value_if_false), value_if_false, show_help, )

```
