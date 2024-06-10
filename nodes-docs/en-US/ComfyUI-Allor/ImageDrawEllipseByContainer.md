---
tags:
- ImageDrawing
---

# ImageDrawEllipseByContainer
## Documentation
- Class name: `ImageDrawEllipseByContainer`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw ellipses within a specified container, leveraging parameters such as position, size, color, and anti-aliasing options to customize the appearance of the ellipse. It abstracts the complexity of drawing operations, providing a simplified interface for creating ellipses in images.
## Input types
### Required
- **`container`**
    - The container specifies the image or canvas area where the ellipse will be drawn. It determines the bounds and context of the drawing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`start_x`**
    - The starting x-coordinate for the ellipse, defining one axis of its bounding box.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - The starting y-coordinate for the ellipse, defining one axis of its bounding box.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - The ending x-coordinate for the ellipse, defining the opposite axis of its bounding box.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - The ending y-coordinate for the ellipse, defining the opposite axis of its bounding box.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`outline_size`**
    - Specifies the thickness of the ellipse's outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The red component of the ellipse's outline color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The green component of the ellipse's outline color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The blue component of the ellipse's outline color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - The alpha (transparency) component of the ellipse's outline color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`fill_red`**
    - The red component of the ellipse's fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - The green component of the ellipse's fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - The blue component of the ellipse's fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - The alpha (transparency) component of the ellipse's fill color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`SSAA`**
    - Super Sample Anti-Aliasing factor to improve the quality of the drawing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Specifies the drawing method or algorithm used for rendering the ellipse.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with the specified ellipse drawn within the container.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawEllipseByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "start_x": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 1.0,
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
        return ImageDrawEllipse().node(
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
