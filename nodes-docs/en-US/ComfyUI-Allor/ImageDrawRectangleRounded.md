---
tags:
- ImageDrawing
---

# ImageDrawRectangleRounded
## Documentation
- Class name: `ImageDrawRectangleRounded`
- Category: `image/draw`
- Output node: `False`

This node is designed to draw rounded rectangles on images. It allows for detailed customization of the rectangle's appearance, including its size, border color, fill color, and corner radii, enabling the creation of visually appealing graphics with rounded corners.
## Input types
### Required
- **`width`**
    - The width of the canvas on which the rounded rectangle will be drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the canvas on which the rounded rectangle will be drawn.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_x`**
    - The x-coordinate of the rectangle's starting point, defining the rectangle's position along the x-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`start_y`**
    - The y-coordinate of the rectangle's starting point, defining the rectangle's position along the y-axis.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_x`**
    - The x-coordinate of the rectangle's end point, determining the width of the rectangle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`end_y`**
    - The y-coordinate of the rectangle's end point, determining the height of the rectangle.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`radius`**
    - The radius of the corners, specifying how rounded the corners should be.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_size`**
    - The thickness of the rectangle's outline, allowing for the customization of the border's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The red component of the outline's color, contributing to the overall color of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The green component of the outline's color, contributing to the overall color of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The blue component of the outline's color, contributing to the overall color of the rectangle's border.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_alpha`**
    - The alpha (transparency) value of the outline, allowing for the adjustment of the border's opacity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fill_red`**
    - The red component of the rectangle's fill color, determining the primary color inside the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_green`**
    - The green component of the rectangle's fill color, determining the primary color inside the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_blue`**
    - The blue component of the rectangle's fill color, determining the primary color inside the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_alpha`**
    - The alpha (transparency) value of the fill, allowing for the adjustment of the rectangle's interior opacity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`top_left_corner`**
    - A flag indicating whether the top left corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`top_right_corner`**
    - A flag indicating whether the top right corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`bottom_right_corner`**
    - A flag indicating whether the bottom right corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`bottom_left_corner`**
    - A flag indicating whether the bottom left corner should be rounded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`SSAA`**
    - Super Sample Anti-Aliasing factor to improve the drawing's quality by reducing aliasing effects.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`method`**
    - The method used for resizing the image, affecting the quality of the final output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the drawn rounded rectangle, showcasing the applied customizations.
    - Python dtype: `numpy.ndarray`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDrawRectangleRounded:
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
                    "default": 0.1,
                    "max": 1.0,
                    "step": 0.01
                }),
                "start_y": ("FLOAT", {
                    "default": 0.2,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_x": ("FLOAT", {
                    "default": 0.9,
                    "max": 1.0,
                    "step": 0.01
                }),
                "end_y": ("FLOAT", {
                    "default": 0.8,
                    "max": 1.0,
                    "step": 0.01
                }),
                "radius": ("INT", {
                    "default": 180,
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
                "top_left_corner": (["true", "false"],),
                "top_right_corner": (["true", "false"],),
                "bottom_right_corner": (["true", "false"],),
                "bottom_left_corner": (["true", "false"],),
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

    # noinspection PyPep8Naming, PyUnresolvedReferences, PyArgumentList
    def node(
            self,
            width,
            height,
            start_x,
            start_y,
            end_x,
            end_y,
            radius,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            outline_alpha,
            fill_red,
            fill_green,
            fill_blue,
            fill_alpha,
            top_left_corner,
            top_right_corner,
            bottom_right_corner,
            bottom_left_corner,
            SSAA,
            method
    ):
        canvas = Image.new("RGBA", (width * SSAA, height * SSAA), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)
        draw.rounded_rectangle(
            (
                (width * start_x * SSAA, height * start_y * SSAA),
                (width * end_x * SSAA, height * end_y * SSAA)
            ),
            radius * SSAA,
            (fill_red, fill_green, fill_blue, int(fill_alpha * 255)),
            (outline_red, outline_green, outline_blue, int(outline_alpha * 255)),
            outline_size * SSAA,
            corners=(
                True if top_left_corner == "true" else False,
                True if top_right_corner == "true" else False,
                True if bottom_right_corner == "true" else False,
                True if bottom_left_corner == "true" else False
            )
        )

        canvas = canvas.resize((width, height), get_sampler_by_name(method))

        return (canvas.image_to_tensor().unsqueeze(0),)

```
