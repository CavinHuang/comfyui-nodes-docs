---
tags:
- ConditionalSelection
---

# 🔀 CR Text Input Switch (4 way)
## Documentation
- Class name: `CR Text Input Switch (4 way)`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for the selection of one out of four text inputs based on a given integer input, facilitating conditional text flow in a workflow.
## Input types
### Required
- **`Input`**
    - Determines which of the four text inputs to select and pass forward. The integer value ranges from 1 to 4, each corresponding to a different text input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`text1`**
    - The first text option that can be selected. It is one of the four possible text inputs that can be chosen based on the 'Input' value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text2`**
    - The second text option that can be selected. It serves as one of the four possible choices, determined by the 'Input' parameter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text3`**
    - The third text option available for selection. This input is part of the four choices that can be made based on the 'Input' value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text4`**
    - The fourth and final text option that can be selected. It is included as one of the possible choices, contingent on the 'Input' parameter.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`STRING`**
    - Comfy dtype: `STRING`
    - The selected text input based on the 'Input' parameter.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing help and documentation for using this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_TextInputSwitch4way:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 4}),
            },
            "optional": {
                "text1": ("STRING", {"forceInput": True}),
                "text2": ("STRING", {"forceInput": True}),
                "text3": ("STRING", {"forceInput": True}),
                "text4": ("STRING", {"forceInput": True}),  
            }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("STRING", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, text1=None, text2=None, text3=None, text4=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-text-input-switch-4-way"
        if Input == 1:
            return (text1, show_help, )
        elif Input == 2:
            return (text2, show_help, )
        elif Input == 3:
            return (text3, show_help, )
        else:
            return (text4, show_help, )            

```
