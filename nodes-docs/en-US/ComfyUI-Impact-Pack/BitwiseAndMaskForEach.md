---
tags:
- Segmentation
---

# Bitwise(SEGS & SEGS)
## Documentation
- Class name: `BitwiseAndMaskForEach`
- Category: `ImpactPack/Operation`
- Output node: `False`

This node is designed to perform a bitwise AND operation on each mask within a collection, effectively combining multiple masks into a single mask that represents the intersection of all input masks. It's aimed at processing scenarios where the overlap between various masks needs to be identified and isolated, making it suitable for applications requiring precise mask manipulation and analysis.
## Input types
### Required
- **`base_segs`**
    - The first mask to be combined using a bitwise AND operation. It plays a crucial role in determining the final output by intersecting its content with the second mask, thus affecting the node's execution and results.
    - Comfy dtype: `SEGS`
    - Python dtype: `torch.Tensor`
- **`mask_segs`**
    - The second mask to be combined with the first mask using a bitwise AND operation. This mask contributes equally to the final output by intersecting with the first mask, influencing the node's execution and the characteristics of the resulting mask.
    - Comfy dtype: `SEGS`
    - Python dtype: `torch.Tensor`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The resulting mask after performing the bitwise AND operation on the input masks. It represents the intersection of the input masks, highlighting areas where both masks overlap.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BitwiseAndMaskForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
            {
                "base_segs": ("SEGS",),
                "mask_segs": ("SEGS",),
            }
        }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, base_segs, mask_segs):

        result = []

        for bseg in base_segs[1]:
            cropped_mask1 = bseg.cropped_mask.copy()
            crop_region1 = bseg.crop_region

            for mseg in mask_segs[1]:
                cropped_mask2 = mseg.cropped_mask
                crop_region2 = mseg.crop_region

                # compute the intersection of the two crop regions
                intersect_region = (max(crop_region1[0], crop_region2[0]),
                                    max(crop_region1[1], crop_region2[1]),
                                    min(crop_region1[2], crop_region2[2]),
                                    min(crop_region1[3], crop_region2[3]))

                overlapped = False

                # set all pixels in cropped_mask1 to 0 except for those that overlap with cropped_mask2
                for i in range(intersect_region[0], intersect_region[2]):
                    for j in range(intersect_region[1], intersect_region[3]):
                        if cropped_mask1[j - crop_region1[1], i - crop_region1[0]] == 1 and \
                                cropped_mask2[j - crop_region2[1], i - crop_region2[0]] == 1:
                            # pixel overlaps with both masks, keep it as 1
                            overlapped = True
                            pass
                        else:
                            # pixel does not overlap with both masks, set it to 0
                            cropped_mask1[j - crop_region1[1], i - crop_region1[0]] = 0

                if overlapped:
                    item = SEG(bseg.cropped_image, cropped_mask1, bseg.confidence, bseg.crop_region, bseg.bbox, bseg.label, None)
                    result.append(item)

        return ((base_segs[0], result),)

```
