---
tags:
- DataClamp
---

# ClipVisionOutputClamp
## Documentation
- Class name: `ClipVisionOutputClamp`
- Category: `clamp`
- Output node: `False`

The ClipVisionOutputClamp node is designed to pass through CLIP vision output data without modification, serving as a utility for ensuring data consistency and integrity within a pipeline that processes CLIP vision outputs.
## Input types
### Required
- **`clip_vision_output`**
    - This parameter represents the CLIP vision output data that is to be passed through the node. It is crucial for maintaining the integrity and consistency of the data as it moves through the processing pipeline.
    - Comfy dtype: `CLIP_VISION_OUTPUT`
    - Python dtype: `tuple`
## Output types
- **`clip_vision_output`**
    - Comfy dtype: `CLIP_VISION_OUTPUT`
    - This output is the unaltered CLIP vision output data, passed through from the input, ensuring data consistency and integrity within the pipeline.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ClipVisionOutputClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip_vision_output": ("CLIP_VISION_OUTPUT",),
            },
        }

    RETURN_TYPES = ("CLIP_VISION_OUTPUT",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, clip_vision_output):
        return (clip_vision_output,)

```
