---
tags:
- Image
- TextOnImage
---

# ImageTextMultilineOutlined
## Documentation
- Class name: `ImageTextMultilineOutlined`
- Category: `image/draw`
- Output node: `False`

The ImageTextMultilineOutlined node is designed for creating text images with support for multiple lines and outlined text. It allows for detailed customization of text appearance, including font selection, alignment, size, color, and outline properties, as well as text positioning within the image.
## Input types
### Required
- **`text`**
    - The text parameter allows for input of multiline text to be rendered on the image. It supports the inclusion of newline characters to separate text into multiple lines, enabling the creation of text blocks or paragraphs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - The font parameter specifies the font style to be used for the text. It selects from a list of available fonts, allowing for aesthetic customization of the text appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`align`**
    - The align parameter determines the horizontal alignment of the text within the image. It supports options such as 'left', 'center', and 'right', enabling the text to be positioned according to design requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`size`**
    - The size parameter controls the font size of the text, allowing for adjustment of the text's visual prominence and readability within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - The red parameter specifies the red component of the text color, enabling customization of the text's color appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green parameter specifies the green component of the text color, contributing to the customization of the text's overall color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue parameter specifies the blue component of the text color, allowing for fine-tuning of the text's visual color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_size`**
    - The outline_size parameter specifies the thickness of the text's outline, allowing for enhanced visibility and aesthetic customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The outline_red parameter defines the red component of the text's outline color, enabling further customization of the text's outlined appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The outline_green parameter defines the green component of the text's outline color, contributing to the customization of the outline's overall color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The outline_blue parameter defines the blue component of the text's outline color, allowing for detailed customization of the outline's visual appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha parameter controls the opacity of the text, enabling the text to be rendered with varying levels of transparency.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`margin_x`**
    - The margin_x parameter specifies the horizontal margin around the text, affecting the text's positioning relative to the image edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`margin_y`**
    - The margin_y parameter specifies the vertical margin around the text, impacting the vertical spacing and positioning of the text within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image output type represents the generated image with the rendered text, including any specified outlines and customizations.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageTextMultilineOutlined:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": True}),
                "font": (folder_paths.get_filename_list("fonts"),),
                "align": (["left", "center", "right"],),
                "size": ("INT", {
                    "default": 28,
                    "min": 1,
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
                "alpha": ("FLOAT", {
                    "default": 1.0,
                    "max": 1.0,
                    "step": 0.01
                }),
                "margin_x": ("INT", {
                    "default": 0,
                    "step": 1
                }),
                "margin_y": ("INT", {
                    "default": 0,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/draw"

    def node(
            self, text, font, align, size, red, green, blue, outline_size, outline_red, outline_green, outline_blue,
            alpha, margin_x, margin_y
    ):
        font_path = folder_paths.get_full_path("fonts", font)
        font = ImageFont.truetype(font_path, size, encoding="unic")

        lines = text.split('\n').__len__()
        (_, top, _, _) = font.getbbox(text)

        canvas = Image.new("RGBA", (0, 0))
        draw = ImageDraw.Draw(canvas)
        text_size = draw.multiline_textbbox((0, 0), text, font)

        canvas = Image.new("RGBA", (
            text_size[2] + (margin_x + outline_size) * 2,
            text_size[3] - top + (margin_y + (outline_size * lines)) * 2
        ), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)

        draw.text(
            (margin_x + outline_size, margin_y + outline_size - top),
            text=text, fill=(red, green, blue, int(alpha * 255)),
            stroke_fill=(outline_red, outline_green, outline_blue, int(alpha * 255)),
            stroke_width=outline_size, font=font, align=align
        )

        return (canvas.image_to_tensor().unsqueeze(0),)

```
