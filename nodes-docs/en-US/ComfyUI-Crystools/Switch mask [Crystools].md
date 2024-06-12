---
tags:
- ConditionalSelection
---

# 🪛 Switch mask
## Documentation
- Class name: `Switch mask [Crystools]`
- Category: `crystools 🪛/Switch`
- Output node: `False`

The 'Switch mask [Crystools]' node allows for conditional selection between two mask inputs based on a boolean value. It serves as a control structure to dynamically choose one of two paths in data flow, based on the provided boolean condition.
## Input types
### Required
- **`on_true`**
    - The mask to be returned if the boolean condition is true. It plays a crucial role in determining the output based on the condition.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`on_false`**
    - The mask to be returned if the boolean condition is false. This input provides an alternative path for the data flow, depending on the boolean condition.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`boolean`**
    - The boolean condition that determines which mask (on_true or on_false) to return. It acts as the switch for selecting the output path.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The selected mask output, determined by the boolean condition. It represents the conditional choice between the on_true and on_false inputs.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("MASK",),
                "on_false": ("MASK",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("mask",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Mask switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
