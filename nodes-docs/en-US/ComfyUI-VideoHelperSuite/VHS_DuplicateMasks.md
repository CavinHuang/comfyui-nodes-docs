---
tags:
- Mask
---

# Duplicate Mask Batch 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_DuplicateMasks`
- Category: `Video Helper Suite 🎥🅥🅗🅢/mask`
- Output node: `False`

The `VHS_DuplicateMasks` node is designed to replicate a given mask tensor a specified number of times, effectively creating a batch of identical masks. This functionality is crucial for operations requiring multiple instances of the same mask, such as batch processing or data augmentation in video and image editing workflows.
## Input types
### Required
- **`mask`**
    - The `mask` parameter represents the input tensor to be duplicated. It is central to the node's operation, as it defines the mask that will be replicated across the new batch.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`multiply_by`**
    - The `multiply_by` parameter specifies the number of times the input mask should be duplicated. This allows for dynamic adjustment of the batch size based on the needs of the workflow.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASK`**
    - Comfy dtype: `MASK`
    - The duplicated mask batch, consisting of multiple copies of the input mask.
    - Python dtype: `torch.Tensor`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of masks in the duplicated batch, providing a straightforward way to track batch size.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DuplicateMasks:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
                "multiply_by": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1})
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/mask"

    RETURN_TYPES = ("MASK", "INT",)
    RETURN_NAMES = ("MASK", "count",)
    FUNCTION = "duplicate_input"

    def duplicate_input(self, mask: Tensor, multiply_by: int):
        full_masks = []
        for n in range(0, multiply_by):
            full_masks.append(mask)
        new_mask = torch.cat(full_masks, dim=0)
        return (new_mask, new_mask.size(0),)

```
