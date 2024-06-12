---
tags:
- ConditionalSelection
---

# 🪛 Switch conditioning
## Documentation
- Class name: `Switch conditioning [Crystools]`
- Category: `crystools 🪛/Switch`
- Output node: `False`

The node provides a mechanism to switch between two conditioning inputs based on a boolean value, effectively allowing conditional logic to be applied to the flow of conditioning data.
## Input types
### Required
- **`on_true`**
    - The conditioning to be used if the boolean value is true. It determines the flow of data when the condition is met.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`on_false`**
    - The conditioning to be used if the boolean value is false. It serves as an alternative flow of data when the condition is not met.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`boolean`**
    - A boolean value that determines which of the two conditionings (on_true or on_false) should be used.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The selected conditioning output, determined by the boolean input value.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CSwitchBooleanConditioning:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "on_true": ("CONDITIONING",),
                "on_false": ("CONDITIONING",),
                "boolean": BOOLEAN,
            }
        }

    CATEGORY = CATEGORY.MAIN.value + CATEGORY.SWITCH.value
    RETURN_TYPES = ("CONDITIONING",)
    RETURN_NAMES = ("conditioning",)

    FUNCTION = "execute"

    def execute(self, on_true, on_false, boolean=True):
        logger.debug("Conditioning switch: " + str(boolean))

        if boolean:
            return (on_true,)
        else:
            return (on_false,)

```
