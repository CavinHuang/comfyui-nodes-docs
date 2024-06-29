---
tags:
- Mask
- MaskMorphology
---

# Dilate Mask (SEGS)
## Documentation
- Class name: `ImpactDilateMaskInSEGS`
- Category: `ImpactPack/Util`
- Output node: `False`

This node applies a dilation operation to the masks within a collection of segmentation elements (SEGS), potentially expanding their boundaries. It's designed to modify the spatial geometry of segmentation masks, making them larger or smaller based on the dilation parameter.
## Input types
### Required
- **`segs`**
    - Represents the collection of segmentation elements (SEGS) to which the dilation operation will be applied. It's crucial for defining the input segmentation masks that will undergo geometric transformation.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[SEG]`
- **`dilation`**
    - Specifies the intensity of the dilation operation. Positive values cause the masks to expand, while negative values lead to contraction. This parameter directly influences the geometric transformation of the segmentation masks.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output is a modified collection of segmentation elements (SEGS) where each mask has been dilated according to the specified dilation parameter.
    - Python dtype: `Tuple[str, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactDilateMaskInSEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactDilateMaskInSEGS.md)



## Source code
```python
class DilateMaskInSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs": ("SEGS", ),
                     "dilation": ("INT", {"default": 10, "min": -512, "max": 512, "step": 1}),
                }}

    RETURN_TYPES = ("SEGS", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs, dilation):
        new_segs = []
        for seg in segs[1]:
            mask = core.dilate_mask(seg.cropped_mask, dilation)
            seg = SEG(seg.cropped_image, mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
            new_segs.append(seg)

        return ((segs[0], new_segs), )

```
