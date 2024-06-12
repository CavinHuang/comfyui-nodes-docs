---
tags:
- Image
- ImageTransformation
---

# ImageContainerInheritanceScale
## Documentation
- Class name: `ImageContainerInheritanceScale`
- Category: `image/container`
- Output node: `False`

This node is designed to scale images based on specified width and height scaling factors. It adjusts the dimensions of the input images and then applies additional image processing operations, such as color adjustments, through subsequent nodes.
## Input types
### Required
- **`images`**
    - The input images to be scaled. This parameter is crucial as it provides the raw data for the scaling operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`scale_width`**
    - The factor by which the width of the input images is to be scaled. This directly influences the resulting image width.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`scale_height`**
    - The factor by which the height of the input images is to be scaled. This directly influences the resulting image height.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`red`**
    - The red color component to be applied to the images. This affects the overall color balance of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green color component to be applied to the images. This affects the overall color balance of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue color component to be applied to the images. This affects the overall color balance of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) value to be applied to the images. This determines the opacity of the output images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`method`**
    - The method used for scaling and applying color adjustments. This parameter dictates the specific algorithm or technique used.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the node is an image or a set of images that have been scaled and had color adjustments applied according to the specified parameters.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageContainerInheritanceScale:
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
                "red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "alpha": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "method": (["single", "for_each"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/container"

    def node(self, images, scale_width, scale_height, red, green, blue, alpha, method):
        height, width = images[0, :, :, 0].shape

        width = int((width * scale_width) - width)
        height = int((height * scale_height) - height)

        return ImageContainerInheritanceAdd() \
            .node(images, width, height, red, green, blue, alpha, method)

```
