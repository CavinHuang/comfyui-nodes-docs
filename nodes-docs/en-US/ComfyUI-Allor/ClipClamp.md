---
tags:
- DataClamp
---

# ClipClamp
## Documentation
- Class name: `ClipClamp`
- Category: `clamp`
- Output node: `False`

The ClipClamp node is designed to pass through CLIP data without modification, serving as a placeholder or checkpoint within a data processing pipeline.
## Input types
### Required
- **`clip`**
    - The 'clip' parameter is the CLIP data that this node processes. It acts as a direct pass-through, ensuring that the CLIP data remains unchanged through the node.
    - Comfy dtype: `CLIP`
    - Python dtype: `tuple`
## Output types
- **`clip`**
    - Comfy dtype: `CLIP`
    - Returns the unmodified CLIP data, maintaining its integrity for further processing or analysis.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ClipClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "clip": ("CLIP",),
            },
        }

    RETURN_TYPES = ("CLIP",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, clip):
        return (clip,)

```
