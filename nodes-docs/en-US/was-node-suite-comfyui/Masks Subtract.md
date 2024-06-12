---
tags:
- MaskMath
---

# Masks Subtract
## Documentation
- Class name: `Masks Subtract`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The node is designed to perform subtraction between two sets of masks, effectively removing parts of one mask using another. This operation is useful in image processing tasks where specific areas of interest need to be isolated or removed from an image mask.
## Input types
### Required
- **`masks_a`**
    - Represents the first set of masks to be used in the subtraction operation. It plays a crucial role in determining the areas to be retained.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`masks_b`**
    - Represents the second set of masks to be subtracted from the first set. It determines the areas to be removed from the resulting mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The resulting mask after subtracting 'masks_b' from 'masks_a', containing only the areas present in 'masks_a' but not in 'masks_b'.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ToBinaryMask](../../ComfyUI-Impact-Pack/Nodes/ToBinaryMask.md)



## Source code
```python
class WAS_Mask_Subtract:

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

    FUNCTION = "subtract_masks"

    def subtract_masks(self, masks_a, masks_b):
        subtracted_masks = torch.clamp(masks_a - masks_b, 0, 255)
        return (subtracted_masks,)

```
