---
tags:
- Batch
- Image
- ImageBatch
---

# ImageBatchRemove
## Documentation
- Class name: `ImageBatchRemove`
- Category: `image/batch`
- Output node: `False`

The ImageBatchRemove node is designed for selectively removing an image from a batch based on its index. This functionality is crucial for operations where specific images need to be excluded from further processing, thereby enabling dynamic manipulation of image collections.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the batch of images from which one will be removed. It is essential for specifying the group of images subject to modification.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`index`**
    - The 'index' parameter determines the position of the image to be removed from the batch. It plays a critical role in identifying the specific image to exclude, ensuring precise manipulation of the image collection.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns a new batch of images with the specified image removed, facilitating the dynamic adjustment of image collections.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchRemove:
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
        index = min(batch, index - 1)

        return (torch.cat((images[:index], images[index + 1:]), dim=0),)

```
