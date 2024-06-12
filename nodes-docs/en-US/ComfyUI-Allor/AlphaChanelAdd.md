---
tags:
- AlphaChannel
- Image
---

# AlphaChanelAdd
## Documentation
- Class name: `AlphaChanelAdd`
- Category: `image/alpha`
- Output node: `False`

The AlphaChanelAdd node is designed to add an alpha channel to images that lack one, ensuring all images in a batch have four channels. This operation is crucial for maintaining consistency in image data, especially when working with image processing tasks that require an alpha channel for transparency or other effects.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the batch of images to which an alpha channel will be added. It is essential for the node's operation as it determines the input images that need modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a modified version of the input images, each with an added alpha channel, ensuring all images have four channels.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SplitImageWithAlpha](../../Comfy/Nodes/SplitImageWithAlpha.md)



## Source code
```python
class AlphaChanelAdd:
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

        if channels == 4:
            return images

        alpha = torch.ones((batch, height, width, 1))

        return (torch.cat((images, alpha), dim=-1),)

```
