---
tags:
- MaskMath
---

# Subtract Mask Regions
## Documentation
- Class name: `SaltMaskSubtract`
- Category: `SALT/Masking/Filter`
- Output node: `False`

This node is designed to perform subtraction between two sets of masks, effectively computing the difference to highlight or remove specific regions within the masks.
## Input types
### Required
- **`masks_a`**
    - The first set of masks to be subtracted from. This input plays a crucial role in determining the base for the subtraction operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`masks_b`**
    - The second set of masks to subtract from the first set. This input is essential for identifying the regions to be removed or highlighted in the resulting masks.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The result of subtracting the second set of masks from the first, producing a new set of masks that highlight differences.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskSubtract:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks_a": ("MASK",),
                        "masks_b": ("MASK",),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "subtract_masks"

    def subtract_masks(self, masks_a, masks_b):
        subtracted_masks = torch.clamp(masks_a - masks_b, 0, 255)
        return (subtracted_masks,)

```
