---
tags:
- Batch
- Image
- ImageBatch
---

# Image Extract From Batch
## Documentation
- Class name: `JWImageExtractFromBatch`
- Category: `jamesWalker55`
- Output node: `False`

This node extracts a single image from a batch of images based on the specified index, allowing for individual image processing or analysis.
## Input types
### Required
- **`images`**
    - The batch of images from which a single image will be extracted. It's crucial for selecting the specific image to process or analyze.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`index`**
    - The index of the image to be extracted from the batch. It determines which image is selected for extraction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The extracted single image from the specified index of the input batch.
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
