---
tags:
- Batch
- Image
- ImageBatch
---

# Make Image Batch
## Documentation
- Class name: `Make Image Batch`
- Category: `Masquerade Nodes`
- Output node: `False`

The Make Image Batch node is designed to aggregate multiple individual images or smaller batches of images into a larger batch. This functionality is crucial for processing multiple images in parallel, enhancing efficiency in batch operations.
## Input types
### Required
- **`image1`**
    - The primary image to start the batch. It is a required input that serves as the base to which additional images can be appended.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`image2`**
    - An optional image that can be appended to the initial image to form a larger batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image3`**
    - An optional image that can be appended to the growing batch, further increasing its size.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image4`**
    - An optional image that can be appended to the batch, contributing to the batch's expansion.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image5`**
    - An optional image that can be appended, further enlarging the batch size.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image6`**
    - An optional image that can be appended, maximizing the batch's capacity.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting larger batch of images, aggregated from the individual inputs.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MakeImageBatch:
    """
    Creates a batch of images from multiple individual images or batches.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image1": ("IMAGE",),
            },
            "optional": {
                "image2": ("IMAGE",),
                "image3": ("IMAGE",),
                "image4": ("IMAGE",),
                "image5": ("IMAGE",),
                "image6": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "append"

    CATEGORY = "Masquerade Nodes"

    def append(self, image1, image2 = None, image3 = None, image4 = None, image5 = None, image6 = None):
        result = image1
        if image2 is not None:
            result = torch.cat((result, image2), 0)
        if image3 is not None:
            result = torch.cat((result, image3), 0)
        if image4 is not None:
            result = torch.cat((result, image4), 0)
        if image5 is not None:
            result = torch.cat((result, image5), 0)
        if image6 is not None:
            result = torch.cat((result, image6), 0)
        return (result,)

```
