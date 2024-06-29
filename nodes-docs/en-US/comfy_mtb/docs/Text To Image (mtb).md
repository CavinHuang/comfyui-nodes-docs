---
tags:
- Image
- TextOnImage
---

# Text To Image (mtb)
## Documentation
- Class name: `Text To Image (mtb)`
- Category: `mtb/generate`
- Output node: `False`

The Text To Image node is designed to convert text into images using specified fonts. It searches for font files within a specified directory structure, supporting a variety of font formats, and allows for customization of the text appearance in the generated image. This node is useful for dynamically creating images from text for various applications, such as generating labels, captions, or visual representations of textual data.
## Input types
### Required
- **`text`**
    - The text string to be converted into an image. This parameter is crucial as it defines the content of the resulting image.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - Specifies the font to be used for the text in the image. This parameter allows for customization of the text's appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`wrap`**
    - Determines whether the text should wrap to fit within the specified width of the image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`trim`**
    - Indicates whether to trim whitespace around the text in the generated image.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`line_height`**
    - Adjusts the line height of the text, affecting how closely lines of text are spaced.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`font_size`**
    - Specifies the size of the font used for the text, directly influencing the text's appearance in the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The width of the generated image in pixels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the generated image in pixels.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color`**
    - Defines the color of the text in the image.
    - Comfy dtype: `COLOR`
    - Python dtype: `str`
- **`background`**
    - Specifies the background color of the image.
    - Comfy dtype: `COLOR`
    - Python dtype: `str`
- **`h_align`**
    - Horizontal alignment of the text within the image.
    - Comfy dtype: `['left', 'center', 'right']`
    - Python dtype: `str`
- **`v_align`**
    - Vertical alignment of the text within the image.
    - Comfy dtype: `['top', 'center', 'bottom']`
    - Python dtype: `str`
- **`h_offset`**
    - Horizontal offset of the text from its aligned position, allowing for fine-tuned positioning.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`v_offset`**
    - Vertical offset of the text from its aligned position, enabling precise control over the text's placement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`h_coverage`**
    - Percentage of the image width that the text is allowed to cover, affecting text wrapping and layout.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image generated from the provided text, incorporating the specified font, layout, and styling options.
    - Python dtype: `PIL.Image.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_TextToImage:
    """Utils to convert text to image using a font.

    The tool looks for any .ttf file in the Comfy folder hierarchy.
    """

    fonts = {}
    DESCRIPTION = """# Text to Image

This node look for any font files in comfy_dir/fonts.  
by default it fallsback to a default font.

![img](https://i.imgur.com/3GT92hy.gif)
"""

    def __init__(self):
        # - This is executed when the graph is executed,
        # - we could conditionaly reload fonts there
        pass

    @classmethod
    def CACHE_FONTS(cls):
        font_extensions = ["*.ttf", "*.otf", "*.woff", "*.woff2", "*.eot"]
        fonts = [font_path]

        for extension in font_extensions:
            try:
                if comfy_dir.exists():
                    fonts.extend(comfy_dir.glob(f"fonts/**/{extension}"))
                else:
                    log.warn(f"Directory {comfy_dir} does not exist.")
            except Exception as e:
                log.error(f"Error during font caching: {e}")

        for font in fonts:
            log.debug(f"Adding font {font}")
            MTB_TextToImage.fonts[font.stem] = font.as_posix()

    @classmethod
    def INPUT_TYPES(cls):
        if not cls.fonts:
            cls.CACHE_FONTS()
        else:
            log.debug(f"Using cached fonts (count: {len(cls.fonts)})")
        return {
            "required": {
                "text": (
                    "STRING",
                    {"default": "Hello world!"},
                ),
                "font": ((sorted(cls.fonts.keys())),),
                "wrap": ("BOOLEAN", {"default": True}),
                "trim": ("BOOLEAN", {"default": True}),
                "line_height": (
                    "FLOAT",
                    {"default": 1.0, "min": 0, "step": 0.1},
                ),
                "font_size": (
                    "INT",
                    {"default": 32, "min": 1, "max": 2500, "step": 1},
                ),
                "width": (
                    "INT",
                    {"default": 512, "min": 1, "max": 8096, "step": 1},
                ),
                "height": (
                    "INT",
                    {"default": 512, "min": 1, "max": 8096, "step": 1},
                ),
                "color": (
                    "COLOR",
                    {"default": "black"},
                ),
                "background": (
                    "COLOR",
                    {"default": "white"},
                ),
                "h_align": (("left", "center", "right"), {"default": "left"}),
                "v_align": (("top", "center", "bottom"), {"default": "top"}),
                "h_offset": (
                    "INT",
                    {"default": 0, "min": 0, "max": 8096, "step": 1},
                ),
                "v_offset": (
                    "INT",
                    {"default": 0, "min": 0, "max": 8096, "step": 1},
                ),
                "h_coverage": (
                    "INT",
                    {"default": 100, "min": 1, "max": 100, "step": 1},
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "text_to_image"
    CATEGORY = "mtb/generate"

    def text_to_image(
        self,
        text: str,
        font,
        wrap,
        trim,
        line_height,
        font_size,
        width,
        height,
        color,
        background,
        h_align="left",
        v_align="top",
        h_offset=0,
        v_offset=0,
        h_coverage=100,
    ):
        import textwrap

        from PIL import Image, ImageDraw, ImageFont

        font_path = self.fonts[font]

        text = (
            text.encode("ascii", "ignore").decode().strip() if trim else text
        )
        # Handle word wrapping
        if wrap:
            wrap_width = (((width / 100) * h_coverage) / font_size) * 2
            lines = textwrap.wrap(text, width=wrap_width)
        else:
            lines = [text]
        font = ImageFont.truetype(font_path, size=font_size)
        log.debug(f"Lines: {lines}")
        img = Image.new("RGBA", (width, height), background)
        draw = ImageDraw.Draw(img)

        line_height_px = line_height * font_size

        # Vertical alignment
        if v_align == "top":
            y_text = v_offset
        elif v_align == "center":
            y_text = ((height - (line_height_px * len(lines))) // 2) + v_offset
        else:  # bottom
            y_text = (height - (line_height_px * len(lines))) - v_offset

        def get_width(line):
            if hasattr(font, "getsize"):
                return font.getsize(line)[0]
            else:
                return font.getlength(line)

        # Draw each line of text
        for line in lines:
            line_width = get_width(line)
            # Horizontal alignment
            if h_align == "left":
                x_text = h_offset
            elif h_align == "center":
                x_text = ((width - line_width) // 2) + h_offset
            else:  # right
                x_text = (width - line_width) - h_offset

            draw.text((x_text, y_text), line, fill=color, font=font)
            y_text += line_height_px

        return (pil2tensor(img),)

```
