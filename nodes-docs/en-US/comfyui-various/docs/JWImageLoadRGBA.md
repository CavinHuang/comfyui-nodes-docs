---
tags:
- Image
---

# Image Load RGBA
## Documentation
- Class name: `JWImageLoadRGBA`
- Category: `jamesWalker55`
- Output node: `False`

The JWImageLoadRGBA node is designed for loading images in RGBA format. It separates the image into its color components and the alpha channel, effectively creating a mask based on the alpha channel.
## Input types
### Required
- **`path`**
    - Specifies the file path to the image that needs to be loaded. It is crucial for locating and loading the image in RGBA format.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Represents the color components of the loaded image, excluding the alpha channel.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - Represents the inverted alpha channel of the image, serving as a mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
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
