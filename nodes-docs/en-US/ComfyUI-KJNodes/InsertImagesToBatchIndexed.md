---
tags:
- Batch
- Image
- ImageBatch
---

# InsertImagesToBatchIndexed
## Documentation
- Class name: `InsertImagesToBatchIndexed`
- Category: `KJNodes/image`
- Output node: `False`

The node is designed to insert images at specified indices into an original batch of images, effectively modifying the original sequence by adding new images at the designated positions. This operation allows for dynamic manipulation of image batches, enabling the customization of image sequences for various applications.
## Input types
### Required
- **`original_images`**
    - Represents the original batch of images where new images will be inserted. It is crucial for defining the base sequence that will be modified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_to_insert`**
    - Specifies the images to be inserted into the original batch. This parameter is essential for determining which new images will be added to the sequence.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`indexes`**
    - A string of comma-separated indices indicating where in the original batch the new images should be inserted. This parameter dictates the positions at which the images will be added, affecting the final arrangement of the batch.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified batch of images after the insertion of new images at specified indices.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InsertImagesToBatchIndexed:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "insertimagesfrombatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Inserts images at the specified indices into the original image batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "original_images": ("IMAGE",),
                "images_to_insert": ("IMAGE",),
                "indexes": ("STRING", {"default": "0, 1, 2", "multiline": True}),
            },
        }
    
    def insertimagesfrombatch(self, original_images, images_to_insert, indexes):
        
        # Parse the indexes string into a list of integers
        index_list = [int(index.strip()) for index in indexes.split(',')]
        
        # Convert list of indices to a PyTorch tensor
        indices_tensor = torch.tensor(index_list, dtype=torch.long)
        
        # Ensure the images_to_insert is a tensor
        if not isinstance(images_to_insert, torch.Tensor):
            images_to_insert = torch.tensor(images_to_insert)
        
        # Insert the images at the specified indices
        for index, image in zip(indices_tensor, images_to_insert):
            original_images[index] = image
        
        return (original_images,)

```
