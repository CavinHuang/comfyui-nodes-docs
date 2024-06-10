---
tags:
- Image
---

# Concat Images (mtb)
## Documentation
- Class name: `Concat Images (mtb)`
- Category: `mtb/image`
- Output node: `False`

The Concat Images node is designed to merge multiple tensor representations of images into a single batch tensor. This operation is essential for processing multiple images simultaneously, optimizing computational efficiency and facilitating batch operations in image processing workflows.
## Input types
### Required
- **`reverse`**
    - Determines the order in which images are concatenated. When set to True, images are concatenated in reverse order; otherwise, they are concatenated in the order they are received.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a single tensor that combines all input images into one batch, preserving the original image data while adjusting the batch size to accommodate all images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_ConcatImages:
    """Add images to batch."""

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "concatenate_tensors"
    CATEGORY = "mtb/image"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"reverse": ("BOOLEAN", {"default": False})},
        }

    def concatenate_tensors(self, reverse, **kwargs):
        tensors = tuple(kwargs.values())
        batch_sizes = [tensor.size(0) for tensor in tensors]

        concatenated = torch.cat(tensors, dim=0)

        # Update the batch size in the concatenated tensor
        concatenated_size = list(concatenated.size())
        concatenated_size[0] = sum(batch_sizes)
        concatenated = concatenated.view(*concatenated_size)

        return (concatenated,)

```
