---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# ImageTransformResizeClip
## Documentation
- Class name: `ImageTransformResizeClip`
- Category: `image/transform`
- Output node: `False`

This node is designed to resize images within specified maximum and minimum dimensions, using various interpolation methods to maintain image quality. It dynamically calculates the scale to ensure the resized image adheres to the given constraints, offering a flexible approach to image resizing.
## Input types
### Required
- **`images`**
    - The collection of images to be resized. This parameter is crucial as it directly influences the output by determining which images undergo the resizing process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`max_width`**
    - The maximum width constraint for the resizing operation. It sets an upper limit on the width of the resized images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_height`**
    - The maximum height constraint for the resizing operation. It sets an upper limit on the height of the resized images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_width`**
    - The minimum width constraint for the resizing operation. It ensures that the resized images do not fall below this width.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`min_height`**
    - The minimum height constraint for the resizing operation. It ensures that the resized images do not fall below this height.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The interpolation method used for resizing. This affects the quality and the algorithm of the resizing process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized images, adjusted within the specified maximum and minimum dimensions.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformResizeClip:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "max_width": ("INT", {
                    "default": 1024,
                }),
                "max_height": ("INT", {
                    "default": 1024,
                }),
                "min_width": ("INT", {
                    "default": 0,
                }),
                "min_height": ("INT", {
                    "default": 0,
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, max_width, max_height, min_width, min_height, method):
        height, width = images[0, :, :, 0].shape

        if min_width >= max_width or min_height >= max_height:
            return (images,)

        scale_min = max(min_width / width, min_height / height)
        scale_max = min(max_width / width, max_height / height)

        scale = max(scale_min, scale_max)

        return ImageTransformResizeRelative().node(images, scale, scale, method)

```
