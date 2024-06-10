---
tags:
- Batch
- Image
- ImageBatch
---

# ImageBatchJoin
## Documentation
- Class name: `ImageBatchJoin`
- Category: `image/batch`
- Output node: `False`

The ImageBatchJoin node is designed to concatenate two batches of images along the batch dimension, ensuring that the images in both batches have matching dimensions before joining. It provides a mechanism to combine image data from different sources or processing stages into a single batch for further processing or analysis.
## Input types
### Required
- **`images_a`**
    - The first batch of images to be concatenated. It's crucial that these images have the same dimensions as those in `images_b` to ensure a successful operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_b`**
    - The second batch of images to be concatenated with the first batch. The dimensions of these images must match those in `images_a` for the concatenation to proceed without errors.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The concatenated batch of images, combining `images_a` and `images_b` along the batch dimension.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchJoin:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images_a, images_b):
        height_a, width_a, channels_a = images_a[0].shape
        height_b, width_b, channels_b = images_b[0].shape

        if height_a != height_b:
            raise ValueError("Height of images_a not equals of images_b. You can use ImageTransformResize for fix it.")

        if width_a != width_b:
            raise ValueError("Width of images_a not equals of images_b. You can use ImageTransformResize for fix it.")

        if channels_a != channels_b:
            raise ValueError("Channels of images_a not equals of images_b. Your can add or delete alpha channels with AlphaChanel module.")

        return (torch.cat((images_a, images_b)),)

```
