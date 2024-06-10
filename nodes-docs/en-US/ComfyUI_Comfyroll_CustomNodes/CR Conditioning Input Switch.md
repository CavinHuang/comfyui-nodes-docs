---
tags:
- ConditionalSelection
---

# 🔀 CR Conditioning Input Switch
## Documentation
- Class name: `CR Conditioning Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for the dynamic selection between two conditioning inputs based on a specified integer input. It facilitates conditional logic in data flow, enabling the choice of different conditioning paths within a workflow.
## Input types
### Required
- **`Input`**
    - Determines which conditioning input to pass through. An input of 1 selects the first conditioning option, while an input of 2 selects the second.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`conditioning1`**
    - The first conditioning option that can be selected based on the input value.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`conditioning2`**
    - The second conditioning option that can be selected based on the input value.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
## Output types
- **`CONDITIONING`**
    - Comfy dtype: `CONDITIONING`
    - The selected conditioning input based on the provided integer input.
    - Python dtype: `CONDITIONING`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ConditioningInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "conditioning1": ("CONDITIONING",),
                "conditioning2": ("CONDITIONING",),        
            }
        }

    RETURN_TYPES = ("CONDITIONING", "STRING", )
    RETURN_NAMES = ("CONDITIONING", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, conditioning1=None, conditioning2=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-conditioning-input-switch"
        if Input == 1:
            return (conditioning1, show_help, )
        else:
            return (conditioning2, show_help, )

```
