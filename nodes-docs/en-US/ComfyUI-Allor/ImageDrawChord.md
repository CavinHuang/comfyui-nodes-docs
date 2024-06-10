---
tags:
- ImageDrawing
---

# ImageDrawChord
## Documentation
- Class name: `ImageDrawChord`
- Category: `image/draw`
- Output node: `False`

The ImageDrawChord node is designed for drawing chords on images. It leverages geometric and color parameters to render chords, which are segments of the circumference of a circle, onto a specified image canvas, enhancing image customization and manipulation capabilities.
## Input types
### Required
- **`width`**
    - Specifies the width of the image canvas where the chord will be drawn, determining the horizontal dimension of the drawing area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the image canvas where the chord will be drawn, determining the vertical dimension of the drawing area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size`**
    - Defines the thickness of the chord's outline, allowing for adjustable visual prominence within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The starting x-coordinate for the chord, marking one endpoint of the chord on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - The starting y-coordinate for the chord, marking one endpoint of the chord on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - The ending x-coordinate for the chord, marking the other endpoint of the chord on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - The ending y-coordinate for the chord, marking the other endpoint of the chord on the image canvas.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start`**
    - The starting angle of the chord in degrees, defining the beginning of the arc segment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end`**
    - The ending angle of the chord in degrees, defining the end of the arc segment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - The red color component of the chord, contributing to the chord's overall color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green color component of the chord, contributing to the chord's overall color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue color component of the chord, contributing to the chord's overall color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) component of the chord, allowing for adjustable opacity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Specifies the Super Sampling Anti-Aliasing factor, enhancing the chord's visual quality by reducing aliasing effects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Determines the resizing method used after drawing the chord, affecting the final image's visual quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image tensor with the drawn chord, showcasing the visual modification applied to the original image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawChord:
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
        draw.chord(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            start, end, (red, green, blue, int(alpha * 255)), size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
