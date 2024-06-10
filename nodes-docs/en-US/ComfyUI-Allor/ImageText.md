---
tags:
- Image
- TextOnImage
---

# ImageText
## Documentation
- Class name: `ImageText`
- Category: `image/draw`
- Output node: `False`

The ImageText node is designed for rendering text onto an image canvas, supporting customization of font, size, color, alignment, and margins. It allows for the creation of text-based images with specified styling and layout, including the option for outlined text.
## Input types
### Required
- **`text`**
    - The text to be rendered on the image. It defines the content of the image and is central to the node's operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - Specifies the font style to be used for the text, influencing the visual appearance of the rendered text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`size`**
    - The font size for the text, which determines the scale of the text relative to the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`red`**
    - The red color component of the text, part of the RGBA color model used to define the text color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`green`**
    - The green color component of the text, contributing to the RGBA color model for text color definition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`blue`**
    - The blue color component of the text, completing the RGB part of the text's color specification.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha`**
    - The alpha (transparency) component of the text and outline color, allowing for opacity adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`margin_x`**
    - The horizontal margin size, affecting the text's positioning from the left and right edges of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`margin_y`**
    - The vertical margin size, influencing the text's positioning from the top and bottom edges of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image tensor with the rendered text, ready for further processing or display.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageText:
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

    def node(self, text, font, size, red, green, blue, alpha, margin_x, margin_y):
        outline_size = 0
        outline_red = 255
        outline_green = 255
        outline_blue = 255

        return ImageTextOutlined().node(
            text,
            font,
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
