---
tags:
- Segmentation
---

# Bitwise(SEGS & MASK)
## Documentation
- Class name: `ImpactSegsAndMask`
- Category: `ImpactPack/Operation`
- Output node: `False`

This node applies a bitwise AND operation between the masks of segmented objects (SEGS) and a given mask (MASK), effectively filtering the segmented objects based on the mask. It's designed to refine segmentation results by combining them with an additional mask layer, enhancing the precision of the segmentation.
## Input types
### Required
- **`segs`**
    - The segmented objects (SEGS) to be refined. It represents the primary input for the operation, determining the base segmentation to be filtered.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[torch.Size, List[SEG]]`
- **`mask`**
    - The mask (MASK) to be applied to the segmented objects. It acts as a filter, refining the segmentation by retaining only the parts of the segmented objects that overlap with the mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The refined segmented objects (SEGS) after applying the mask. It represents the output of the bitwise AND operation, containing only the parts of the original segmentation that overlap with the given mask.
    - Python dtype: `Tuple[torch.Size, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactSEGSOrderedFilter](../../ComfyUI-Impact-Pack/Nodes/ImpactSEGSOrderedFilter.md)



## Source code
```python
class SegsBitwiseAndMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS",),
                        "mask": ("MASK",),
                    }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, segs, mask):
        return (core.segs_bitwise_and_mask(segs, mask), )

```
