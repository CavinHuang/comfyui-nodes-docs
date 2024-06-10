---
tags:
- Mask
---

# Split Mask Batch 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_SplitMasks`
- Category: `Video Helper Suite 🎥🅥🅗🅢/mask`
- Output node: `False`

The VHS_SplitMasks node is designed for dividing a batch of masks into two groups based on a specified index. This functionality is essential for managing and manipulating mask data in video processing tasks, allowing for flexible dataset segmentation and targeted processing of mask subsets.
## Input types
### Required
- **`mask`**
    - The 'mask' parameter represents the batch of masks to be split. It is crucial for determining how the masks are divided into two groups, affecting the node's execution and the composition of the output groups.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`split_index`**
    - The 'split_index' parameter specifies the index at which the batch of masks is divided. It plays a pivotal role in determining the boundary between the two output groups, influencing the distribution of masks in the segmentation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASK_A`**
    - Comfy dtype: `MASK`
    - The first group of masks obtained after splitting the original batch at the specified index.
    - Python dtype: `torch.Tensor`
- **`A_count`**
    - Comfy dtype: `INT`
    - The count of masks in the first group after the split.
    - Python dtype: `int`
- **`MASK_B`**
    - Comfy dtype: `MASK`
    - The second group of masks obtained after splitting the original batch at the specified index.
    - Python dtype: `torch.Tensor`
- **`B_count`**
    - Comfy dtype: `INT`
    - The count of masks in the second group after the split.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SplitMasks:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "mask": ("MASK",),
                    "split_index": ("INT", {"default": 0, "step": 1, "min": BIGMIN, "max": BIGMAX}),
                },
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/mask"

    RETURN_TYPES = ("MASK", "INT", "MASK", "INT")
    RETURN_NAMES = ("MASK_A", "A_count", "MASK_B", "B_count")
    FUNCTION = "split_masks"

    def split_masks(self, mask: Tensor, split_index: int):
        group_a = mask[:split_index]
        group_b = mask[split_index:]
        return (group_a, group_a.size(0), group_b, group_b.size(0))

```
