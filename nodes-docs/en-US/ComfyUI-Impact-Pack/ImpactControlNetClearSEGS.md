---
tags:
- ImpactPack
- Segmentation
---

# ImpactControlNetClearSEGS
## Documentation
- Class name: `ImpactControlNetClearSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to clear the control network information from a given set of segmentation elements (SEGS), effectively resetting their control network-related attributes to a default state. It's part of the ImpactPack/Util category, focusing on utility operations within the SEGS data structure.
## Input types
### Required
- **`segs`**
    - The segmentation elements (SEGS) to be processed. This input is essential for determining which SEGS will have their control network information cleared.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[Size, List[SEG]]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The processed segmentation elements (SEGS) with their control network information cleared, ready for further processing or analysis.
    - Python dtype: `Tuple[Size, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ControlNetClearSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"segs": ("SEGS",), }, }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs):
        new_segs = []

        for seg in segs[1]:
            new_seg = SEG(seg.cropped_image, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, None)
            new_segs.append(new_seg)

        return ((segs[0], new_segs), )

```
