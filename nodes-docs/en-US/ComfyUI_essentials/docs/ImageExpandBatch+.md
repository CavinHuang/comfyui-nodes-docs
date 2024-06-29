---
tags:
- Batch
- Image
- ImageBatch
---

# 🔧 Image Expand Batch
## Documentation
- Class name: `ImageExpandBatch+`
- Category: `essentials`
- Output node: `False`

The ImageExpandBatch+ node is designed to expand the batch size of images, allowing for the inclusion of additional images into an existing batch. This functionality is crucial for operations that require batch processing of images, such as batch image transformations, augmentations, or processing in machine learning models.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image or images to be expanded into a larger batch. This parameter is crucial for defining the set of images that will undergo batch expansion.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size`**
    - The 'size' parameter specifies the desired size of the expanded batch, determining how many times the input images are replicated or how additional images are included.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The 'method' parameter defines the technique used for expanding the batch, such as replication of existing images or inclusion of new images, affecting the approach to batch expansion.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output 'image' parameter represents the expanded batch of images, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageExpandBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "size": ("INT", { "default": 16, "min": 1, "step": 1, }),
                "method": (["expand", "repeat all", "repeat first", "repeat last"],)
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, size, method):
        orig_size = image.shape[0]

        if orig_size == size:
            return (image,)

        if size <= 1:
            return (image[:size],)

        if 'expand' in method:
            out = torch.empty([size] + list(image.shape)[1:], dtype=image.dtype, device=image.device)
            if size < orig_size:
                scale = (orig_size - 1) / (size - 1)
                for i in range(size):
                    out[i] = image[min(round(i * scale), orig_size - 1)]
            else:
                scale = orig_size / size
                for i in range(size):
                    out[i] = image[min(math.floor((i + 0.5) * scale), orig_size - 1)]
        elif 'all' in method:
            out = image.repeat([math.ceil(size / image.shape[0])] + [1] * (len(image.shape) - 1))[:size]
        elif 'first' in method:
            if size < image.shape[0]:
                out = image[:size]
            else:
                out = torch.cat([image[:1].repeat(size-image.shape[0], 1, 1, 1), image], dim=0)
        elif 'last' in method:
            if size < image.shape[0]:
                out = image[:size]
            else:
                out = torch.cat((image, image[-1:].repeat((size-image.shape[0], 1, 1, 1))), dim=0)

        return (out,)

```
