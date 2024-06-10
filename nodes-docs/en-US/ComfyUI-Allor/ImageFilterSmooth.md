---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterSmooth
## Documentation
- Class name: `ImageFilterSmooth`
- Category: `image/filter`
- Output node: `False`

The ImageFilterSmooth node applies a smoothing filter to images, enhancing their visual quality by reducing noise and minor imperfections without significantly altering the image content.
## Input types
### Required
- **`images`**
    - Specifies the images to which the smoothing filter will be applied, aiming to enhance their overall appearance by reducing noise and minor imperfections.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the images after applying the smoothing filter, with reduced noise and minor imperfections for an enhanced visual appearance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterSmooth:
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
        return applyImageFilter(images, ImageFilter.SMOOTH)

```
