---
tags:
- ImageDrawing
---

# ImageDrawArcByContainer
## Documentation
- Class name: `ImageDrawArcByContainer`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw an arc on an image based on the specifications provided within a container. It leverages the dimensions and properties of the container to accurately render the arc, incorporating parameters such as size, start and end points, color, and drawing method to customize the output.
## Input types
### Required
- **`container`**
    - The container input specifies the image on which the arc will be drawn, providing essential dimensions and properties for the drawing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`size`**
    - Defines the thickness of the arc to be drawn on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The x-coordinate of the starting point of the arc.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start_y`**
    - The y-coordinate of the starting point of the arc.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_x`**
    - The x-coordinate of the ending point of the arc.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_y`**
    - The y-coordinate of the ending point of the arc.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start`**
    - The starting angle of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`end`**
    - The ending angle of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`red`**
    - The red component of the color of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green component of the color of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue component of the color of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) level of the arc's color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`SSAA`**
    - Specifies the level of supersampling anti-aliasing (SSAA) applied to the arc, enhancing the visual quality.
    - Comfy dtype: `INT`
    - Python dtype: `bool`
- **`method`**
    - The method used for drawing the arc, affecting the rendering technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image with the specified arc drawn on it, reflecting the input parameters and modifications.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawArcByContainer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "container": ("IMAGE",),
                "size": ("INT", {
                    "default": 1,
                    "min": 1,
                    "step": 1
                }),
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
                    "default": 180,
                    "max": 360,
                    "step": 1
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
    def node(self, container, size, start_x, start_y, end_x, end_y, start, end, red, green, blue, alpha, SSAA, method):
        return ImageDrawArc().node(
            container[0, :, :, 0].shape[1],
            container[0, :, :, 0].shape[0],
            size,
            start_x,
            start_y,
            end_x,
            end_y,
            start,
            end,
            red,
            green,
            blue,
            alpha,
            SSAA,
            method
        )

```
