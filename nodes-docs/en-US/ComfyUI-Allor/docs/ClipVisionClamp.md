---
tags:
- DataClamp
---

# ClipVisionClamp
## Documentation
- Class name: `ClipVisionClamp`
- Category: `clamp`
- Output node: `False`

The ClipVisionClamp node is designed to process and pass through CLIP_VISION data without modification, serving as a straightforward conduit for CLIP_VISION data within a pipeline.
## Input types
### Required
- **`clip_vision`**
    - This parameter represents the CLIP_VISION data to be passed through the node. It is essential for the node's operation as it directly handles the input without any alteration, ensuring the integrity of the CLIP_VISION data is maintained throughout the process.
    - Comfy dtype: `CLIP_VISION`
    - Python dtype: `tuple`
## Output types
- **`clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - Outputs the unmodified CLIP_VISION data received as input, ensuring the data's integrity and consistency for further processing or utilization in subsequent nodes.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ClipVisionClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_vision": ("CLIP_VISION",),
            },
        }

    RETURN_TYPES = ("CLIP_VISION",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, clip_vision):
        return (clip_vision,)

```
