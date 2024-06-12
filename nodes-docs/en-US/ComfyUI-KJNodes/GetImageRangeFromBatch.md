---
tags:
- Batch
- Image
- ImageBatch
---

# GetImageRangeFromBatch
## Documentation
- Class name: `GetImageRangeFromBatch`
- Category: `KJNodes/image`
- Output node: `False`

This node is designed to extract a specific range of images from a given batch based on a starting index and the number of frames desired. It facilitates selective processing or viewing of subsets within larger image collections.
## Input types
### Required
- **`images`**
    - The collection of images from which a range will be selected. This parameter is crucial for defining the subset of images to be processed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`start_index`**
    - The index at which to start the selection of images. This parameter determines the beginning of the image range to be extracted.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`num_frames`**
    - The number of images to include in the selected range, starting from the start_index. This defines the size of the output batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The selected range of images from the input batch, returned as a new batch of images.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetImageRangeFromBatch:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "imagesfrombatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Creates a new batch using images from the input,  
batch, starting from start_index.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
                 "start_index": ("INT", {"default": 0,"min": -1, "max": 4096, "step": 1}),
                 "num_frames": ("INT", {"default": 1,"min": 1, "max": 4096, "step": 1}),
        },
    } 
    
    def imagesfrombatch(self, images, start_index, num_frames):
        if start_index == -1:
            start_index = len(images) - num_frames
        if start_index < 0 or start_index >= len(images):
            raise ValueError("GetImageRangeFromBatch: Start index is out of range")
        end_index = start_index + num_frames
        if end_index > len(images):
            raise ValueError("GetImageRangeFromBatch: End index is out of range")
        chosen_images = images[start_index:end_index]
        return (chosen_images, )

```
