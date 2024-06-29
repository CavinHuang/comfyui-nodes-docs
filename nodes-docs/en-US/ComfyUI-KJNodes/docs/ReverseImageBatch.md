---
tags:
- Batch
- Image
- ImageBatch
---

# ReverseImageBatch
## Documentation
- Class name: `ReverseImageBatch`
- Category: `KJNodes/image`
- Output node: `False`

Reverses the order of images in a batch, providing a simple yet effective method for manipulating image sequences.
## Input types
### Required
- **`images`**
    - The batch of images to be reversed. This input is crucial for determining the order in which images will appear in the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The batch of images after being reversed in order. This output is essential for applications requiring a specific sequence of images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReverseImageBatch:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "reverseimagebatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Reverses the order of the images in a batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
        },
    } 
    
    def reverseimagebatch(self, images):
        reversed_images = torch.flip(images, [0])
        return (reversed_images, )

```
