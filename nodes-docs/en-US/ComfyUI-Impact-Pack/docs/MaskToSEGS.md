---
tags:
- SEGSPrep
- Segmentation
---

# MASK to SEGS
## Documentation
- Class name: `MaskToSEGS`
- Category: `ImpactPack/Operation`
- Output node: `False`

The MaskToSEGS node is designed to transform a given mask into a structured representation known as SEGS, which can be further utilized for various image processing and analysis tasks. This transformation involves operations such as cropping, filling, and contour detection based on the provided mask, enabling more granular control and manipulation of image segments.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask image that is to be transformed into SEGS. This mask serves as the basis for the segmentation process, dictating the areas of interest within the image.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`combined`**
    - The 'combined' boolean parameter determines whether the resulting SEGS should be combined into a single segment or kept as separate entities, allowing for flexibility in how the segments are processed and utilized.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`crop_factor`**
    - This parameter specifies the factor by which the bounding box around the mask should be cropped. It allows for adjusting the tightness of the crop around the mask, affecting the resulting segment's size and shape.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_fill`**
    - A boolean parameter that indicates whether the bounding boxes around the segments should be filled. Enabling this option modifies the visual representation of the segments, potentially aiding in their differentiation or analysis.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`drop_size`**
    - Defines the minimum size of segments to be considered in the SEGS representation. Smaller segments below this threshold can be dropped, allowing for the filtering out of noise or irrelevant details.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`contour_fill`**
    - Determines whether the contours of the segments should be filled. This option can alter the appearance of the segments, potentially making them more distinguishable or easier to analyze.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output is a structured representation known as SEGS, derived from the input mask. This representation facilitates further processing and analysis of the image segments.
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [DetailerForEachDebugPipe](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebugPipe.md)
    - [DetailerForEachDebug](../../ComfyUI-Impact-Pack/Nodes/DetailerForEachDebug.md)



## Source code
```python
class MaskToSEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "mask": ("MASK",),
                                "combined": ("BOOLEAN", {"default": False, "label_on": "True", "label_off": "False"}),
                                "crop_factor": ("FLOAT", {"default": 3.0, "min": 1.0, "max": 100, "step": 0.1}),
                                "bbox_fill": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                                "drop_size": ("INT", {"min": 1, "max": MAX_RESOLUTION, "step": 1, "default": 10}),
                                "contour_fill": ("BOOLEAN", {"default": False, "label_on": "enabled", "label_off": "disabled"}),
                             }
                }

    RETURN_TYPES = ("SEGS",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, mask, combined, crop_factor, bbox_fill, drop_size, contour_fill=False):
        mask = make_2d_mask(mask)

        result = core.mask_to_segs(mask, combined, crop_factor, bbox_fill, drop_size, is_contour=contour_fill)
        return (result, )

```
