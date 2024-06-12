---
tags:
- ImageDrawing
---

# ImageDrawChordByContainer
## Documentation
- Class name: `ImageDrawChordByContainer`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw a chord within a specified container image, utilizing parameters such as size, start and end coordinates, color, and drawing method to define the chord's appearance.
## Input types
### Required
- **`container`**
    - The container image within which the chord will be drawn. It serves as the canvas for the drawing operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`size`**
    - Specifies the size of the chord to be drawn within the container.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The starting x-coordinate for the chord within the container.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start_y`**
    - The starting y-coordinate for the chord within the container.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_x`**
    - The ending x-coordinate for the chord within the container.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_y`**
    - The ending y-coordinate for the chord within the container.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start`**
    - The starting angle of the chord in degrees.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`end`**
    - The ending angle of the chord in degrees.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`red`**
    - The red component of the chord's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green component of the chord's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue component of the chord's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) component of the chord's color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`SSAA`**
    - Specifies the Super Sampling Anti-Aliasing factor to improve the drawing's quality.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for drawing the chord, affecting the rendering technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image with the chord drawn within the specified container.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawChordByContainer:
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
        return ImageDrawChord().node(
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
