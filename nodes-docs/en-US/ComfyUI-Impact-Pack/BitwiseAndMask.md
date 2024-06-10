---
tags:
- Segmentation
---

# Bitwise(MASK & MASK)
## Documentation
- Class name: `BitwiseAndMask`
- Category: `ImpactPack/Operation`
- Output node: `False`

The BitwiseAndMask node performs a bitwise AND operation between two masks, resulting in a new mask that represents the intersection of the input masks. This operation is useful for combining or filtering mask data based on overlapping regions.
## Input types
### Required
- **`mask1`**
    - The first input mask for the bitwise AND operation. It plays a crucial role in determining the resulting mask by intersecting its content with the second mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask2`**
    - The second input mask for the bitwise AND operation. It intersects with the first mask to produce the resulting mask that highlights the overlapping areas.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output mask resulting from the bitwise AND operation between the two input masks, highlighting the areas where both masks overlap.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BitwiseAndMask:
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
        mask = bitwise_and_masks(mask1, mask2)
        return (mask,)

```
