---
tags:
- Segmentation
---

# Bitwise(SEGS & MASKS ForEach)
## Documentation
- Class name: `ImpactSegsAndMaskForEach`
- Category: `ImpactPack/Operation`
- Output node: `False`

This node applies a mask to each segment within a collection of segments, performing a bitwise AND operation between the mask and the segment's cropped mask. It's designed to process each segment individually, allowing for precise control over how masks are applied to segmented parts of an image.
## Input types
### Required
- **`segs`**
    - The collection of segments to which the masks will be applied. Each segment represents a part of an image that has been isolated based on certain criteria.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
- **`masks`**
    - A collection of masks to be applied to each corresponding segment. Each mask defines areas to be kept or removed in the segment's cropped mask through a bitwise AND operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The modified collection of segments after applying the masks, where each segment's cropped mask has been updated based on the bitwise AND operation with the corresponding mask.
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SegsBitwiseAndMaskForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "segs": ("SEGS",),
                        "masks": ("MASK",),
                    }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, segs, masks):
        return (core.apply_mask_to_each_seg(segs, masks), )

```
