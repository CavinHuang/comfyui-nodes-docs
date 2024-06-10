---
tags:
- ConditionalSelection
---

# CLIP Vision Input Switch
## Documentation
- Class name: `CLIP Vision Input Switch`
- Category: `WAS Suite/Logic`
- Output node: `False`

This node provides a mechanism to switch between two CLIP vision models based on a boolean condition. It enables dynamic selection of vision models within a workflow, facilitating conditional processing of visual data.
## Input types
### Required
- **`clip_vision_a`**
    - The first CLIP vision model to choose from. Acts as a potential input for the switch operation, contributing to conditional logic in processing visual data.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `CLIP_VISION`
- **`clip_vision_b`**
    - The second CLIP vision model to choose from. Serves as an alternative input for the switch operation, enabling a choice between two models based on a condition.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `CLIP_VISION`
- **`boolean`**
    - A boolean value determining which CLIP vision model (A or B) to pass through. True selects 'clip_vision_a', and False selects 'clip_vision_b'.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - The selected CLIP vision model based on the boolean condition. Enables conditional routing of visual model processing.
    - Python dtype: `CLIP_VISION`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_CLIP_Vision_Input_Switch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_vision_a": ("CLIP_VISION",),
                "clip_vision_b": ("CLIP_VISION",),
                "boolean": ("BOOLEAN", {"forceInput": True}),
            }
        }

    RETURN_TYPES = ("CLIP_VISION",)
    FUNCTION = "clip_vision_switch"

    CATEGORY = "WAS Suite/Logic"

    def clip_vision_switch(self, clip_vision_a, clip_vision_b, boolean=True):

        if boolean:
            return (clip_vision_a, )
        else:
            return (clip_vision_b)

```
