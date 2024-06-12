---
tags:
- Mask
- MaskMorphology
---

# Dilate Mask (SEG_ELT)
## Documentation
- Class name: `ImpactDilate_Mask_SEG_ELT`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to apply dilation to the mask of a single segmentation element (SEG_ELT), allowing for the adjustment of the mask's boundaries. It is part of the ImpactPack/Util category and serves as a utility for modifying the spatial extent of segmentation masks, which can be crucial for various image processing and computer vision tasks.
## Input types
### Required
- **`seg_elt`**
    - Represents a single segmentation element (SEG_ELT) whose mask will be modified through dilation, depending on the dilation parameter value. This adjustment can be essential for refining segmentation results or preparing data for further processing.
    - Comfy dtype: `SEG_ELT`
    - Python dtype: `SEG_ELT`
- **`dilation`**
    - Specifies the intensity of the mask modification. Positive values cause dilation (expanding the mask), allowing for flexible mask adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`seg_elt`**
    - Comfy dtype: `SEG_ELT`
    - The output is a modified single segmentation element (SEG_ELT) with its mask dilated, based on the input parameters. This modification enables refined control over the segmentation mask's boundaries.
    - Python dtype: `SEG_ELT`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Dilate_SEG_ELT:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seg_elt": ("SEG_ELT", ),
                     "dilation": ("INT", {"default": 10, "min": -512, "max": 512, "step": 1}),
                }}

    RETURN_TYPES = ("SEG_ELT", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, seg, dilation):
        mask = core.dilate_mask(seg.cropped_mask, dilation)
        seg = SEG(seg.cropped_image, mask, seg.confidence, seg.crop_region, seg.bbox, seg.label, seg.control_net_wrapper)
        return (seg,)

```
