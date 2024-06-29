---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterSmoothMore
## Documentation
- Class name: `ImageFilterSmoothMore`
- Category: `image/filter`
- Output node: `False`

The ImageFilterSmoothMore node applies a more intensive smoothing filter to images, enhancing their visual softness beyond the basic smoothing level.
## Input types
### Required
- **`images`**
    - Specifies the images to be processed with an enhanced smoothing filter, aiming to increase their visual softness.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns images that have undergone an enhanced smoothing process, resulting in a softer visual appearance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterSmoothMore:
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
        return applyImageFilter(images, ImageFilter.SMOOTH_MORE)

```
