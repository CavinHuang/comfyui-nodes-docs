---
tags:
- ImageDrawing
---

# ImageDrawEllipse
## Documentation
- Class name: `ImageDrawEllipse`
- Category: `image/draw`
- Output node: `False`

The ImageDrawEllipse node is designed for drawing ellipses on images. It allows for customization of the ellipse's appearance, including its outline and fill colors, as well as its size and position on the canvas, leveraging supersampling anti-aliasing (SSAA) for higher quality rendering.
## Input types
### Required
- **`width`**
    - Specifies the width of the canvas on which the ellipse will be drawn, affecting the overall dimensions of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the canvas, influencing the vertical dimension of the image and the ellipse's potential size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - Specifies the starting x-coordinate of the ellipse on the image, playing a key role in defining the ellipse's position.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_y`**
    - Specifies the starting y-coordinate of the ellipse, crucial for positioning the ellipse on the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_x`**
    - Defines the ending x-coordinate of the ellipse, determining its width and contributing to its overall shape.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_y`**
    - Defines the ending y-coordinate of the ellipse, determining its height and contributing to its overall shape.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`outline_size`**
    - Determines the thickness of the ellipse's outline, affecting the visual prominence of the ellipse on the image.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`outline_red`**
    - Specifies the red component of the ellipse's outline color, contributing to the color customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - Specifies the green component of the ellipse's outline color, contributing to the color customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - Specifies the blue component of the ellipse's outline color, contributing to the color customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - Determines the opacity of the ellipse's outline, allowing for transparency effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fill_red`**
    - Specifies the red component of the ellipse's fill color, enabling color customization of the fill.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - Specifies the green component of the ellipse's fill color, enabling color customization of the fill.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - Specifies the blue component of the ellipse's fill color, enabling color customization of the fill.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - Determines the opacity of the ellipse's fill, allowing for transparency effects in the fill color.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`SSAA`**
    - Specifies the level of supersampling anti-aliasing (SSAA) applied, enhancing the quality of the ellipse's rendering.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - Defines the method used for resizing the image after drawing the ellipse, affecting the final image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns the image tensor with the drawn ellipse, showcasing the customized appearance as specified by the input parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawEllipse:
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
        draw.ellipse(
            [
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ],
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
