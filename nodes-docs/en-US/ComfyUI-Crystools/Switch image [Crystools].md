---
tags:
- ConditionalSelection
- ImageSwitching
---

# 🪛 Switch image
## Documentation
- Class name: `Switch image [Crystools]`
- Category: `crystools 🪛/Switch`
- Output node: `False`

The 'Switch image [Crystools]' node allows for conditional selection between two image inputs based on a boolean value. It serves as a control flow mechanism in image processing pipelines, enabling dynamic path selection and thus facilitating conditional image manipulation or routing.
## Input types
### Required
- **`on_true`**
    - Specifies the image to be selected if the boolean condition evaluates to true. It plays a crucial role in determining the output based on the condition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`on_false`**
    - Specifies the image to be selected if the boolean condition evaluates to false. This input ensures that an alternative image can be chosen, providing flexibility in conditional image processing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`boolean`**
    - The boolean condition that determines which of the two images ('on_true' or 'on_false') is selected as the output. This parameter is central to the node's conditional logic.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `BOOLEAN`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image, which is selected based on the evaluation of the boolean condition. This allows for dynamic image selection within a processing pipeline.
    - Python dtype: `IMAGE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanImage:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("IMAGE",),
                "on_false": ("IMAGE",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Image switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
