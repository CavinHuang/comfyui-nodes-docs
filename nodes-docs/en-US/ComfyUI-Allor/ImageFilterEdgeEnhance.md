---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterEdgeEnhance
## Documentation
- Class name: `ImageFilterEdgeEnhance`
- Category: `image/filter`
- Output node: `False`

The node applies an edge enhancement filter to images, accentuating the edges to make the image details more pronounced.
## Input types
### Required
- **`images`**
    - The images to be processed with the edge enhancement filter. This input is crucial for defining the visual content that will undergo the enhancement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed images with enhanced edges, providing a visually sharper appearance.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterEdgeEnhance:
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
        return applyImageFilter(images, ImageFilter.EDGE_ENHANCE)

```
