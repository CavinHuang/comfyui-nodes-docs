---
tags:
- Batch
- Image
- ImageBatch
---

# Batch Average Image
## Documentation
- Class name: `BatchAverageImage`
- Category: `image/filters`
- Output node: `False`

The BatchAverageImage node applies statistical averaging operations, such as mean or median, across a batch of images. This process is used to create a single representative image from a collection, either by calculating the mean or median pixel values across all images in the batch.
## Input types
### Required
- **`images`**
    - The collection of images to be processed. This parameter is crucial for determining the input data over which the averaging operation will be performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`operation`**
    - Specifies the type of averaging operation to apply on the batch of images, such as 'mean' or 'median'. This choice directly influences the resulting output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the specified averaging operation across the input batch of images. It represents a statistical summary of the input batch.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchAverageImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "operation": (["mean", "median"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"

    CATEGORY = "image/filters"

    def apply(self, images, operation):
        t = images.detach().clone()
        if operation == "mean":
            return (torch.mean(t, dim=0, keepdim=True),)
        elif operation == "median":
            return (torch.median(t, dim=0, keepdim=True)[0],)
        return(t,)

```
