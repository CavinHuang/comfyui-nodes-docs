---
tags:
- Counting
---

# Get Image Batch Count
## Documentation
- Class name: `JWImageBatchCount`
- Category: `jamesWalker55`
- Output node: `False`

This node calculates the total number of images in a given batch, providing a simple way to determine the size of an image batch.
## Input types
### Required
- **`images`**
    - The tensor containing a batch of images. It is crucial for determining the total count of images within the batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - The total number of images present in the input batch.
    - Python dtype: `int`
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
