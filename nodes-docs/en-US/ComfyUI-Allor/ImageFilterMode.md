---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterMode
## Documentation
- Class name: `ImageFilterMode`
- Category: `image/filter`
- Output node: `False`

The ImageFilterMode node applies a mode filter to images, which replaces each pixel's value with the most frequent value of its neighbors within a specified size, enhancing uniformity or reducing noise.
## Input types
### Required
- **`images`**
    - Specifies the images to be processed, serving as the primary input for the mode filtering operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Determines the size of the neighborhood around each pixel to consider for calculating the mode, affecting the extent of filtering.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the images after applying the mode filter, showcasing enhanced uniformity or reduced noise.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMode:
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
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size):
        return applyImageFilter(images, ImageFilter.ModeFilter(int(size) + 1))

```
