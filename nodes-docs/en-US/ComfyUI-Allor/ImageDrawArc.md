---
tags:
- ImageDrawing
---

# ImageDrawArc
## Documentation
- Class name: `ImageDrawArc`
- Category: `image/draw`
- Output node: `False`

The ImageDrawArc node is designed for drawing arcs on images. It leverages parameters such as dimensions, color, and arc specifics to render arcs directly onto a given image canvas, facilitating the creation of graphical representations and annotations.
## Input types
### Required
- **`width`**
    - Specifies the width of the image canvas where the arc will be drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image canvas where the arc will be drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size`**
    - Determines the thickness of the arc line.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The starting x-coordinate for the arc on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - The starting y-coordinate for the arc on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - The ending x-coordinate for the arc on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - The ending y-coordinate for the arc on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start`**
    - The starting angle of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`end`**
    - The ending angle of the arc.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`red`**
    - The red component of the arc's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green component of the arc's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue component of the arc's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) component of the arc's color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Super Sampling Anti-Aliasing factor for higher quality rendering.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for resizing the image after drawing the arc, affecting the final image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the image tensor with the drawn arc.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawArc:
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(self, width, height, size, start_x, start_y, end_x, end_y, start, end, red, green, blue, alpha, SSAA, method):
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.arc(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            start, end, (red, green, blue, int(alpha * 255)), size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
