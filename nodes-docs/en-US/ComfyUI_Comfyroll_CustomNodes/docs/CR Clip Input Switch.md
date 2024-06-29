---
tags:
- ConditionalSelection
---

# 🔀 CR Clip Input Switch
## Documentation
- Class name: `CR Clip Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for the dynamic selection between two clip inputs based on a specified integer input. It is designed to facilitate conditional logic within workflows, enabling the choice of clip to be used in subsequent operations.
## Input types
### Required
- **`Input`**
    - Determines which clip input to select. An input of 1 selects the first clip, while an input of 2 selects the second clip.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`clip1`**
    - The first clip option that can be selected based on the input value.
    - Comfy dtype: `CLIP`
    - Python dtype: `Clip`
- **`clip2`**
    - The second clip option that can be selected based on the input value.
    - Comfy dtype: `CLIP`
    - Python dtype: `Clip`
## Output types
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The selected clip based on the input value.
    - Python dtype: `Clip`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ClipInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "clip1": ("CLIP",),
                "clip2": ("CLIP",),      
            }
        }

    RETURN_TYPES = ("CLIP", "STRING", )
    RETURN_NAMES = ("CLIP", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, clip1=None, clip2=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-clip-input-switch"
        if Input == 1:
            return (clip1, show_help, )
        else:
            return (clip2, show_help, )

```
