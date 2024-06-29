---
tags:
- SEGSPrep
- Segmentation
---

# MASK to SEGS for AnimateDiff
## Documentation
- Class name: `MaskToSEGS_for_AnimateDiff`
- Category: `ImpactPack/Operation`
- Output node: `False`

The MaskToSEGS_for_AnimateDiff node is designed to convert a mask into a segmented representation (SEGS) specifically tailored for animations with differences. It enhances the mask-to-SEGS conversion process by incorporating additional steps to handle the nuances of animated content, ensuring that the segmented output is optimized for subsequent processing in animation-focused workflows.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the input mask that is to be converted into segmented form. It plays a crucial role in defining the areas of interest within the animation frame.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`combined`**
    - The 'combined' parameter indicates whether the mask should be combined with other masks during the conversion process. This affects how the mask is processed and integrated into the segmented output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`crop_factor`**
    - The 'crop_factor' parameter determines the extent to which the input mask is cropped before conversion. This affects the granularity of the segmented output, allowing for finer control over the segmentation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`bbox_fill`**
    - The 'bbox_fill' parameter specifies whether bounding boxes should be filled during the segmentation process. This can influence the visual representation of the segmented output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`drop_size`**
    - The 'drop_size' parameter sets the minimum size of segments to be included in the output. Smaller segments below this threshold are dropped, allowing for a cleaner, more focused segmented representation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`contour_fill`**
    - The 'contour_fill' parameter indicates whether contours within the mask should be filled during the segmentation process. This can enhance the visual clarity of the segmented output, especially in animations with distinct boundaries.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`segs`**
    - Comfy dtype: `SEGS`
    - The output is a segmented representation (SEGS) of the input mask, optimized for animations with differences. It provides a detailed and structured format that is suitable for further processing in animation-focused workflows.
    - Python dtype: `Tuple[torch.Tensor, List[SEG]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MaskToSEGS_for_AnimateDiff:
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

        segs = core.mask_to_segs(mask, combined, crop_factor, bbox_fill, drop_size, is_contour=contour_fill)

        all_masks = SEGSToMaskList().doit(segs)[0]

        result_mask = (all_masks[0] * 255).to(torch.uint8)
        for mask in all_masks[1:]:
            result_mask |= (mask * 255).to(torch.uint8)

        result_mask = (result_mask/255.0).to(torch.float32)
        result_mask = utils.to_binary_mask(result_mask, 0.1)[0]

        return MaskToSEGS().doit(result_mask, False, crop_factor, False, drop_size, contour_fill)

```
