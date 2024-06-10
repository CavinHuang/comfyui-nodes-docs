---
tags:
- SEGSPrep
- Segmentation
---

# SEGS to Mask Batch
## Documentation
- Class name: `ImpactSEGSToMaskBatch`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to convert a collection of segmentation data (SEGS) into a batch of masks. It processes the input segmentation data to generate a corresponding set of masks, which are then combined into a single batch. This operation facilitates the handling and manipulation of mask data at scale, streamlining workflows that involve the analysis or transformation of segmented images.
## Input types
### Required
- **`segs`**
    - The 'segs' input represents the segmentation data that will be converted into a batch of masks. This data is crucial for the node's operation as it forms the basis for the mask generation process.
    - Comfy dtype: `SEGS`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a batch of masks, where each mask corresponds to a segment from the input segmentation data. This batch format is useful for subsequent processing or analysis steps that require masks in a collective form.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SEGSToMaskBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs": ("SEGS", ),
                     },
                }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs):
        masks = core.segs_to_masklist(segs)
        masks = [utils.make_3d_mask(mask) for mask in masks]
        mask_batch = torch.concat(masks)
        return (mask_batch,)

```
