---
tags:
- ImageSize
- ImageTransformation
---

# Get Image Size
## Documentation
- Class name: `Get Image Size`
- Category: `Masquerade Nodes`
- Output node: `False`

This node is designed to determine the dimensions of an image, specifically its width and height, by analyzing the image's size attributes.
## Input types
### Required
- **`image`**
    - The image for which the size is to be determined. This input is crucial as it directly influences the output by providing the necessary data to calculate the image's dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width of the input image, calculated based on the image's size attributes.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the input image, calculated based on the image's size attributes.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)



## Source code
```python
class GetImageSize:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("INT","INT",)
    RETURN_NAMES = ("width", "height")
    FUNCTION = "get_size"

    CATEGORY = "Masquerade Nodes"

    def get_size(self, image):
        image_size = image.size()
        image_width = int(image_size[2])
        image_height = int(image_size[1])
        return (image_width, image_height,)

```
