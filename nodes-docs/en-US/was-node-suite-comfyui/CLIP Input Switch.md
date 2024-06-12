---
tags:
- ConditionalSelection
---

# CLIP Input Switch
## Documentation
- Class name: `CLIP Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

The WAS_CLIP_Input_Switch node is designed to toggle between two CLIP model inputs based on a boolean condition. It facilitates dynamic input selection within workflows that utilize CLIP models, enhancing flexibility in processing visual content.
## Input types
### Required
- **`clip_a`**
    - The first CLIP model input. Acts as the default selection when the boolean condition is true.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`clip_b`**
    - The second CLIP model input. It is selected when the boolean condition is false.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
- **`boolean`**
    - A boolean condition that determines which CLIP model input (clip_a or clip_b) is selected for output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - The selected CLIP model input based on the boolean condition.
    - Python dtype: `CLIP`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_CLIP_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_a": ("CLIP",),
                "clip_b": ("CLIP",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("CLIP",)
    FUNCTION = "clip_switch"

    CATEGORY = "WAS Suite/Logic"

    def clip_switch(self, clip_a, clip_b, boolean=True):

        if boolean:
            return (clip_a, )
        else:
            return (clip_b, )

```
