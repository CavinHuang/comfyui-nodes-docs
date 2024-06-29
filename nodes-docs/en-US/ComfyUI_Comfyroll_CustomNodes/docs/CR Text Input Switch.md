---
tags:
- ConditionalSelection
---

# 🔀 CR Text Input Switch
## Documentation
- Class name: `CR Text Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for the dynamic selection between two text inputs based on a specified integer input. It facilitates conditional text output in workflows, enhancing flexibility and decision-making capabilities.
## Input types
### Required
- **`Input`**
    - Determines which text input ('text1' or 'text2') to output based on its value (1 or 2).
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`text1`**
    - The first text option that can be outputted if 'Input' is 1.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text option that can be outputted if 'Input' is 2.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The text output selected based on the 'Input' value.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "text1": ("STRING", {"forceInput": True}),
                "text2": ("STRING", {"forceInput": True}), 
            }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, text1=None, text2=None,):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-text-input-switch"
        if Input == 1:
            return (text1, show_help, )
        else:
            return (text2, show_help, )

```
