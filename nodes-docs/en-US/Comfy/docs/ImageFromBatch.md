---
tags:
- Batch
- Image
- ImageBatch
---

# ImageFromBatch
## Documentation
- Class name: `ImageFromBatch`
- Category: `image/batch`
- Output node: `False`

The ImageFromBatch node is designed to extract a specific segment of images from a larger batch based on a given index and length. This functionality is crucial for operations that require processing or analyzing subsets of images within a batch, enabling targeted manipulation or inspection of images.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the batch of images from which a subset will be extracted. It is crucial for specifying the source batch.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`batch_index`**
    - The 'batch_index' parameter specifies the starting index within the batch from which the extraction begins, allowing for precise selection of the subset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`length`**
    - The 'length' parameter determines the number of images to extract from the specified starting index, enabling control over the size of the resulting subset.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a subset of images extracted from the original batch, based on the specified 'batch_index' and 'length'.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFromBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",),
                              "batch_index": ("INT", {"default": 0, "min": 0, "max": 4095}),
                              "length": ("INT", {"default": 1, "min": 1, "max": 4096}),
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "frombatch"

    CATEGORY = "image/batch"

    def frombatch(self, image, batch_index, length):
        s_in = image
        batch_index = min(s_in.shape[0] - 1, batch_index)
        length = min(s_in.shape[0] - batch_index, length)
        s = s_in[batch_index:batch_index + length].clone()
        return (s,)

```
