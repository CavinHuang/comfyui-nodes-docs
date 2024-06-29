---
tags:
- MaskInversion
---

# Mask Invert
## Documentation
- Class name: `Mask Invert`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

The Mask Invert node is designed to invert the values of a given mask, effectively flipping the masked and unmasked regions. This operation is commonly used in image processing and computer vision tasks to reverse the areas of interest in a mask.
## Input types
### Required
- **`masks`**
    - The input mask to be inverted. This mask serves as the primary data for inversion, determining the areas that will be flipped in the output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The inverted mask, where the originally masked regions are now unmasked and vice versa, suitable for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Invert:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                    }
                }

    CATEGORY = "WAS Suite/Image/Masking"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "add_masks"

    def add_masks(self, masks):
        return (1. - masks,)

```
