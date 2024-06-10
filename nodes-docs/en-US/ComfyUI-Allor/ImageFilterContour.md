---
tags:
- Contour
- Image
---

# ImageFilterContour
## Documentation
- Class name: `ImageFilterContour`
- Category: `image/filter`
- Output node: `False`

The ImageFilterContour node applies a contour filter to images, enhancing edges to create a distinct outline effect. This node is designed for image processing tasks where the goal is to accentuate the boundaries and features of objects within an image.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the collection of images to which the contour filter will be applied. It is crucial for defining the input data that will undergo the transformation to highlight edges and features.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified version of the input images, where each image has been processed to emphasize its contours, making the edges and features more pronounced.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterContour:
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
        return applyImageFilter(images, ImageFilter.CONTOUR)

```
