---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Image Resize to Square
## Documentation
- Class name: `JWImageResizeToSquare`
- Category: `jamesWalker55`
- Output node: `False`

This node resizes an input image to a specified square size, using a chosen interpolation method to adjust the image's dimensions while maintaining its aspect ratio.
## Input types
### Required
- **`image`**
    - The input image to be resized. It is crucial for defining the visual content that will undergo resizing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - Specifies the target size for both the width and height of the image, ensuring the output image is square.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation_mode`**
    - Determines the method used for resizing the image, affecting the quality and characteristics of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image, now transformed to the specified square dimensions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
