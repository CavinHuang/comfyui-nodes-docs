---
tags:
- ImageSize
- ImageTransformation
---

# 🔧 Get Image Size
## Documentation
- Class name: `GetImageSize+`
- Category: `essentials`
- Output node: `False`

This node is designed to determine the dimensions of an image, specifically its width and height. It abstracts the process of accessing and interpreting the image's shape to provide a straightforward way to obtain its size.
## Input types
### Required
- **`image`**
    - The image for which the size is to be determined. This parameter is essential for the node to execute its function of calculating the image's dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width of the input image, measured in pixels.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the input image, measured in pixels.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [EmptyLatentImage](../../Comfy/Nodes/EmptyLatentImage.md)



## Source code
```python
class GetImageSize:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("INT", "INT")
    RETURN_NAMES = ("width", "height")
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, image):
        return (image.shape[2], image.shape[1],)

```
