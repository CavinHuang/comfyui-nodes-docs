---
tags:
- Image
- TextOnImage
---

# ImageTextMultiline
## Documentation
- Class name: `ImageTextMultiline`
- Category: `image/draw`
- Output node: `False`

The ImageTextMultiline node is designed to render multiline text onto an image canvas, allowing for customization of font, alignment, size, color, and margins. It supports the addition of outlines to text, enhancing visibility and aesthetic appeal.
## Input types
### Required
- **`text`**
    - The text parameter allows for multiline input, enabling the rendering of paragraphs or multiple lines of text on the image. It plays a crucial role in defining the content to be displayed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - Specifies the font to be used for the text, influencing the style and readability of the rendered text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`align`**
    - Determines the alignment of the text within the image, which can be left, center, or right, affecting the text's layout and presentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`size`**
    - Controls the font size of the text, directly impacting its visibility and how much space it occupies on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - Defines the red component of the text's color, contributing to the overall color composition of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - Defines the green component of the text's color, contributing to the overall color composition of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - Defines the blue component of the text's color, contributing to the overall color composition of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - Controls the opacity of the text, enabling the adjustment of text visibility and overlay effects.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`margin_x`**
    - Specifies the horizontal margin around the text, affecting the text's positioning within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`margin_y`**
    - Specifies the vertical margin around the text, affecting the text's positioning within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Returns an image tensor with the rendered text, ready for further processing or display.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageTextMultiline:
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

    def node(self, text, font, align, size, red, green, blue, alpha, margin_x, margin_y):
        outline_size = 0
        outline_red = 255
        outline_green = 255
        outline_blue = 255

        return ImageTextMultilineOutlined().node(
            text,
            font,
            align,
            size,
            red,
            green,
            blue,
            outline_size,
            outline_red,
            outline_green,
            outline_blue,
            alpha,
            margin_x,
            margin_y
        )

```
