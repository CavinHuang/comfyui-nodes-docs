---
tags:
- ImpactPack
- Segmentation
---

# Edit SEG_ELT
## Documentation
- Class name: `ImpactEdit_SEG_ELT`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactEdit_SEG_ELT node is designed for editing and manipulating segmentation elements (SEG_ELT) within the ImpactPack framework. It focuses on modifying the properties of segmentation elements to achieve desired alterations, such as adjusting their bounding boxes or applying transformations, thereby enabling more precise control over the segmentation output.
## Input types
### Required
- **`seg_elt`**
    - The 'seg_elt' parameter represents the segmentation element (SEG_ELT) to be edited. It is crucial for specifying the target segmentation element whose properties are to be modified.
    - Comfy dtype: `SEG_ELT`
    - Python dtype: `SEG`
### Optional
- **`cropped_image_opt`**
    - Optional parameter for providing an alternative cropped image for the segmentation element.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
- **`cropped_mask_opt`**
    - Optional parameter for providing an alternative cropped mask for the segmentation element.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[Mask]`
- **`crop_region_opt`**
    - Optional parameter for providing an alternative crop region for the segmentation element.
    - Comfy dtype: `SEG_ELT_crop_region`
    - Python dtype: `Optional[SEG_ELT_crop_region]`
- **`bbox_opt`**
    - Optional parameter for providing an alternative bounding box for the segmentation element.
    - Comfy dtype: `SEG_ELT_bbox`
    - Python dtype: `Optional[SEG_ELT_bbox]`
- **`control_net_wrapper_opt`**
    - Optional parameter for providing an alternative control net wrapper for the segmentation element.
    - Comfy dtype: `SEG_ELT_control_net_wrapper`
    - Python dtype: `Optional[SEG_ELT_control_net_wrapper]`
- **`confidence_opt`**
    - Optional parameter for specifying the confidence level of the segmentation element. It affects the processing and interpretation of the segmentation element.
    - Comfy dtype: `FLOAT`
    - Python dtype: `Optional[float]`
- **`label_opt`**
    - Optional parameter for specifying the label of the segmentation element. It affects the processing and categorization of the segmentation element.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[str]`
## Output types
- **`seg_elt`**
    - Comfy dtype: `SEG_ELT`
    - Returns the modified segmentation element (SEG_ELT) after applying the specified edits, such as scaling the bounding box.
    - Python dtype: `SEG`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Edit_SEG_ELT:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seg_elt": ("SEG_ELT", ),
                     },
                "optional": {
                     "cropped_image_opt": ("IMAGE", ),
                     "cropped_mask_opt": ("MASK", ),
                     "crop_region_opt": ("SEG_ELT_crop_region", ),
                     "bbox_opt": ("SEG_ELT_bbox", ),
                     "control_net_wrapper_opt": ("SEG_ELT_control_net_wrapper", ),
                     "confidence_opt": ("FLOAT", {"min": 0, "max": 1.0, "step": 0.1, "forceInput": True}),
                     "label_opt": ("STRING", {"multiline": False, "forceInput": True}),
                    }
                }

    RETURN_TYPES = ("SEG_ELT", )

    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, seg_elt, cropped_image_opt=None, cropped_mask_opt=None, confidence_opt=None, crop_region_opt=None,
             bbox_opt=None, label_opt=None, control_net_wrapper_opt=None):

        cropped_image = seg_elt.cropped_image if cropped_image_opt is None else cropped_image_opt
        cropped_mask = seg_elt.cropped_mask if cropped_mask_opt is None else cropped_mask_opt
        confidence = seg_elt.confidence if confidence_opt is None else confidence_opt
        crop_region = seg_elt.crop_region if crop_region_opt is None else crop_region_opt
        bbox = seg_elt.bbox if bbox_opt is None else bbox_opt
        label = seg_elt.label if label_opt is None else label_opt
        control_net_wrapper = seg_elt.control_net_wrapper if control_net_wrapper_opt is None else control_net_wrapper_opt

        cropped_image = cropped_image.numpy() if cropped_image is not None else None

        if isinstance(cropped_mask, torch.Tensor):
            if len(cropped_mask.shape) == 3:
                cropped_mask = cropped_mask.squeeze(0)

            cropped_mask = cropped_mask.numpy()

        seg = SEG(cropped_image, cropped_mask, confidence, crop_region, bbox, label, control_net_wrapper)

        return (seg,)

```
