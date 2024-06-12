---
tags:
- MaskMath
---

# Bitwise(MASK - MASK)
## Documentation
- Class name: `SubtractMask`
- Category: `ImpactPack/Operation`
- Output node: `False`

The SubtractMask node is designed to perform subtraction operations between two mask inputs, resulting in a single mask output that represents the difference between the two input masks. This operation is useful in scenarios where the removal of certain areas or features from a mask is required, effectively highlighting disparities or changes between the two masks.
## Input types
### Required
- **`mask1`**
    - The first mask input for the subtraction operation. It serves as the base mask from which the second mask will be subtracted.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - The second mask input for the subtraction operation. This mask is subtracted from the first mask, effectively removing its features from the first mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The resulting mask after subtracting the second mask from the first. This output highlights the differences or changes between the two input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SubtractMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "mask1": ("MASK", ),
                        "mask2": ("MASK", ),
                      }
                }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, mask1, mask2):
        mask = subtract_masks(mask1, mask2)
        return (mask,)

```
