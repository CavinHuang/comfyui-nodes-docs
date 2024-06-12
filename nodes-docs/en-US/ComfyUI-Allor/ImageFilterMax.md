---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterMax
## Documentation
- Class name: `ImageFilterMax`
- Category: `image/filter`
- Output node: `False`

The ImageFilterMax node applies a maximum filter to images, enhancing the brightest areas and potentially useful for noise reduction or highlighting features.
## Input types
### Required
- **`images`**
    - Specifies the images to be processed, serving as the primary input for the filter operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`size`**
    - Determines the size of the filter kernel, affecting the extent of the maximum filtering effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces the processed images after applying the maximum filter, highlighting the brightest areas.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterMax:
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
        return applyImageFilter(images, ImageFilter.MaxFilter(int(size) + 1))

```
