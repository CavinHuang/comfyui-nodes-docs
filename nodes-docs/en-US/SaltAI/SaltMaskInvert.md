---
tags:
- MaskInversion
---

# Invert Mask Regions
## Documentation
- Class name: `SaltMaskInvert`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskInvert node is designed to invert the pixel values of mask regions, effectively flipping the mask's foreground and background. This operation is fundamental in image processing tasks where the focus is on the inverse of the given regions.
## Input types
### Required
- **`masks`**
    - The input masks to be inverted. This parameter is crucial as it directly influences the inversion process, determining which areas of the mask will be flipped.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The inverted masks, with pixel values flipped from the original input. This output is significant for subsequent image processing or analysis tasks that require the inverted mask regions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskInvert:
    @classmethod
    def INPUT_TYPES(cls):
        return {
                    "required": {
                        "masks": ("MASK",),
                    }
                }

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "add_masks"

    def add_masks(self, masks):
        return (1. - masks,)

```
