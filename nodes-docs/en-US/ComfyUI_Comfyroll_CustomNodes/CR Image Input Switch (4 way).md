---
tags:
- ConditionalSelection
---

# 🔀 CR Image Input Switch (4 way)
## Documentation
- Class name: `CR Image Input Switch (4 way)`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for the selection of one out of four possible image inputs based on a specified integer input. It is designed to facilitate dynamic image input selection within a workflow, providing flexibility in choosing which image to process or display next.
## Input types
### Required
- **`Input`**
    - Determines which of the four image inputs to select and return. The integer value ranges from 1 to 4, each corresponding to a different image input.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image1`**
    - The first image option that can be selected.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image2`**
    - The second image option that can be selected.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image3`**
    - The third image option that can be selected.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image4`**
    - The fourth image option that can be selected.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The image selected based on the input integer value.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing help and documentation for using the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - Save Image w/Metadata
    - [CR Feathered Border](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Feathered Border.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class CR_ImageInputSwitch4way:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 4}),
            },
            "optional": {
                "image1": ("IMAGE",),            
                "image2": ("IMAGE",),
                "image3": ("IMAGE",),
                "image4": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, image1=None, image2=None, image3=None, image4=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-text-input-switch-4-way"
        if Input == 1:
            return (image1, show_help, )
        elif Input == 2:
            return (image2, show_help, )
        elif Input == 3:
            return (image3, show_help, )
        else:
            return (image4, show_help, )

```
