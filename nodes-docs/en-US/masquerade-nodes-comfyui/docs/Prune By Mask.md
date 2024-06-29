---
tags:
- Mask
---

# Prune By Mask
## Documentation
- Class name: `Prune By Mask`
- Category: `Masquerade Nodes`
- Output node: `False`

The Prune By Mask node is designed to filter out images from a batch based on the associated mask's average pixel value, ensuring only images with sufficiently defined masks are processed further.
## Input types
### Required
- **`image`**
    - The image input represents the batch of images to be filtered based on their associated mask's average pixel value.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask input is used to determine which images in the batch meet the criteria for having an average pixel value of at least 0.5, acting as a filter criterion.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output consists of the filtered batch of images that have passed the mask's average pixel value criterion.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PruneByMask:
    """
    Filters out the images in a batch that don't have an associated mask with an average pixel value of at least 0.5.
    """
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "prune"

    CATEGORY = "Masquerade Nodes"

    def prune(self, image, mask):
        mask = tensor2mask(mask)

        mean = torch.mean(torch.mean(mask,dim=2),dim=1)
        return (image[mean >= 0.5],)

```
