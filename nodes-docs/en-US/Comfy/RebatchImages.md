---
tags:
- Batch
- Image
---

# Rebatch Images
## Documentation
- Class name: `RebatchImages`
- Category: `image/batch`
- Output node: `False`

The RebatchImages node is designed to reorganize a batch of images into a new batch configuration, adjusting the batch size as specified. This process is essential for managing and optimizing the processing of image data in batch operations, ensuring that images are grouped according to the desired batch size for efficient handling.
## Input types
### Required
- **`images`**
    - A list of images to be rebatched. This parameter is crucial for determining the input data that will undergo the rebatching process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`batch_size`**
    - Specifies the desired size of the output batches. This parameter directly influences how the input images are grouped and processed, impacting the structure of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output consists of a list of image batches, reorganized according to the specified batch size. This allows for flexible and efficient processing of image data in batch operations.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageRebatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "images": ("IMAGE",),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, )

    FUNCTION = "rebatch"

    CATEGORY = "image/batch"

    def rebatch(self, images, batch_size):
        batch_size = batch_size[0]

        output_list = []
        all_images = []
        for img in images:
            for i in range(img.shape[0]):
                all_images.append(img[i:i+1])

        for i in range(0, len(all_images), batch_size):
            output_list.append(torch.cat(all_images[i:i+batch_size], dim=0))

        return (output_list,)

```
