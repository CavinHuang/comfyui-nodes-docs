---
tags:
- Image
---

# Image Load RGB
## Documentation
- Class name: `JWImageLoadRGB`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to load an image from a specified path and convert it into an RGB format. It abstracts the complexities of image file handling and conversion, providing a straightforward way to work with image data in RGB format.
## Input types
### Required
- **`path`**
    - Specifies the file path of the image to be loaded. This parameter is crucial as it determines which image file the node will process and convert to RGB format.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is the image data converted into RGB format, ready for further processing or visualization.
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
