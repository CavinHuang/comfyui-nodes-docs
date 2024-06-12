---
tags:
- DataClamp
---

# MaskClamp
## Documentation
- Class name: `MaskClamp`
- Category: `clamp`
- Output node: `False`

The MaskClamp node is designed to pass through mask data without modification, serving as a placeholder or checkpoint within a data processing pipeline.
## Input types
### Required
- **`mask`**
    - The mask input represents the mask data that will be passed through the node unchanged. It is essential for maintaining the integrity of mask information throughout the processing flow.
    - Comfy dtype: `MASK`
    - Python dtype: `Tuple[str]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - Outputs the unchanged mask data, ensuring the continuity of mask information within the workflow.
    - Python dtype: `Tuple[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MaskClamp:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mask": ("MASK",),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "node"
    CATEGORY = "clamp"

    def node(self, mask):
        return (mask,)

```
