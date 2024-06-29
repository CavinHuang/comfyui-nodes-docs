---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterEmboss
## Documentation
- Class name: `ImageFilterEmboss`
- Category: `image/filter`
- Output node: `False`

The ImageFilterEmboss node applies an emboss filter to images, creating a three-dimensional effect by emphasizing edges and textures.
## Input types
### Required
- **`images`**
    - The images to apply the emboss filter on. This input is crucial for defining the visual content that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the transformed image with an embossed effect, enhancing its textures and edges.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterEmboss:
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
        return applyImageFilter(images, ImageFilter.EMBOSS)

```
