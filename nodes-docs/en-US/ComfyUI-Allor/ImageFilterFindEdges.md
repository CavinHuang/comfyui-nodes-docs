---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterFindEdges
## Documentation
- Class name: `ImageFilterFindEdges`
- Category: `image/filter`
- Output node: `False`

The ImageFilterFindEdges node applies an edge detection filter to a set of images, highlighting the edges within each image. This process enhances the visual distinction of boundaries and lines, making it easier to identify shapes and features.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the collection of images to which the edge detection filter will be applied. It is crucial for defining the input data that will undergo transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a set of images that have undergone edge detection filtering, with enhanced visibility of edges and lines.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterFindEdges:
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
        return applyImageFilter(images, ImageFilter.FIND_EDGES)

```
