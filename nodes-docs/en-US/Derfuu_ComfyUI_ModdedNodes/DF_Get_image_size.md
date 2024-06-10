---
tags:
- ImageSize
- ImageTransformation
---

# Get image size
## Documentation
- Class name: `DF_Get_image_size`
- Category: `Derfuu_Nodes/Functions`
- Output node: `False`

This node is designed to calculate and return the dimensions of an image, specifically its width and height. It abstracts the complexity of handling image data structures to provide a straightforward way to obtain image size information.
## Input types
### Required
- **`image`**
    - The 'image' parameter is crucial as it represents the image data from which the size will be determined. This parameter directly influences the node's ability to calculate and return the correct dimensions of the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`WIDTH`**
    - Comfy dtype: `INT`
    - Represents the width of the image in pixels.
    - Python dtype: `int`
- **`HEIGHT`**
    - Comfy dtype: `INT`
    - Represents the height of the image in pixels.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetImageSize:
    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": Field.image(),
            }
        }

    RETURN_TYPES = ("INT", "INT",)
    RETURN_NAMES = ("WIDTH", "HEIGHT")
    CATEGORY = TREE_FUNCTIONS

    FUNCTION = 'get_size'

    def get_size(self, image):
        size = sizes.get_image_size(image)
        return (size[0], size[1], )

```
