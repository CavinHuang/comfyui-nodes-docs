---
tags:
- Batch
- Image
- ImageDuplication
---

# Duplicate Image Batch 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_DuplicateImages`
- Category: `Video Helper Suite 🎥🅥🅗🅢/image`
- Output node: `False`

The `VHS_DuplicateImages` node is designed to create multiple copies of a given image batch, effectively duplicating the images a specified number of times. This functionality is crucial for operations requiring augmented data or increased dataset size without new data generation.
## Input types
### Required
- **`images`**
    - Specifies the batch of images to be duplicated. This input is central to the node's operation, determining the base data that will be replicated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tensor`
- **`multiply_by`**
    - Determines the number of times the input images are duplicated. This parameter directly influences the output dataset size, allowing for flexible data augmentation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The duplicated batch of images, expanded according to the `multiply_by` parameter.
    - Python dtype: `Tensor`
- **`count`**
    - Comfy dtype: `INT`
    - The total number of images in the duplicated batch, providing a straightforward count of the output dataset size.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DuplicateImages:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "multiply_by": ("INT", {"default": 1, "min": 1, "max": BIGMAX, "step": 1})
            }
        }
    
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢/image"

    RETURN_TYPES = ("IMAGE", "INT",)
    RETURN_NAMES = ("IMAGE", "count",)
    FUNCTION = "duplicate_input"

    def duplicate_input(self, images: Tensor, multiply_by: int):
        full_images = []
        for n in range(0, multiply_by):
            full_images.append(images)
        new_images = torch.cat(full_images, dim=0)
        return (new_images, new_images.size(0),)

```
