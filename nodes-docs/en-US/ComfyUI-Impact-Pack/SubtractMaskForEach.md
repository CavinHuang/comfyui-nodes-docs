---
tags:
- MaskMath
---

# Bitwise(SEGS - SEGS)
## Documentation
- Class name: `SubtractMaskForEach`
- Category: `ImpactPack/Operation`
- Output node: `False`

This node is designed to perform a bitwise subtraction operation on masks for each frame or segment within a given dataset. It aims to identify and isolate changes or differences between consecutive frames or segments by subtracting one mask from another, thereby facilitating the analysis of temporal or spatial variations in the data.
## Input types
### Required
- **`base_segs`**
    - This parameter represents the base segments from which the mask segments will be subtracted. It serves as the reference point for the subtraction operation, highlighting areas present in these segments but not in the mask segments.
    - Comfy dtype: `SEGS`
    - Python dtype: `torch.Tensor`
- **`mask_segs`**
    - The mask segments to be subtracted from the base segments. These segments represent the changes or additional areas not present in the base segments, and their subtraction helps in isolating these differences.
    - Comfy dtype: `SEGS`
    - Python dtype: `torch.Tensor`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The result of the bitwise subtraction between the base segments and mask segments, highlighting the differences or changes between them. This output is crucial for analyzing temporal or spatial variations within the dataset.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SubtractMaskForEach:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
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

                changed = False

                # subtract operation
                for i in range(intersect_region[0], intersect_region[2]):
                    for j in range(intersect_region[1], intersect_region[3]):
                        if cropped_mask1[j - crop_region1[1], i - crop_region1[0]] == 1 and \
                                cropped_mask2[j - crop_region2[1], i - crop_region2[0]] == 1:
                            # pixel overlaps with both masks, set it as 0
                            changed = True
                            cropped_mask1[j - crop_region1[1], i - crop_region1[0]] = 0
                        else:
                            # pixel does not overlap with both masks, don't care
                            pass

                if changed:
                    item = SEG(bseg.cropped_image, cropped_mask1, bseg.confidence, bseg.crop_region, bseg.bbox, bseg.label, None)
                    result.append(item)
                else:
                    result.append(bseg)

        return ((base_segs[0], result),)

```
