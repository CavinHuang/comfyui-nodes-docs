---
tags:
- ImageDrawing
---

# ImageDrawLine
## Documentation
- Class name: `ImageDrawLine`
- Category: `image/draw`
- Output node: `False`

The ImageDrawLine node is designed to draw lines on images. It leverages the dimensions and color specifications provided to render a line between two points on an image, supporting customization through parameters like line thickness, color, and anti-aliasing settings.
## Input types
### Required
- **`width`**
    - Specifies the width of the image canvas, essential for determining the drawing area for the line.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image canvas, essential for determining the drawing area for the line.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size`**
    - Specifies the thickness of the line to be drawn, playing a significant role in the visual impact of the line on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The starting x-coordinate for the line, marking one end of the line on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - The starting y-coordinate for the line, working together with start_x to define the initial point of the line.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - The ending x-coordinate for the line, marking the other end of the line on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - The ending y-coordinate for the line, working together with end_x to define the terminal point of the line.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`red`**
    - The red color component of the line, contributing to the final color of the line drawn on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green color component of the line, contributing to the final color of the line drawn on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue color component of the line, contributing to the final color of the line drawn on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) component of the line's color, allowing for transparency effects in the line drawn on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Super Sampling Anti-Aliasing factor for the line, enhancing the visual quality of the line by reducing jagged edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for resizing the image after drawing the line, affecting the final appearance of the line.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified image with the line drawn on it, returned as a tensor.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawLine:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "height": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(self, width, height, size, start_x, start_y, end_x, end_y, red, green, blue, alpha, SSAA, method):
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.line(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            (red, green, blue, int(alpha * 255)), size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
