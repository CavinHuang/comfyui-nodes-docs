---
tags:
- MaskInversion
---

# Invert Image
## Documentation
- Class name: `ImageInvert`
- Category: `image`
- Output node: `False`

The ImageInvert node is designed to invert the colors of an image, effectively transforming each pixel's color value to its complementary color on the color wheel. This operation is useful for creating negative images or for visual effects that require color inversion.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be inverted. It is crucial for specifying the target image whose colors are to be inverted, affecting the node's execution and the visual outcome of the inversion process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an inverted version of the input image, with each pixel's color value transformed to its complementary color.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - Reroute
    - ArithmeticBlend



## Source code
```python
class ImageInvert:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",)}}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "invert"

    CATEGORY = "image"

    def invert(self, image):
        s = 1.0 - image
        return (s,)

```
