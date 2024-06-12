---
tags:
- Image
- TextOnImage
---

# ImageTextOutlined
## Documentation
- Class name: `ImageTextOutlined`
- Category: `image/draw`
- Output node: `False`

The ImageTextOutlined node is designed for creating text images with outlined text. It allows for the customization of text appearance including font, size, color, and outline properties, as well as the positioning of the text within the image. This node is particularly useful for adding visually distinct and readable text to images for various applications such as graphic design, watermarking, or content creation.
## Input types
### Required
- **`text`**
    - The text to be rendered onto the image. This parameter is crucial as it defines the content of the generated image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - Specifies the font to be used for the text. This parameter influences the style and appearance of the text in the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`size`**
    - Determines the font size of the text, affecting its visibility and how it occupies space within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - The red component of the text color, allowing for color customization of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green component of the text color, enabling the adjustment of the text's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue component of the text color, contributing to the customization of the text's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_size`**
    - Specifies the thickness of the text's outline, enhancing the text's visibility against complex backgrounds.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_red`**
    - The red component of the outline color, allowing for color customization of the outline.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_green`**
    - The green component of the outline color, enabling the adjustment of the outline's color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`outline_blue`**
    - The blue component of the outline color, contributing to the customization of the outline's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - Controls the opacity of the text, enabling the creation of semi-transparent text effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`margin_x`**
    - The horizontal margin from the edges of the image to the text, affecting the text's positioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`margin_y`**
    - The vertical margin from the edges of the image to the text, influencing the placement of the text within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image tensor with the specified text rendered onto it, including the outlined effect around the text.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTextOutlined:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"multiline": False}),
                "font": (folder_paths.get_filename_list("fonts"),),
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
            self, text, font, size, red, green, blue, outline_size, outline_red, outline_green, outline_blue, alpha,
            margin_x, margin_y
    ):
        font_path = folder_paths.get_full_path("fonts", font)
        font = ImageFont.truetype(font_path, size, encoding="unic")

        (left, top, right, bottom) = font.getbbox(text)

        canvas = Image.new("RGBA", (
            right + (margin_x + outline_size) * 2,
            bottom - top + (margin_y + outline_size) * 2
        ), (0, 0, 0, 0))

        draw = ImageDraw.Draw(canvas)

        draw.text(
            (margin_x + outline_size, margin_y + outline_size - top),
            text=text, fill=(red, green, blue, int(alpha * 255)),
            stroke_fill=(outline_red, outline_green, outline_blue, int(alpha * 255)),
            stroke_width=outline_size, font=font
        )

        return (canvas.image_to_tensor().unsqueeze(0),)

```
