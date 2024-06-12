---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterDetail
## Documentation
- Class name: `ImageFilterDetail`
- Category: `image/filter`
- Output node: `False`

The ImageFilterDetail node applies a detail enhancement filter to a collection of images, improving their visual clarity and definition.
## Input types
### Required
- **`images`**
    - The collection of images to be processed. This input is essential for applying the detail enhancement filter to each image in the collection.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The enhanced images with improved detail and clarity.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterDetail:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images):
        return applyImageFilter(images, ImageFilter.DETAIL)

```
