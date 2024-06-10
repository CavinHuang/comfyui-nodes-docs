---
tags:
- Batch
- Image
- ImageBatch
---

# ImageBatchPermute
## Documentation
- Class name: `ImageBatchPermute`
- Category: `image/batch`
- Output node: `False`

The ImageBatchPermute node is designed to reorder a batch of images according to a specified permutation. It allows for dynamic reorganization of image sequences, facilitating operations like shuffling or specific ordering for processing or visualization purposes.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the batch of images to be permuted. It is crucial for defining the set of images that will undergo reordering based on the permutation pattern.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`permute`**
    - The 'permute' parameter specifies the order in which the images in the batch should be arranged. It directly influences the final arrangement of the images, enabling custom sequences or shuffles.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_with_zero`**
    - The 'start_with_zero' parameter indicates whether the permutation indexing starts at zero. This affects how the permutation pattern is applied to the image batch, aligning with zero-based or one-based indexing conventions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a reordered batch of images, arranged according to the specified permutation pattern. It enables the dynamic reorganization of image sequences for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchPermute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "permute": ("STRING", {"multiline": False}),
                "start_with_zero": ("BOOLEAN",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, permute, start_with_zero):
        order = [int(num) - 1 if not start_with_zero else int(num) for num in re.findall(r'\d+', permute)]
        order = torch.tensor(order)
        order = order.clamp(0, images.shape[0] - 1)

        return (images.index_select(0, order),)

```
