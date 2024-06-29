---
tags:
- Counting
---

# Get Mask Count 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_GetMaskCount`
- Category: `Video Helper Suite 🎥🅥🅗🅢/mask`
- Output node: `False`

The `VHS_GetMaskCount` node is designed to count the number of masks in a given batch. It provides a straightforward way to quantify the number of mask elements, facilitating operations that require knowledge of batch size or element count.
## Input types
### Required
- **`mask`**
    - The `mask` parameter represents the batch of masks for which the count is to be determined. It is crucial for understanding the scale of operations or adjustments needed based on the batch size.
    - Comfy dtype: `MASK`
    - Python dtype: `Tensor`
## Output types
- **`count`**
    - Comfy dtype: `INT`
    - The `count` output represents the total number of masks in the input batch. This information is essential for batch processing or for scaling operations according to the batch size.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetMaskCount:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/mask"

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("count",)
    FUNCTION = "count_input"

    def count_input(self, mask: Tensor):
        return (mask.size(0),)

```
