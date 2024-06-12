---
tags:
- ConditionalSelection
- ImageSwitching
---

# Image Switch (JPS)
## Documentation
- Class name: `Image Switch (JPS)`
- Category: `JPS Nodes/Switches`
- Output node: `False`

The Image Switch node is designed to select and output one of several input images based on a given selection index. It facilitates dynamic image routing within a pipeline, allowing for conditional image processing paths.
## Input types
### Required
- **`select`**
    - The 'select' parameter determines which of the input images to output, based on its numerical index. It is essential for controlling the flow of images through the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`img_i`**
    - Represents a series of optional input images (img_1 to img_5) that can be selected for output. The specific image selected is determined by the 'select' parameter.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
## Output types
- **`img_out`**
    - Comfy dtype: `IMAGE`
    - The output image selected based on the 'select' parameter. It enables conditional image processing by dynamically routing one of the input images.
    - Python dtype: `IMAGE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Image_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("img_out",)
    FUNCTION = "get_image"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "img_1": ("IMAGE",),
                "img_2": ("IMAGE",),
                "img_3": ("IMAGE",),
                "img_4": ("IMAGE",),
                "img_5": ("IMAGE",),
            }
        }

    def get_image(self,select,img_1,img_2=None,img_3=None,img_4=None,img_5=None,):
        
        img_out = img_1

        if (select == 2):
            img_out = img_2
        elif (select == 3):
            img_out  = img_3
        elif (select == 4):
            img_out = img_4
        elif (select == 5):
            img_out = img_5

        return (img_out,)

```
