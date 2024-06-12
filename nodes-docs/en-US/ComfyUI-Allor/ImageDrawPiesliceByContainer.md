---
tags:
- ImageDrawing
---

# ImageDrawPiesliceByContainer
## Documentation
- Class name: `ImageDrawPiesliceByContainer`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw pie slice shapes on images within specified containers. It leverages the dimensions of the container to accurately position and scale the pie slice, allowing for detailed customization of the slice's appearance including its outline and fill colors, size, and angle.
## Input types
### Required
- **`container`**
    - The image container where the pie slice will be drawn. It defines the spatial context for the drawing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`start_x`**
    - The starting x-coordinate for the pie slice within the container.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start_y`**
    - The starting y-coordinate for the pie slice within the container.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_x`**
    - The ending x-coordinate for the pie slice, defining its width.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_y`**
    - The ending y-coordinate for the pie slice, defining its height.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start`**
    - The starting angle of the pie slice in degrees.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`end`**
    - The ending angle of the pie slice in degrees.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`outline_size`**
    - The thickness of the pie slice's outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The red component of the outline's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The green component of the outline's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The blue component of the outline's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - The alpha (transparency) component of the outline's color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`fill_red`**
    - The red component of the pie slice's fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - The green component of the pie slice's fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - The blue component of the pie slice's fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - The alpha (transparency) component of the pie slice's fill color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`SSAA`**
    - Super-sampling anti-aliasing factor for smoother edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for drawing the pie slice, affecting rendering quality and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified image container with the pie slice drawn onto it.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawPiesliceByContainer:
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
                "start": ("INT", {
                    "default": 0,
                    "max": 360,
                    "step": 1
                }),
                "end": ("INT", {
                    "default": 240,
                    "max": 360,
                    "step": 1
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
            start,
            end,
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
        return ImageDrawPieslice().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            start_x,
            start_y,
            end_x,
            end_y,
            start,
            end,
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
