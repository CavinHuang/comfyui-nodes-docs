---
tags:
- ImageFilter
- VisualEffects
---

# ImageFilterEdgeEnhanceMore
## Documentation
- Class name: `ImageFilterEdgeEnhanceMore`
- Category: `image/filter`
- Output node: `False`

This node applies an edge enhancement filter to images, making edges within the images more pronounced. It is part of a suite of image filter nodes designed to modify and enhance the visual appearance of images by applying specific filter effects.
## Input types
### Required
- **`images`**
    - The images to which the edge enhancement filter will be applied. This input is crucial for defining the visual content that will undergo the enhancement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the enhanced images with more pronounced edges, resulting from the application of the edge enhancement filter.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterEdgeEnhanceMore:
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
        return applyImageFilter(images, ImageFilter.EDGE_ENHANCE_MORE)

```
