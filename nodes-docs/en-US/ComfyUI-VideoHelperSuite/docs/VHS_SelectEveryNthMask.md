---
tags:
- Mask
---

# Select Every Nth Mask 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_SelectEveryNthMask`
- Category: `Video Helper Suite 🎥🅥🅗🅢/mask`
- Output node: `False`

This node is designed to streamline the process of selecting every Nth mask from a batch of masks, facilitating operations such as thinning out data or creating subsets for specific processing needs. It abstracts the complexity of batch manipulation, offering a straightforward way to reduce the volume of mask data by periodic sampling.
## Input types
### Required
- **`mask`**
    - The input mask tensor from which every Nth mask will be selected. This parameter is crucial for determining the subset of masks to be processed, directly impacting the node's output by filtering the input data based on the specified interval.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
- **`select_every_nth`**
    - Specifies the interval at which masks are selected from the input batch. This parameter defines the thinning rate, playing a pivotal role in the output by determining the frequency of mask selection within the batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`MASK`**
    - Comfy dtype: `MASK`
    - The output tensor containing every Nth mask selected from the input batch, effectively reducing the dataset size based on the specified interval.
    - Python dtype: `Tensor`
- **`count`**
    - Comfy dtype: `INT`
    - The total count of masks selected and returned by the node, providing a straightforward way to understand the output's volume.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SelectEveryNthMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "mask": ("MASK",),
                    "select_every_nth": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1}),
                },
            }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/mask"

    RETURN_TYPES = ("MASK", "INT",)
    RETURN_NAMES = ("MASK", "count",)
    FUNCTION = "select_masks"

    def select_masks(self, mask: Tensor, select_every_nth: int):
        sub_mask = mask[0::select_every_nth]
        return (sub_mask, sub_mask.size(0))

```
