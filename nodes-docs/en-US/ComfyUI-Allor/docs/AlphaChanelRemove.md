---
tags:
- AlphaChannel
- Image
---

# AlphaChanelRemove
## Documentation
- Class name: `AlphaChanelRemove`
- Category: `image/alpha`
- Output node: `False`

The AlphaChanelRemove node is designed to process images by removing their alpha channel. This operation simplifies image data for contexts where transparency is not required, effectively reducing the image's dimensionality for further processing or display.
## Input types
### Required
- **`images`**
    - The 'images' input represents the collection of images from which the alpha channel will be removed. This operation is crucial for preparing images for environments that do not support or require transparency.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified version of the input images with the alpha channel removed, reducing each image's channels from four to three.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaChanelRemove:
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
    CATEGORY = "image/alpha"

    def node(self, images):
        return (images[:, :, :, 0:3],)

```
