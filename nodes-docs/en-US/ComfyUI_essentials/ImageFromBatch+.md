---
tags:
- Batch
- Image
- ImageBatch
---

# 🔧 Image From Batch
## Documentation
- Class name: `ImageFromBatch+`
- Category: `essentials`
- Output node: `False`

The `ImageFromBatch` node extracts a specific range of images from a batch based on the provided start index and length, allowing for selective processing or analysis of batched image data.
## Input types
### Required
- **`image`**
    - The batched image input from which a subset will be extracted. This parameter is crucial for specifying the source of the images to be processed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`start`**
    - Specifies the starting index within the batch from which images will be extracted. This parameter determines the beginning of the subset to be processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`length`**
    - Defines the number of images to extract from the specified starting index. This parameter controls the size of the subset to be processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The extracted subset of images from the original batch, based on the specified start index and length.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFromBatch:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE", ),
                "start": ("INT", { "default": 0, "min": 0, "step": 1, }),
                "length": ("INT", { "default": -1, "min": -1, "step": 1, }),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image, start, length):
        if length<0:
            length = image.shape[0]
        start = min(start, image.shape[0]-1)
        length = min(image.shape[0]-start, length)
        return (image[start:start + length], )

```
