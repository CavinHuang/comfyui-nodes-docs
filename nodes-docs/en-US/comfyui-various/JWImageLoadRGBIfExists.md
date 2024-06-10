---
tags:
- Image
---

# Image Load RGB If Exists
## Documentation
- Class name: `JWImageLoadRGBIfExists`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to load an RGB image from a specified path if it exists; otherwise, it returns a default image provided as input. It ensures that the operation is conditional based on the file's existence, facilitating flexible image handling in workflows where the presence of an image file cannot be guaranteed.
## Input types
### Required
- **`default`**
    - The default image to return if the specified path does not contain an image file. This allows for a fallback option, ensuring that the node's operation can proceed even in the absence of the target file.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`path`**
    - Specifies the file path of the image to be loaded. If the file does not exist, the node uses the default image provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded RGB image if the specified file exists, or the default image if it does not. This output facilitates subsequent image processing or analysis steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
@register_node("JWImageLoadRGBIfExists", "Image Load RGB If Exists")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "default": ("IMAGE",),
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str, default: torch.Tensor):
        assert isinstance(path, str)
        assert isinstance(default, torch.Tensor)

        if not os.path.exists(path):
            return (default,)

        img = load_image(path)
        return (img,)

    @classmethod
    def IS_CHANGED(cls, path: str, default: torch.Tensor):
        if os.path.exists(path):
            mtime = os.path.getmtime(path)
        else:
            mtime = None
        return (mtime, default.__hash__())

```
