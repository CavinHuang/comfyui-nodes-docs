---
tags:
- Image
- ImageTransformation
---

# ImageCompositeAbsoluteByContainer
## Documentation
- Class name: `ImageCompositeAbsoluteByContainer`
- Category: `image/composite`
- Output node: `False`

This node is designed to composite two images within a specified container, adjusting their positions and sizes based on absolute coordinates. It leverages the container's dimensions to ensure the images fit perfectly, providing a flexible way to manage image layouts within predefined spatial constraints.
## Input types
### Required
- **`container`**
    - The container image within which the other images are to be composited. It defines the spatial boundaries for the composition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`images_a`**
    - The first image to be composited within the container.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`images_b`**
    - The second image to be composited within the container.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`images_a_x`**
    - The x-coordinate for the top-left corner of the first image within the container.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`images_a_y`**
    - The y-coordinate for the top-left corner of the first image within the container.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`images_b_x`**
    - The x-coordinate for the top-left corner of the second image within the container.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`images_b_y`**
    - The y-coordinate for the top-left corner of the second image within the container.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`background`**
    - Specifies which image (if any) should be treated as the background in the composition process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`method`**
    - The method used for compositing the images, which can affect the final appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The result of the compositing process, which is a single image combining the input images according to the specified parameters and method.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageCompositeAbsoluteByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "images_a_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_a_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_b_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "images_b_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "background": (["images_a", "images_b"],),
                "method": (["pair", "matrix"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/composite"

    def node(
            self,
            container,
            images_a,
            images_b,
            images_a_x,
            images_a_y,
            images_b_x,
            images_b_y,
            background,
            method
    ):
        return ImageCompositeAbsolute().node(
            images_a,
            images_b,
            images_a_x,
            images_a_y,
            images_b_x,
            images_b_y,
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            background,
            method
        )

```
