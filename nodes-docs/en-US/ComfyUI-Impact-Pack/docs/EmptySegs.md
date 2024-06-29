---
tags:
- ImpactPack
- Segmentation
---

# EmptySegs
## Documentation
- Class name: `EmptySegs`
- Category: `ImpactPack/Util`
- Output node: `False`

The EmptySEGS node is designed to generate a base structure for segmentation data without any actual segments. It provides a foundational shape and an empty list to represent the absence of segments, serving as a starting point or placeholder in segmentation operations.
## Input types
### Required
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - Represents a tuple containing a shape and an empty list, indicating the absence of segmentation data.
    - Python dtype: `Tuple[Tuple[int, int], List]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class EmptySEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}, }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self):
        shape = 0, 0
        return ((shape, []),)

```
