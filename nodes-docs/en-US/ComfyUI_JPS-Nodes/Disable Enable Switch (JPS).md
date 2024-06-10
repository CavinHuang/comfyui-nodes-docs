---
tags:
- ConditionalSelection
---

# Disable Enable Switch (JPS)
## Documentation
- Class name: `Disable Enable Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

This node toggles between disabling and enabling a feature based on the comparison of two integer values and a match condition.
## Input types
### Required
- **`select`**
    - Specifies the first integer value to be compared, influencing the switch's outcome.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`compare`**
    - Specifies the second integer value to be compared against the first, affecting the switch's result.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`match`**
    - Determines the condition ('Set to Disable' or 'Set to Enable') that controls the switch's behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list of str`
## Output types
- **`disable_enable`**
    - Comfy dtype: `COMBO[STRING]`
    - Outputs either 'disable' or 'enable' based on the comparison of input values and the match condition.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Disable_Enable_Switch:
    match = ["Set to Disable","Set to Enable"]

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = (["disable","enable"],)
    RETURN_NAMES = ("disable_enable",)
    FUNCTION = "get_disenable"

    @classmethod
    def INPUT_TYPES(s):    
        return {
            "required": {
                "select": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "compare": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),
                "match": (s.match,),
            }
        }

    def get_disenable(self,select,compare,match):
        disable_enable = "disable"
        if match == "Set to Enable" and (int(select) == int(compare)):
            disable_enable = "enable"
        elif match == "Set to Disable" and (int(select) == int(compare)):
            disable_enable = "disable"
        elif match == "Set to Enable" and (int(select) != int(compare)):
            disable_enable = "disable"
        elif match == "Set to Disable" and (int(select) != int(compare)):
            disable_enable = "enable"
        
        return (disable_enable, )

```
