---
tags:
- AlphaChannel
- Image
---

# AlphaChanelAsMask
## Documentation
- Class name: `AlphaChanelAsMask`
- Category: `image/alpha`
- Output node: `False`

The AlphaChanelAsMask node is designed for processing images to extract or invert their alpha channel, effectively transforming the alpha channel into a mask. This operation allows for the manipulation of image transparency in a manner that can be customized through the method parameter, supporting both standard and inverted alpha channel extraction.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the input images for which the alpha channel is to be processed. It plays a crucial role in determining the transparency aspects of the image that are to be extracted or manipulated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`method`**
    - The 'method' parameter dictates the mode of alpha channel processing, allowing for either the standard extraction of the alpha channel or its inversion. This choice affects the resulting mask's representation of transparency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a mask derived from the alpha channel of the input images, which can either represent the direct alpha channel or its inverse, depending on the processing method chosen.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaChanelAsMask:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "method": (["default", "invert"],),
            },
        }

    RETURN_TYPES = ("MASK",)
    FUNCTION = "node"
    CATEGORY = "image/alpha"

    def node(self, images, method):
        if images[0, 0, 0].shape[0] != 4:
            raise ValueError("Alpha chanel not exist.")

        if method == "default":
            return (1.0 - images[0, :, :, 3],)
        elif method == "invert":
            return (images[0, :, :, 3],)
        else:
            raise ValueError("Unexpected method.")

```
