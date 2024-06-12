---
tags:
- ImageSize
- ImageTransformation
---

# GetImageSize
## Documentation
- Class name: `GetImageSize`
- Category: `stability/image`
- Output node: `False`

This node is designed to determine the dimensions of an image, specifically its width and height, by analyzing the image's shape.
## Input types
### Required
- **`image`**
    - The image whose size is to be determined. This input is crucial for calculating the image's dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width of the input image, derived from its shape.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the input image, derived from its shape.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - Reroute



## Source code
```python
class GetImageSize:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("width", "height")

    FUNCTION = "get_size"

    CATEGORY = "stability/image"

    def get_size(self, image):
        _, height, width, _ = image.shape
        return (width, height)

```
