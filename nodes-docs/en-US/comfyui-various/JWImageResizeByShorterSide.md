---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Image Resize by Shorter Side
## Documentation
- Class name: `JWImageResizeByShorterSide`
- Category: `jamesWalker55`
- Output node: `False`

This node resizes an image by adjusting its shorter side to a specified size while maintaining the aspect ratio, using various interpolation methods for the resizing process.
## Input types
### Required
- **`image`**
    - The image tensor to be resized. It's crucial for defining the visual content that will undergo resizing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - The target size for the shorter side of the image, ensuring the aspect ratio is preserved during resizing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation_mode`**
    - Specifies the method used for interpolating the pixels in the resized image, affecting the visual quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image tensor, with its shorter side adjusted to the specified size while maintaining the original aspect ratio.
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
