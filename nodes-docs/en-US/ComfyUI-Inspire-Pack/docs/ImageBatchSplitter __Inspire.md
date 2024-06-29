---
tags:
- Batch
- Image
- ImageSplitting
---

# Image Batch Splitter (Inspire)
## Documentation
- Class name: `ImageBatchSplitter __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The ImageBatchSplitter node is designed to split a batch of images into smaller batches or individual images, based on a specified split count. It can also pad the output with empty images if the requested split count exceeds the number of available images, ensuring the output always matches the requested size.
## Input types
### Required
- **`images`**
    - The collection of images to be split. This parameter is crucial for determining the subset of images to be processed and split according to the specified count.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`split_count`**
    - Specifies the number of splits or individual images to be extracted from the input batch. This count directly influences the size and composition of the output batches.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - A tuple of tensors, each representing a split batch or an individual image from the original input batch, potentially including padding with empty images to meet the requested split count.
    - Python dtype: `Tuple[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchSplitter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "images": ("IMAGE",),
                    "split_count": ("INT", {"default": 4, "min": 0, "max": 50, "step": 1}),
                    },
                }

    RETURN_TYPES = ByPassTypeTuple(("IMAGE", ))
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, images, split_count):
        cnt = min(split_count, len(images))
        res = [image.unsqueeze(0) for image in images[:cnt]]

        if split_count >= len(images):
            lack_cnt = split_count - cnt + 1  # including remained
            empty_image = empty_pil_tensor()
            for x in range(0, lack_cnt):
                res.append(empty_image)
        elif cnt < len(images):
            remained_cnt = len(images) - cnt
            remained_image = images[-remained_cnt:]
            res.append(remained_image)

        return tuple(res)

```
