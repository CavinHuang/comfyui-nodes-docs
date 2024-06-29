---
tags:
- ConditionalSelection
---

# 🔀 CR Image Input Switch
## Documentation
- Class name: `CR Image Input Switch`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔀 Logic`
- Output node: `False`

This node allows for the dynamic selection between two image inputs based on a specified integer input. It facilitates conditional image processing workflows by enabling the user to switch between different image sources.
## Input types
### Required
- **`Input`**
    - Determines which image input to use based on its integer value. It affects the node's execution by selecting one of the two possible image inputs for the workflow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image1`**
    - The first optional image input that can be selected.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image2`**
    - The second optional image input that can be selected.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The selected image based on the input integer value.
    - Python dtype: `Image`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageScaleToTotalPixels](../../Comfy/Nodes/ImageScaleToTotalPixels.md)
    - [SVD_img2vid_Conditioning](../../Comfy/Nodes/SVD_img2vid_Conditioning.md)
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)
    - Reroute



## Source code
```python
class CR_ImageInputSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "Input": ("INT", {"default": 1, "min": 1, "max": 2}),
            },
            "optional": {
                "image1": ("IMAGE",),
                "image2": ("IMAGE",),            
            }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "switch"
    CATEGORY = icons.get("Comfyroll/Utils/Logic")

    def switch(self, Input, image1=None, image2=None):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Logic-Nodes#cr-image-input-switch"
        
        if Input == 1:
            return (image1, show_help, )
        else:
            return (image2, show_help, )

```
