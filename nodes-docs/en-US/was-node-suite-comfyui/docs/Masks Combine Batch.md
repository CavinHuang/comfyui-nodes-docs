---
tags:
- Mask
---

# Masks Combine Batch
## Documentation
- Class name: `Masks Combine Batch`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to combine multiple mask tensors into a single mask tensor by summing them up. It ensures that the resulting mask values are clamped between 0 and 1, maintaining the integrity of mask data.
## Input types
### Required
- **`masks`**
    - The 'masks' input consists of a batch of mask tensors to be combined. It plays a crucial role in the node's operation by providing the raw data that will be processed into a single, unified mask.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a single mask tensor that represents the combined effect of the input masks, with values clamped between 0 and 1.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Combine_Batch:

    def __init__(self):
        self.WT = WAS_Tools_Class()

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                    },
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)

    FUNCTION = "combine_masks"

    def combine_masks(self, masks):
        combined_mask = torch.sum(torch.stack([mask.unsqueeze(0) for mask in masks], dim=0), dim=0)
        combined_mask = torch.clamp(combined_mask, 0, 1)  # Ensure values are between 0 and 1
        return (combined_mask, )

```
