---
tags:
- ImpactPack
- Segmentation
---

# Remove Image from SEGS
## Documentation
- Class name: `RemoveImageFromSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

The RemoveImageFromSEGS node is designed to process a collection of segmented images (SEGS) by removing the image data while preserving other segment attributes. This operation is useful for scenarios where the image data is no longer needed or desired, allowing for a focus on the remaining segment metadata.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents the collection of segmented images to be processed. It is essential for specifying the input data from which the images will be removed, affecting the node's execution by determining the segments to be modified.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output is a modified version of the input SEGS, where the image data has been removed from each segment, leaving other attributes intact.
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemoveImageFromSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"segs": ("SEGS", ), }}

    RETURN_TYPES = ("SEGS", )
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs):
        results = []

        if len(segs[1]) > 0:
            for seg in segs[1]:
                new_seg = SEG(None, seg.cropped_mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
                results.append(new_seg)

            return ((segs[0], results), )
        else:
            return (segs, )

```
