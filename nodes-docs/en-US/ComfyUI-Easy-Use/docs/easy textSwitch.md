---
tags:
- ConditionalSelection
---

# Text Switch
## Documentation
- Class name: `easy textSwitch`
- Category: `EasyUse/Logic/Switch`
- Output node: `False`

The easy textSwitch node provides a mechanism to switch between two text inputs based on a boolean condition. It serves as a conditional operator, enabling dynamic text output selection within a flow.
## Input types
### Required
- **`input`**
    - A boolean value determining which of the two text inputs to output. If true, text1 is selected; otherwise, text2 is chosen.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
### Optional
- **`text1`**
    - The first text option to choose from. This input is part of the conditional operation, selected when the boolean condition is true.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text option to choose from. This input is part of the conditional operation, selected when the boolean condition is false.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The output text, selected based on the boolean condition. It dynamically switches between text1 and text2.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class textSwitch:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "text1": ("STRING", {"forceInput": True}),
                "text2": ("STRING", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("STRING",)
    CATEGORY = "EasyUse/Logic/Switch"
    FUNCTION = "switch"

    def switch(self, input, text1=None, text2=None,):
        if input == 1:
            return (text1,)
        else:
            return (text2,)

```
