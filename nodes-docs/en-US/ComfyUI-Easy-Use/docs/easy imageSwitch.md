---
tags:
- ConditionalSelection
- ImageSwitching
---

# Image Switch
## Documentation
- Class name: `easy imageSwitch`
- Category: `EasyUse/Logic/Switch`
- Output node: `False`

The `easy imageSwitch` node provides a mechanism to switch between two images based on a boolean condition. It enables conditional image selection within a workflow, allowing for dynamic content generation based on specified criteria.
## Input types
### Required
- **`image_a`**
    - The first image option to choose from. It serves as the default or 'false' condition output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`image_b`**
    - The second image option to choose from. It is selected when the boolean condition is true.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`boolean`**
    - A boolean value determining which image to output. If true, `image_b` is selected; otherwise, `image_a` is chosen.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is either `image_a` or `image_b`, depending on the boolean condition.
    - Python dtype: `Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageSwitch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "boolean": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_switch"

    CATEGORY = "EasyUse/Logic/Switch"

    def image_switch(self, image_a, image_b, boolean):

        if boolean:
            return (image_a, )
        else:
            return (image_b, )

```
