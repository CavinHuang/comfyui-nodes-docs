---
tags:
- Image
- ImageSave
---

# Image Save To Path
## Documentation
- Class name: `JWImageSaveToPath`
- Category: `jamesWalker55`
- Output node: `True`

This node is designed to save a single image to a specified path, optionally embedding additional metadata such as a prompt or other PNG-specific information within the image file.
## Input types
### Required
- **`path`**
    - Specifies the file system path where the image will be saved. This path determines the location and filename of the output image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`image`**
    - The image data to be saved. This tensor represents the image in a format that can be processed and saved to the specified path.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`overwrite`**
    - A flag indicating whether an existing file at the specified path should be overwritten. If set to 'true', the existing file will be replaced with the new image.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `str`
## Output types
The node doesn't have output types
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
