---
tags:
- DataClamp
---

# GligenClamp
## Documentation
- Class name: `GligenClamp`
- Category: `clamp`
- Output node: `False`

The GligenClamp node is designed to pass through GLIGEN data without modification, acting as a placeholder or a checkpoint within a data processing pipeline. It ensures the integrity of GLIGEN data as it moves through different stages of processing, serving as a control mechanism.
## Input types
### Required
- **`gligen`**
    - The 'gligen' parameter represents the GLIGEN data to be clamped. This node acts as a pass-through, ensuring the GLIGEN data remains unchanged throughout the process.
    - Comfy dtype: `GLIGEN`
    - Python dtype: `tuple`
## Output types
- **`gligen`**
    - Comfy dtype: `GLIGEN`
    - Returns the unmodified GLIGEN data, ensuring its integrity is maintained through the processing pipeline.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GligenClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "gligen": ("GLIGEN",),
            },
        }

    RETURN_TYPES = ("GLIGEN",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, gligen):
        return (gligen,)

```
