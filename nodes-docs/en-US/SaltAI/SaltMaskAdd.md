---
tags:
- Mask
- MaskRegion
---

# Add Mask Regions
## Documentation
- Class name: `SaltMaskAdd`
- Category: `SALT/Masking/Filter`
- Output node: `False`

The SaltMaskAdd node is designed to perform element-wise addition of two mask tensors, applying a clamp operation to ensure the resulting values fall within a specified range. This node is essential for combining mask regions to create composite masks or to enhance certain features within the mask by adding another mask's values.
## Input types
### Required
- **`masks_a`**
    - The first set of mask tensors to be added. These masks are one of the primary inputs for the addition operation, contributing to the resultant composite mask.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`masks_b`**
    - The second set of mask tensors to be added. These masks are combined with the first set to produce the final composite mask, influencing the outcome of the addition operation.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`MASKS`**
    - Comfy dtype: `MASK`
    - The output of the node, representing the composite mask created by adding the input masks together, with values clamped to ensure they remain within a valid range.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltMaskAdd:

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

    CATEGORY = f"{NAME}/Masking/Filter"

    RETURN_TYPES = ("MASK",)
    RETURN_NAMES = ("MASKS",)

    FUNCTION = "add_masks"

    def add_masks(self, masks_a, masks_b):
        if masks_a.shape != masks_b.shape or len(masks_a.shape) != 3 or len(masks_b.shape) != 3:
            raise ValueError("Both input tensors must be of shape [N, H, W].")
        added_masks = torch.clamp(masks_a + masks_b, 0, 255)
        return (added_masks,)  

```
