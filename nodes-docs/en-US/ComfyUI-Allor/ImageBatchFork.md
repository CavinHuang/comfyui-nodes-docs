---
tags:
- Batch
- Image
- ImageBatch
---

# ImageBatchFork
## Documentation
- Class name: `ImageBatchFork`
- Category: `image/batch`
- Output node: `False`

The ImageBatchFork node is designed to split a batch of images into two separate batches based on a specified priority. This functionality is useful for processing or handling images in batches where the division of the batch is critical to the workflow or algorithm.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the batch of images to be split. It is crucial for determining the structure of the output batches.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`priority`**
    - The 'priority' parameter dictates which of the two resulting batches should potentially contain an extra image when the original batch size is odd. This affects the distribution of images between the two batches.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output consists of two separate batches of images, divided according to the specified priority.
    - Python dtype: `Tuple[torch.Tensor, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchFork:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "priority": (["first", "second"],),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, priority):
        batch = images.shape[0]

        if batch == 1:
            return images, images
        elif batch % 2 == 0:
            first = batch // 2
            second = batch // 2
        else:
            if priority == "first":
                first = batch // 2 + 1
                second = batch // 2
            elif priority == "second":
                first = batch // 2
                second = batch // 2 + 1
            else:
                raise ValueError("Not existing priority.")

        return images[:first], images[-second:]

```
