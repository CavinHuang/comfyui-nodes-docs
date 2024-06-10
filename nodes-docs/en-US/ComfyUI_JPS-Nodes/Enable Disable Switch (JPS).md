---
tags:
- ConditionalSelection
---

# Enable Disable Switch (JPS)
## Documentation
- Class name: `Enable Disable Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

This node is designed to toggle between enabling and disabling states based on specific conditions. It evaluates the equality of two integer inputs against a predefined match condition to determine the output state, facilitating dynamic control flows within a system.
## Input types
### Required
- **`select`**
    - An integer input that is compared against another input to determine the switch state. Its value influences the node's decision to enable or disable.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`compare`**
    - An integer input that is compared with the 'select' input to determine the switch state. This comparison is crucial for the node's functionality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`match`**
    - A predefined condition that dictates whether the switch should be set to enable or disable based on the comparison of 'select' and 'compare' inputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`enable_disable`**
    - Comfy dtype: `COMBO[STRING]`
    - The output state of the switch, which can be either 'enable' or 'disable', determined by the input conditions.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Enable_Disable_Switch:
    match = ["Set to Enable","Set to Disable"]

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = (["enable","disable"],)
    RETURN_NAMES = ("enable_disable",)
    FUNCTION = "get_endisable"

    @classmethod
    def INPUT_TYPES(s):    
        return {
            "required": {
                "select": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "compare": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "match": (s.match,),
            }
        }

    def get_endisable(self,select,compare,match):
        enable_disable = "disable"
        if match == "Set to Enable" and (int(select) == int(compare)):
            enable_disable = "enable"
        elif match == "Set to Disable" and (int(select) == int(compare)):
            enable_disable = "disable"
        elif match == "Set to Enable" and (int(select) != int(compare)):
            enable_disable = "disable"
        elif match == "Set to Disable" and (int(select) != int(compare)):
            enable_disable = "enable"
        
        return (enable_disable, )

```
