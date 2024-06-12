---
tags:
- Mask
- MaskBatch
---

# Mask Batch to Mask
## Documentation
- Class name: `Mask Batch to Mask`
- Category: `WAS Suite/Image/Masking`
- Output node: `False`

This node is designed to extract a single mask from a batch of masks based on a specified batch number. It facilitates the selection and isolation of a specific mask from a collection, enabling focused operations on a singular mask element within a broader batch context.
## Input types
### Required
- **`masks`**
    - The collection of masks from which a single mask is to be extracted. It plays a crucial role in determining the specific mask to isolate based on the batch number.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
- **`batch_number`**
    - Specifies the index of the mask to be extracted from the batch. It determines which mask is isolated and returned as the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The single mask extracted from the specified batch position. It represents the isolated mask element for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Mask_Batch_to_Single_Mask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
                "batch_number": ("INT", {"default": 0, "min": 0, "max": 64, "step": 1}),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "mask_batch_to_mask"

    CATEGORY = "WAS Suite/Image/Masking"

    def mask_batch_to_mask(self, masks=[], batch_number=0):
        count = 0
        for _ in masks:
            if batch_number == count:
                tensor = masks[batch_number][0]
                return (tensor,)
            count += 1

        cstr(f"Batch number `{batch_number}` is not defined, returning last image").error.print()
        last_tensor = masks[-1][0]
        return (last_tensor,)

```
