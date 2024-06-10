---
tags:
- Batch
- Image
- ImageBatch
---

# ReplaceImagesInBatch
## Documentation
- Class name: `ReplaceImagesInBatch`
- Category: `KJNodes/image`
- Output node: `False`

This node is designed to replace a subset of images within a batch with a new set of images, starting from a specified index. It facilitates the modification of image batches by allowing selective replacement, thereby enabling dynamic content updates or corrections within a batch of images.
## Input types
### Required
- **`original_images`**
    - The batch of original images that will undergo replacement. This parameter is crucial as it provides the base content that will be modified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`replacement_images`**
    - The images that will replace a portion of the original batch, starting from the specified index. This parameter is essential for defining the new content to be introduced into the batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`start_index`**
    - The index within the original batch from which the replacement will begin. This parameter determines the starting point for modifications, allowing precise control over the update location.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified batch of images after the replacement operation, reflecting the updates or corrections made.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReplaceImagesInBatch:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "replace"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Replaces the images in a batch, starting from the specified start index,  
with the replacement images.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "original_images": ("IMAGE",),
                 "replacement_images": ("IMAGE",),
                 "start_index": ("INT", {"default": 1,"min": 0, "max": 4096, "step": 1}),
        },
    } 
    
    def replace(self, original_images, replacement_images, start_index):
        images = None
        if start_index >= len(original_images):
            raise ValueError("GetImageRangeFromBatch: Start index is out of range")
        end_index = start_index + len(replacement_images)
        if end_index > len(original_images):
            raise ValueError("GetImageRangeFromBatch: End index is out of range")
         # Create a copy of the original_images tensor
        original_images_copy = original_images.clone()
        original_images_copy[start_index:end_index] = replacement_images
        images = original_images_copy
        return (images, )

```
