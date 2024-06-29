---
tags:
- SEGSPrep
- Segmentation
---

# SEGS to MASK (combined)
## Documentation
- Class name: `SegsToCombinedMask`
- Category: `ImpactPack/Operation`
- Output node: `False`

This node is designed to transform a collection of segmented objects (segs) into a single, combined mask. It effectively merges individual segment masks into a unified mask representation, facilitating operations that require a holistic view of all segments within an image.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents a collection of segmented objects. It is crucial for defining the segments to be combined into a single mask, affecting the overall composition and appearance of the resulting mask.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[SEG]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a tensor representation of the combined mask, where the individual segment masks have been merged into a unified mask. This mask is suitable for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [Mask Gaussian Region](../../was-node-suite-comfyui/Nodes/Mask Gaussian Region.md)



## Source code
```python
class SegsToCombinedMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"segs": ("SEGS",), }}

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, segs):
        mask = core.segs_to_combined_mask(segs)
        mask = utils.make_3d_mask(mask)
        return (mask,)

```
