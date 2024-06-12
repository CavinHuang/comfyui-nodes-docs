---
tags:
- ImageDrawing
---

# ImageDrawRectangleByContainer
## Documentation
- Class name: `ImageDrawRectangleByContainer`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw rectangles within a specified container, allowing for precise control over the rectangle's dimensions and styling. It enables the creation of graphical elements within images by specifying start and end points, as well as color and style attributes.
## Input types
### Required
- **`container`**
    - The container within which the rectangle will be drawn, defining the boundary and context for the drawing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`start_x`**
    - The starting x-coordinate for the rectangle, marking the beginning of the rectangle's horizontal boundary.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - The starting y-coordinate for the rectangle, marking the beginning of the rectangle's vertical boundary.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - The ending x-coordinate for the rectangle, defining the end of the rectangle's horizontal boundary.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - The ending y-coordinate for the rectangle, defining the end of the rectangle's vertical boundary.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`outline_size`**
    - Specifies the thickness of the rectangle's outline, allowing for customization of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The red component of the outline's color, contributing to the overall color of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The green component of the outline's color, contributing to the overall color of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The blue component of the outline's color, contributing to the overall color of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - The alpha (transparency) component of the outline's color, allowing for transparency effects in the rectangle's border.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fill_red`**
    - The red component of the rectangle's fill color, determining the primary color inside the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - The green component of the rectangle's fill color, determining the primary color inside the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - The blue component of the rectangle's fill color, determining the primary color inside the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - The alpha (transparency) component of the rectangle's fill color, allowing for transparency effects inside the rectangle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Specifies the Super Sampling Anti-Aliasing factor to enhance the image quality by reducing the aliasing effects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Defines the method used for drawing operations, affecting the rendering quality and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image with the rectangle drawn within the specified container, reflecting all specified styling and dimensions.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawRectangleByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "start_x": ("FLOAT", {
                    "default": 0.1,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.2,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 0.9,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 0.8,
                    "max": 1.0,
                    "step": 0.01
                }),
                "outline_size": ("INT", {
                    "default": 1,
                    "step": 1
                }),
                "outline_red": ("INT", {
                    "default": 0,
                    "max": 255,
                    "step": 1
                }),
                "outline_green": ("INT", {
                    "default": 0,
                    "max": 255,
                    "step": 1
                }),
                "outline_blue": ("INT", {
                    "default": 0,
                    "max": 255,
                    "step": 1
                }),
                "outline_alpha": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "fill_red": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "fill_green": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "fill_blue": ("INT", {
                    "default": 255,
                    "max": 255,
                    "step": 1
                }),
                "fill_alpha": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "SSAA": ("INT", {
                    "default": 4,
                    "min": 1,
                    "max": 16,
                    "step": 1
                }),
                "method": (["lanczos", "bicubic", "hamming", "bilinear", "box", "nearest"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/draw"

    # noinspection PyPep8Naming
    def node(
            self,
            container,
            start_x,
            start_y,
            end_x,
            end_y,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            SSAA,
            method
    ):
        return ImageDrawRectangle().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            start_x,
            start_y,
            end_x,
            end_y,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            SSAA,
            method
        )

```
