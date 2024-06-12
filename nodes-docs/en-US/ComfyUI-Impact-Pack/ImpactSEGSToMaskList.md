---
tags:
- SEGSPrep
- Segmentation
---

# SEGS to Mask List
## Documentation
- Class name: `ImpactSEGSToMaskList`
- Category: `ImpactPack/Util`
- Output node: `False`

This node is designed to convert segmentation data (SEGS) into a list of masks. It serves as a utility within the Impact Pack, facilitating the transformation of complex segmentation formats into a more universally applicable mask format, thereby enabling further image processing and analysis tasks.
## Input types
### Required
- **`segs`**
    - The 'segs' parameter represents the segmentation data to be converted into masks. It is crucial for the node's operation as it provides the raw segmentation information that will be transformed into a list of individual masks.
    - Comfy dtype: `SEGS`
    - Python dtype: `Tuple[torch.Size, List[torch.Tensor]]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a list of masks derived from the input segmentation data. Each mask corresponds to a segment in the input, allowing for detailed analysis and manipulation of individual segments.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SEGSToMaskList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "segs": ("SEGS", ),
                     },
                }

    RETURN_TYPES = ("MASK",)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Util"

    def doit(self, segs):
        masks = core.segs_to_masklist(segs)
        if len(masks) == 0:
            empty_mask = torch.zeros(segs[0], dtype=torch.float32, device="cpu")
            masks = [empty_mask]
        masks = [utils.make_3d_mask(mask) for mask in masks]
        return (masks,)

```
