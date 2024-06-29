---
tags:
- Batch
- Image
- ImageBatch
---

# Batch Average Un-Jittered
## Documentation
- Class name: `BatchAverageUnJittered`
- Category: `image/filters/jitter`
- Output node: `False`

This node is designed to process a batch of images by applying an averaging or median operation to reduce jittering effects. It operates on sub-batches of images, applying the specified operation to create a smoother, more stable output image.
## Input types
### Required
- **`images`**
    - The batch of images to be processed. This input is crucial for determining the set of images on which the averaging or median operation will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`operation`**
    - Specifies the operation ('mean' or 'median') to be applied across the images. This choice affects the method of jitter reduction and the final appearance of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed batch of images after applying the specified averaging or median operation to reduce jittering effects.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchAverageUnJittered:
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

    CATEGORY = "image/filters/jitter"

    def apply(self, images, operation):
        t = images.detach().clone()
        
        batch = []
        for i in range(t.shape[0] // 9):
            if operation == "mean":
                batch.append(torch.mean(t[i*9:i*9+9], dim=0, keepdim=True))
            elif operation == "median":
                batch.append(torch.median(t[i*9:i*9+9], dim=0, keepdim=True)[0])
        
        return (torch.cat(batch, dim=0),)

```
