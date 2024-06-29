---
tags:
- ImageDrawing
---

# ImageDrawPolygon
## Documentation
- Class name: `ImageDrawPolygon`
- Category: `image/draw`
- Output node: `False`

The ImageDrawPolygon node is designed for drawing regular polygons on an image canvas. It allows for customization of the polygon's size, number of sides, rotation, outline, and fill color, including alpha transparency. This node leverages supersampling for higher quality rendering and supports different resizing methods to adjust the final image size.
## Input types
### Required
- **`size`**
    - Specifies the size of the polygon to be drawn, affecting both its height and width.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sides`**
    - Determines the number of sides of the regular polygon, defining its shape.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rotation`**
    - Sets the rotation angle of the polygon in degrees, allowing for orientation adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`outline_size`**
    - Defines the thickness of the polygon's outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - Specifies the red component of the outline color, part of the RGBA color model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - Specifies the green component of the outline color, part of the RGBA color model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - Specifies the blue component of the outline color, part of the RGBA color model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - Determines the alpha transparency of the outline, allowing for semi-transparent effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fill_red`**
    - Specifies the red component of the fill color, part of the RGBA color model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - Specifies the green component of the fill color, part of the RGBA color model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - Specifies the blue component of the fill color, part of the RGBA color model.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - Determines the alpha transparency of the fill, allowing for semi-transparent effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Sets the supersampling anti-aliasing factor for higher quality rendering.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Chooses the method for resizing the image after drawing the polygon, affecting the final image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs the image tensor with the drawn polygon, ready for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawPolygon:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "size": ("INT", {
                    "default": 256,
                    "min": 1,
                    "step": 1
                }),
                "sides": ("INT", {
                    "default": 5,
                    "min": 3,
                    "step": 1
                }),
                "rotation": ("INT", {
                    "default": 0,
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
            size,
            sides,
            rotation,
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
        canvas = Image.new("RGBA", (size * SSAA, size * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.regular_polygon(
            (size * SSAA / 2, size * SSAA / 2, size * SSAA / 2),
            sides, rotation,
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            # TODO: Uncomment after the release of PIL 9.6.0
            # outline_size * SSAA
        )

        canvas = canvas.resize((size, size), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
