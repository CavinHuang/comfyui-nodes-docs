---
tags:
- ConditionalSelection
- ImageSwitching
---

# Image Input Switch
## Documentation
- Class name: `Image Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Image Input Switch node is designed to selectively output one of two input images based on a boolean condition. This functionality allows for dynamic image processing flows where the path of execution can change based on conditional logic.
## Input types
### Required
- **`image_a`**
    - The first image input option for the switch. This image is selected if the boolean condition is true.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_b`**
    - The second image input option for the switch. This image is selected if the boolean condition is false.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`boolean`**
    - A boolean input that determines which of the two images (image_a or image_b) is output by the node.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image, which is either image_a or image_b depending on the boolean condition.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)



## Source code
```python
class WAS_Image_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_input_switch"

    CATEGORY = "WAS Suite/Logic"

    def image_input_switch(self, image_a, image_b, boolean=True):

        if boolean:
            return (image_a, )
        else:
            return (image_b, )

```
