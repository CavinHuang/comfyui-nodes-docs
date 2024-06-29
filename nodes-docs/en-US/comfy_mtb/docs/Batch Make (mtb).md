---
tags:
- Batch
- Image
---

# Batch Make (mtb)
## Documentation
- Class name: `Batch Make (mtb)`
- Category: `mtb/batch`
- Output node: `False`

The MTB_BatchMake node is designed to create batches from individual data points or smaller batches, facilitating the processing of data in bulk. This node is essential for optimizing data handling and processing efficiency in machine learning workflows, especially when dealing with large datasets or when performing operations that benefit from batch processing.
## Input types
### Required
- **`image`**
    - This input type is used for specifying images that are to be batched together, playing a crucial role in the batch creation process for visual data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`count`**
    - The 'count' input type specifies the number of images or data points to include in each batch, directly affecting the size and composition of the created batches.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output type represents batches of images, ready for further processing or analysis in downstream tasks.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_BatchMake:
    """Simply duplicates the input frame as a batch"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "count": ("INT", {"default": 1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "generate_batch"
    CATEGORY = "mtb/batch"

    def generate_batch(self, image: torch.Tensor, count):
        if len(image.shape) == 3:
            image = image.unsqueeze(0)

        return (image.repeat(count, 1, 1, 1),)

```
