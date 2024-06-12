---
tags:
- ImageDrawing
---

# ImageDrawPieslice
## Documentation
- Class name: `ImageDrawPieslice`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw a pie slice shape on an image canvas, allowing for customization of the pie slice's dimensions, start and end angles, outline, and fill colors. It provides a way to visually represent portions of data or create graphical elements within an image.
## Input types
### Required
- **`width`**
    - Specifies the width of the image canvas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image canvas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The x-coordinate of the upper left corner of the bounding box of the pie slice.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - The y-coordinate of the upper left corner of the bounding box of the pie slice.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - The x-coordinate of the lower right corner of the bounding box of the pie slice.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - The y-coordinate of the lower right corner of the bounding box of the pie slice.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start`**
    - The starting angle of the pie slice, in degrees.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`end`**
    - The ending angle of the pie slice, in degrees.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`outline_size`**
    - The thickness of the pie slice's outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The red component of the outline color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The green component of the outline color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The blue component of the outline color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - The alpha (transparency) component of the outline color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fill_red`**
    - The red component of the fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - The green component of the fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - The blue component of the fill color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - The alpha (transparency) component of the fill color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Super Sampling Anti-Aliasing factor for higher quality rendering.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for resizing the image after drawing the pie slice.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image tensor with the drawn pie slice.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawPieslice:
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

    # noinspection PyPep8Naming, PyUnresolvedReferences
    def node(
            self,
            width,
            height,
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
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.pieslice(
            (
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ),
            start, end,
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
