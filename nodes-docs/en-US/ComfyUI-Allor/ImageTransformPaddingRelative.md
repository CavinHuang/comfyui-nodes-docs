---
tags:
- Image
- ImagePadding
- ImageTransformation
---

# ImageTransformPaddingRelative
## Documentation
- Class name: `ImageTransformPaddingRelative`
- Category: `image/transform`
- Output node: `False`

This node applies relative padding to images based on specified scale factors for width and height, and a padding method. It dynamically calculates the amount of padding to add to each dimension of the images, allowing for flexible image transformations that maintain the aspect ratio.
## Input types
### Required
- **`images`**
    - The collection of images to which padding will be applied. This parameter is crucial for defining the input data that will undergo the transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`scale_width`**
    - A scale factor for determining the width of the padding relative to the original image width. It influences the final size of the padded image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_height`**
    - A scale factor for determining the height of the padding relative to the original image height. It influences the final size of the padded image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`method`**
    - The method used for padding (e.g., reflect, edge, constant), affecting the appearance of the padded areas.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The transformed images with added padding, maintaining the original aspect ratio while adjusting the overall dimensions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformPaddingRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale_width": ("FLOAT", {
                    "default": 0.25,
                    "step": 0.1,
                }),
                "scale_height": ("FLOAT", {
                    "default": 0.25,
                    "step": 0.1,
                }),
                "method": (["reflect", "edge", "constant"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, scale_width, scale_height, method):
        height, width = images[0, :, :, 0].shape

        add_width = int(width * scale_width)
        add_height = int(height * scale_height)

        return ImageTransformPaddingAbsolute().node(images, add_width, add_height, method)

```
