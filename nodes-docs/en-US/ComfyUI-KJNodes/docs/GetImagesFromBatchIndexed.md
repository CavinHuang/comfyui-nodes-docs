---
tags:
- Batch
- Image
- ImageBatch
---

# GetImagesFromBatchIndexed
## Documentation
- Class name: `GetImagesFromBatchIndexed`
- Category: `KJNodes/image`
- Output node: `False`

This node is designed to selectively retrieve images from a given batch based on specified indices, effectively creating a new batch of images that only includes those at the given positions.
## Input types
### Required
- **`images`**
    - The batch of images from which to select. The indices determine which images are included in the output batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`indexes`**
    - A string specifying the indices of the images to select from the batch. This allows for flexible selection of images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The selected images at the specified indices, returned as a new batch.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetImagesFromBatchIndexed:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "indexedimagesfrombatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Selects and returns the images at the specified indices as an image batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
                 "indexes": ("STRING", {"default": "0, 1, 2", "multiline": True}),
        },
    } 
    
    def indexedimagesfrombatch(self, images, indexes):
        
        # Parse the indexes string into a list of integers
        index_list = [int(index.strip()) for index in indexes.split(',')]
        
        # Convert list of indices to a PyTorch tensor
        indices_tensor = torch.tensor(index_list, dtype=torch.long)
        
        # Select the images at the specified indices
        chosen_images = images[indices_tensor]
        
        return (chosen_images,)

```
