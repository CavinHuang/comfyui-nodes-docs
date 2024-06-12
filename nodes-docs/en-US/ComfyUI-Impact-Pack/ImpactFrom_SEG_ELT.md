---
tags:
- ImpactPack
- Segmentation
---

# From SEG_ELT
## Documentation
- Class name: `ImpactFrom_SEG_ELT`
- Category: `ImpactPack/Util`
- Output node: `False`

The `ImpactFrom_SEG_ELT` node is designed to process segmentation elements (SEG_ELT) by extracting and transforming relevant information such as cropped images, masks, and bounding boxes. It aims to facilitate further analysis or manipulation of these elements by providing detailed attributes including crop regions, bounding boxes, control network wrappers, confidence levels, and labels.
## Input types
### Required
- **`seg_elt`**
    - The segmentation element (SEG_ELT) input is crucial for extracting and transforming detailed attributes such as cropped images, masks, and bounding boxes. It serves as the foundation for the node's operation, enabling the analysis or manipulation of segmentation data.
    - Comfy dtype: `SEG_ELT`
    - Python dtype: `SEG_ELT`
## Output types
- **`seg_elt`**
    - Comfy dtype: `SEG_ELT`
    - Returns the original segmentation element (SEG_ELT) with potentially modified attributes.
    - Python dtype: `SEG_ELT`
- **`cropped_image`**
    - Comfy dtype: `IMAGE`
    - Provides the cropped image extracted from the segmentation element.
    - Python dtype: `torch.Tensor`
- **`cropped_mask`**
    - Comfy dtype: `MASK`
    - Provides the cropped mask associated with the segmentation element.
    - Python dtype: `torch.Tensor`
- **`crop_region`**
    - Comfy dtype: `SEG_ELT_crop_region`
    - Returns the crop region used to extract the cropped image and mask.
    - Python dtype: `Tuple[int, int, int, int]`
- **`bbox`**
    - Comfy dtype: `SEG_ELT_bbox`
    - Returns the bounding box of the segmentation element.
    - Python dtype: `Tuple[int, int, int, int]`
- **`control_net_wrapper`**
    - Comfy dtype: `SEG_ELT_control_net_wrapper`
    - Provides the control network wrapper associated with the segmentation element.
    - Python dtype: `core.ControlNetWrapper`
- **`confidence`**
    - Comfy dtype: `FLOAT`
    - Returns the confidence level of the segmentation element.
    - Python dtype: `float`
- **`label`**
    - Comfy dtype: `STRING`
    - Provides the label assigned to the segmentation element.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class From_SEG_ELT:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seg_elt": ("SEG_ELT", ),
                     },
                }

    RETURN_TYPES = ("SEG_ELT", "IMAGE", "MASK", "SEG_ELT_crop_region", "SEG_ELT_bbox", "SEG_ELT_control_net_wrapper", "FLOAT", "STRING")
    RETURN_NAMES = ("seg_elt", "cropped_image", "cropped_mask", "crop_region", "bbox", "control_net_wrapper", "confidence", "label")

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, seg_elt):
        cropped_image = to_tensor(seg_elt.cropped_image) if seg_elt.cropped_image is not None else None
        return (seg_elt, cropped_image, to_tensor(seg_elt.cropped_mask), seg_elt.crop_region, seg_elt.bbox, seg_elt.control_net_wrapper, seg_elt.confidence, seg_elt.label,)

```
