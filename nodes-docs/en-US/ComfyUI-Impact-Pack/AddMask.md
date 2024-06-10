---
tags:
- Mask
---

# Bitwise(MASK + MASK)
## Documentation
- Class name: `AddMask`
- Category: `ImpactPack/Operation`
- Output node: `False`

The AddMask node is designed to combine two mask inputs into a single mask output. It performs an operation that merges the features or areas covered by both input masks, effectively adding the second mask to the first.
## Input types
### Required
- **`mask1`**
    - The first mask input for the addition operation. It serves as the base to which the second mask will be added.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - The second mask input for the addition operation. It is added to the first mask, combining their features or covered areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a single mask that represents the combined features or areas of the two input masks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [InvertMask](../../Comfy/Nodes/InvertMask.md)



## Source code
```python
class AddMask:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "mask1": ("MASK",),
            "mask2": ("MASK",),
        }
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Operation"

    def doit(self, mask1, mask2):
        mask = add_masks(mask1, mask2)
        return (mask,)

```
