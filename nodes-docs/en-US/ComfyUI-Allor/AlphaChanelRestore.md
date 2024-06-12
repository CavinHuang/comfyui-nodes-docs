---
tags:
- AlphaChannel
- Image
---

# AlphaChanelRestore
## Documentation
- Class name: `AlphaChanelRestore`
- Category: `image/alpha`
- Output node: `False`

The AlphaChanelRestore node is designed to process images by ensuring they all have an alpha channel, effectively restoring or adding an alpha channel to images that lack one. This operation is crucial for maintaining consistency in image data, especially when working with image processing pipelines that require images to have a uniform number of channels.
## Input types
### Required
- **`images`**
    - The 'images' input represents the batch of images to be processed. It is essential for determining which images lack an alpha channel and subsequently adding one to ensure all images in the batch have four channels.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a batch of images with an alpha channel added where necessary, ensuring all images have four channels.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaChanelRestore:
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
        batch, height, width, channels = images.shape

        if channels != 4:
            return images

        tensor = images.clone().detach()

        tensor[:, :, :, 3] = torch.ones((batch, height, width))

        return (tensor,)

```
