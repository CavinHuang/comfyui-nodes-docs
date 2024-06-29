---
tags:
- ConditionalSelection
---

# Conditioning Input Switch
## Documentation
- Class name: `Conditioning Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The Conditioning Input Switch node is designed to selectively switch between two conditioning inputs based on a boolean value, facilitating dynamic control over which conditioning data is passed forward in a processing pipeline.
## Input types
### Required
- **`conditioning_a`**
    - The first conditioning input option. It serves as one of the two possible conditioning data inputs to be selected based on the boolean value.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`conditioning_b`**
    - The second conditioning input option. It acts as an alternative to the first conditioning input, offering a choice that can be selected based on the boolean value.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `tuple`
- **`boolean`**
    - A boolean value that determines which conditioning input (either conditioning_a or conditioning_b) is passed forward. When true, conditioning_a is selected; otherwise, conditioning_b is chosen.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The selected conditioning input, determined by the boolean value. It outputs the chosen conditioning data for further processing.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Conditioning_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "conditioning_a": ("CONDITIONING",),
                "conditioning_b": ("CONDITIONING",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "conditioning_input_switch"

    CATEGORY = "WAS Suite/Logic"

    def conditioning_input_switch(self, conditioning_a, conditioning_b, boolean=True):

        if boolean:
            return (conditioning_a, )
        else:
            return (conditioning_b, )

```
