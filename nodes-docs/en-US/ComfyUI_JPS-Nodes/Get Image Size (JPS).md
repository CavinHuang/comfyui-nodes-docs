---
tags:
- ImageSize
- ImageTransformation
---

# Get Image Size (JPS)
## Documentation
- Class name: `Get Image Size (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

This node is designed to determine the dimensions of an image, specifically its width and height. It abstracts the process of analyzing an image's size, providing a straightforward way to obtain these fundamental attributes.
## Input types
### Required
- **`image`**
    - The image for which the size needs to be determined. This input is crucial as it directly influences the output by providing the necessary data to calculate the image's dimensions.
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
- Common nodes: unknown


## Source code
```python
class Get_Image_Size:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("width", "height",)
    CATEGORY = "JPS Nodes/Image"

    FUNCTION = 'get_imagesize'

    def get_imagesize(self, image):
        samples = image.movedim(-1,1)
        size_w = samples.shape[3]
        size_h = samples.shape[2]

        return (size_w, size_h, )

```
