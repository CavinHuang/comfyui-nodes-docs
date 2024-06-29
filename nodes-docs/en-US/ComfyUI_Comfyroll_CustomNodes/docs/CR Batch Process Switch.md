---
tags:
- ConditionalSelection
---

# 🔂 CR Batch Process Switch
## Documentation
- Class name: `CR Batch Process Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔂 Process`
- Output node: `False`

The CR Batch Process Switch node is designed to selectively process images or image batches based on a specified input type. It facilitates the dynamic handling of either single images or batches of images, providing a flexible approach to image processing workflows.
## Input types
### Required
- **`Input`**
    - Determines whether a single image or a batch of images is processed, affecting the node's execution path and the resulting output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image`**
    - The single image to be processed if 'Input' is set to 'image'.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`image_batch`**
    - The batch of images to be processed if 'Input' is set to 'image batch'.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image or image batch, depending on the input type selected.
    - Python dtype: `IMAGE`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [IPAdapter](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapter.md)



## Source code
```python
class CR_BatchProcessSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": (["image", "image batch"],),
            },
            "optional": {
                "image": ("IMAGE", ),
                "image_batch": ("IMAGE", )
            }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Process")

    def switch(self, Input, image=None, image_batch=None):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Process-Nodes#cr-batch-process-switch"
        if Input == "image":
            return (image, show_help, )
        else:
            return (image_batch, show_help, ) 

```
