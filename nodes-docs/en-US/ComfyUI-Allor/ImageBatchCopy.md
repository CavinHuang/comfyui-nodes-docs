---
tags:
- Batch
- Image
- ImageDuplication
---

# ImageBatchCopy
## Documentation
- Class name: `ImageBatchCopy`
- Category: `image/batch`
- Output node: `False`

The ImageBatchCopy node is designed to duplicate a specific image within a batch of images a specified number of times. It focuses on manipulating image batches to adjust their composition by repeating selected images, thereby enhancing or diversifying the dataset for further processing or analysis.
## Input types
### Required
- **`images`**
    - Specifies the batch of images to be processed. This parameter is crucial for determining the source images from which one will be copied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`index`**
    - Indicates the position of the image within the batch to be copied. This parameter is essential for selecting the specific image to duplicate.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`quantity`**
    - Defines the number of times the selected image should be copied within the batch. This parameter directly influences the size of the output batch by increasing the number of images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns a new batch of images where the specified image has been copied a certain number of times, altering the batch's composition.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchCopy:
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
                "quantity": ("INT", {
                    "default": 1,
                    "min": 2,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, index, quantity):
        batch = images.shape[0]
        index = min(batch, index) - 1

        return (images[index].repeat(quantity, 1, 1, 1),)

```
