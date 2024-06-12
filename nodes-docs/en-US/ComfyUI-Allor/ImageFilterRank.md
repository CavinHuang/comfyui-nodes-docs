---
tags:
- VisualEffects
---

# ImageFilterRank
## Documentation
- Class name: `ImageFilterRank`
- Category: `image/filter`
- Output node: `False`

The `ImageFilterRank` node applies a rank filter to a collection of images, allowing for the enhancement or modification of image details based on the rank and size parameters specified. This node is part of the image filtering category and is designed to process images by applying a specific rank-based filtering operation.
## Input types
### Required
- **`images`**
    - The collection of images to which the rank filter will be applied. This parameter is crucial for defining the input images that will undergo the filtering process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Specifies the size of the filter to be applied. The size parameter influences the extent of the filtering effect on the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rank`**
    - Determines the rank of the filter within the specified size, affecting the intensity and type of filtering applied to the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a collection of images that have undergone rank-based filtering, showcasing the effect of the specified rank and size parameters on the original images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterRank:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size": ("INT", {
                    "default": 2,
                    "min": 0,
                    "step": 2
                }),
                "rank": ("INT", {
                    "default": 1,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size, rank):
        return applyImageFilter(images, ImageFilter.RankFilter(int(size) + 1, rank))

```
