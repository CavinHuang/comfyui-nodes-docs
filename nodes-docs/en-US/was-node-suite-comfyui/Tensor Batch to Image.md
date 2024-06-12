---
tags:
- Batch
- Image
- ImageBatch
---

# Tensor Batch to Image
## Documentation
- Class name: `Tensor Batch to Image`
- Category: `WAS Suite/Latent/Transform`
- Output node: `False`

This node is designed to convert a batch of tensor images into a single tensor image based on a specified index. It facilitates the selection of a specific image from a batch for further processing or visualization.
## Input types
### Required
- **`images_batch`**
    - A batch of images represented as tensors. This input is crucial for selecting a specific image from the batch for conversion.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`batch_image_number`**
    - The index of the image within the batch to be converted into a tensor image. This parameter determines which image from the batch is selected for output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single tensor image selected from the input batch based on the specified index.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Tensor_Batch_to_Image:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_batch": ("IMAGE",),
                "batch_image_number": ("INT", {"default": 0, "min": 0, "max": 64, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "tensor_batch_to_image"

    CATEGORY = "WAS Suite/Latent/Transform"

    def tensor_batch_to_image(self, images_batch=[], batch_image_number=0):

        count = 0
        for _ in images_batch:
            if batch_image_number == count:
                return (images_batch[batch_image_number].unsqueeze(0), )
            count = count+1

        cstr(f"Batch number `{batch_image_number}` is not defined, returning last image").error.print()
        return (images_batch[-1].unsqueeze(0), )

```
