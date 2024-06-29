---
tags:
- Image
- ImageSequence
---

# Load Images From String
## Documentation
- Class name: `JWLoadImagesFromString`
- Category: `jamesWalker55`
- Output node: `False`

This node is designed to load images directly from a string input, facilitating the conversion of textual image data into usable image formats for further processing or visualization.
## Input types
### Required
- **`paths`**
    - Accepts a list of file paths as strings, indicating the locations of images to be loaded. This input is crucial for identifying and accessing the images specified by the user.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`ignore_missing_images`**
    - A boolean flag that determines how to handle missing images specified in the 'paths'. If set to True, missing images will be ignored without causing errors; otherwise, an error will be raised for any missing image.
    - Comfy dtype: `['false', 'true']`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces an output image or a batch of images loaded from the specified file paths. This output is essential for further image processing or visualization tasks.
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
