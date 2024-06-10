---
tags:
- Mask
---

# Masks Add
## Documentation
- Class name: `Masks Add`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The node is designed to perform addition operations on mask data, effectively combining or layering two masks together. It supports handling masks with different dimensions by adjusting their shapes before performing the addition, ensuring compatibility and flexibility in mask manipulation.
## Input types
### Required
- **`masks_a`**
    - Represents the first set of masks to be added. Its role is crucial as it serves as one of the two primary inputs for the addition operation, directly influencing the outcome.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`masks_b`**
    - Represents the second set of masks to be added alongside `masks_a`. It plays a vital role in the addition operation, contributing to the final combined mask result.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The result of adding two sets of masks, which could be used for further image processing or analysis tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Add:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks_a": ("MASK",),
                        "masks_b": ("MASK",),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "add_masks"

    def add_masks(self, masks_a, masks_b):
        if masks_a.ndim > 2 and masks_b.ndim > 2:
            added_masks = masks_a + masks_b
        else:
            added_masks = torch.clamp(masks_a.unsqueeze(1) + masks_b.unsqueeze(1), 0, 255)
            added_masks = added_masks.squeeze(1)
        return (added_masks,)

```
