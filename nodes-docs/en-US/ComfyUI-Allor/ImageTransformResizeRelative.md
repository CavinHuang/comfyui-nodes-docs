---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# ImageTransformResizeRelative
## Documentation
- Class name: `ImageTransformResizeRelative`
- Category: `image/transform`
- Output node: `False`

The ImageTransformResizeRelative node dynamically resizes images based on relative scale factors for width and height, allowing for flexible image transformations that maintain the aspect ratio or adjust the image size proportionally.
## Input types
### Required
- **`images`**
    - Specifies the images to be resized, serving as the primary input for the transformation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`scale_width`**
    - Determines the factor by which the width of the images will be scaled, affecting the overall size of the output images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_height`**
    - Determines the factor by which the height of the images will be scaled, affecting the overall size of the output images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`method`**
    - Specifies the interpolation method used for resizing, impacting the quality and characteristics of the resized images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces resized images according to the specified relative scale factors for width and height.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformResizeRelative:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "scale_width": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.1
                }),
                "scale_height": ("FLOAT", {
                    "default": 1.0,
                    "step": 0.1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, scale_width, scale_height, method):
        height, width = images[0, :, :, 0].shape

        width = int(width * scale_width)
        height = int(height * scale_height)

        return ImageTransformResizeAbsolute().node(images, width, height, method)

```
