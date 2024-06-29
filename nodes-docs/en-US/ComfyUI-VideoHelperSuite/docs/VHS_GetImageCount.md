---
tags:
- Counting
---

# Get Image Count 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_GetImageCount`
- Category: `Video Helper Suite 🎥🅥🅗🅢/image`
- Output node: `False`

The `VHS_GetImageCount` node is designed to count the number of images in a given batch. It serves as a utility within the Video Helper Suite to facilitate operations that require knowledge of batch size, such as splitting or merging batches.
## Input types
### Required
- **`images`**
    - The `images` parameter represents the batch of images whose count is to be determined. It is crucial for calculating the total number of images present, which impacts subsequent operations that depend on batch size.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`count`**
    - Comfy dtype: `INT`
    - The `count` output represents the total number of images in the input batch. This information is essential for managing image batches and planning further processing steps.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetImageCount:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/image"

    RETURN_TYPES = ("INT",)
    RETURN_NAMES = ("count",)
    FUNCTION = "count_input"

    def count_input(self, images: Tensor):
        return (images.size(0),)

```
