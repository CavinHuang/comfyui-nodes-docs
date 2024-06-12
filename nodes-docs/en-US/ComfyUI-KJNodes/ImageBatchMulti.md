---
tags:
- Batch
- Image
- ImageBatch
---

# Image Batch Multi
## Documentation
- Class name: `ImageBatchMulti`
- Category: `KJNodes/image`
- Output node: `False`

Facilitates the creation of a batch of images by combining multiple input images into a single batch. This node allows for dynamic adjustment of the number of input images, supporting a flexible and scalable approach to batch image processing.
## Input types
### Required
- **`inputcount`**
    - Specifies the number of images to be included in the batch, allowing for dynamic adjustment of the batch size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_i`**
    - Represents any image to be included in the batch, starting from 'image_1' to 'image_{inputcount}'. Each 'image_i' is dynamically added based on the 'inputcount', contributing to the combined batch of images.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The combined batch of images resulting from the aggregation of individual input images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchMulti:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inputcount": ("INT", {"default": 2, "min": 2, "max": 1000, "step": 1}),
                "image_1": ("IMAGE", ),
                "image_2": ("IMAGE", ),
            },
    }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "combine"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Creates an image batch from multiple images.  
You can set how many inputs the node has,  
with the **inputcount** and clicking update.
"""

    def combine(self, inputcount, **kwargs):
        from nodes import ImageBatch
        image_batch_node = ImageBatch()
        image = kwargs["image_1"]
        for c in range(1, inputcount):
            new_image = kwargs[f"image_{c + 1}"]
            image, = image_batch_node.batch(new_image, image)
        return (image,)

```
