---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Image Resize by Longer Side
## Documentation
- Class name: `JWImageResizeByLongerSide`
- Category: `jamesWalker55`
- Output node: `False`

This node resizes an image by adjusting its longer side to a specified size, maintaining the aspect ratio, and allows for different interpolation methods to be applied during the resizing process.
## Input types
### Required
- **`image`**
    - The image to be resized. It's crucial for maintaining the visual content while adjusting the dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - The target size for the longer side of the image, which determines the new dimensions while preserving the aspect ratio.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation_mode`**
    - Specifies the method used for interpolating the pixels in the resized image, affecting the visual quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image with its longer side adjusted to the specified size, maintaining the original aspect ratio.
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
