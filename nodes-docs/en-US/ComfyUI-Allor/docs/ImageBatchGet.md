---
tags:
- Batch
- Image
- ImageBatch
---

# ImageBatchGet
## Documentation
- Class name: `ImageBatchGet`
- Category: `image/batch`
- Output node: `False`

The `ImageBatchGet` node is designed for extracting a specific image from a batch of images based on a given index. It simplifies the process of handling image batches by allowing selective retrieval of images, which can be particularly useful in scenarios where only a subset of the batch is needed for further processing or analysis.
## Input types
### Required
- **`images`**
    - The `images` parameter represents the batch of images from which a specific image is to be retrieved. It plays a crucial role in determining the source of the image extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`index`**
    - The `index` parameter specifies the position of the image to be extracted from the batch. It is essential for pinpointing the exact image within the batch that is required for further operations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output is the extracted image from the specified index within the batch. It enables focused manipulation or analysis of individual images from a larger collection.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchGet:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "index": ("INT", {
                    "default": 1,
                    "min": 1,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, index):
        batch = images.shape[0]
        index = min(batch, index) - 1

        return (images[index].unsqueeze(0),)

```
