---
tags:
- ImpactPack
- Segmentation
---

# ScaleBy BBOX (SEG_ELT)
## Documentation
- Class name: `ImpactScaleBy_BBOX_SEG_ELT`
- Category: `ImpactPack/Util`
- Output node: `False`

This node scales the bounding box of a segmentation element by a specified factor, adjusting the segmentation mask accordingly. It ensures that the scaled bounding box and its corresponding mask are correctly aligned and sized, maintaining the integrity of the segmentation element.
## Input types
### Required
- **`seg`**
    - The segmentation element whose bounding box is to be scaled. It is crucial for determining the area of interest within the image.
    - Comfy dtype: `SEG_ELT`
    - Python dtype: `SEG_ELT`
- **`scale_by`**
    - The factor by which the bounding box is to be scaled. This directly influences the size of the resulting bounding box and its associated mask.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`seg_elt`**
    - Comfy dtype: `SEG_ELT`
    - The scaled segmentation element, including the adjusted bounding box and mask.
    - Python dtype: `SEG_ELT`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEG_ELT_BBOX_ScaleBy:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seg": ("SEG_ELT", ),
                     "scale_by": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 8.0, "step": 0.01}), }
                }

    RETURN_TYPES = ("SEG_ELT", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    @staticmethod
    def fill_zero_outside_bbox(mask, crop_region, bbox):
        cx1, cy1, _, _ = crop_region
        x1, y1, x2, y2 = bbox
        x1, y1, x2, y2 = x1-cx1, y1-cy1, x2-cx1, y2-cy1
        h, w = mask.shape

        x1 = min(w-1, max(0, x1))
        x2 = min(w-1, max(0, x2))
        y1 = min(h-1, max(0, y1))
        y2 = min(h-1, max(0, y2))

        mask_cropped = mask.copy()
        mask_cropped[:, :x1] = 0  # zero fill left side
        mask_cropped[:, x2:] = 0  # zero fill right side
        mask_cropped[:y1, :] = 0  # zero fill top side
        mask_cropped[y2:, :] = 0  # zero fill bottom side
        return mask_cropped

    def doit(self, seg, scale_by):
        x1, y1, x2, y2 = seg.bbox
        w = x2-x1
        h = y2-y1

        dw = int((w * scale_by - w)/2)
        dh = int((h * scale_by - h)/2)

        bbox = (x1-dw, y1-dh, x2+dw, y2+dh)

        cropped_mask = SEG_ELT_BBOX_ScaleBy.fill_zero_outside_bbox(seg.cropped_mask, seg.crop_region, bbox)
        seg = SEG(seg.cropped_image, cropped_mask, seg.confidence, seg.crop_region, bbox, seg.label, seg.control_net_wrapper)
        return (seg,)

```
