---
tags:
- Color
---

# Image Color Palette
## Documentation
- Class name: `Image Color Palette`
- Category: `WAS Suite/Image/Analyze`
- Output node: `False`

The Image Color Palette node is designed to generate color palettes from images. It utilizes various algorithms to analyze the colors within an image and produce a palette that represents the most significant or desired colors. This node can be used for tasks such as image analysis, enhancing visual content, or creating thematic color schemes based on images.
## Input types
### Required
- **`image`**
    - The input image from which the color palette will be generated. This image is analyzed to extract the dominant or specified colors to form the palette.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`colors`**
    - Specifies the number of colors to include in the generated palette. This parameter allows for customization of the palette's complexity and detail.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`mode`**
    - Determines the method used to generate the color palette, such as linear, brightness, tonal, or a combination of brightness and tonal. This affects how colors are selected and organized within the palette.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The visual representation of the generated color palette, typically displayed as an image. This output allows users to see the palette's colors in context.
    - Python dtype: `Image`
- **`color_palettes`**
    - Comfy dtype: `LIST`
    - The list of colors in the generated palette, usually provided in a specific format such as RGB or hexadecimal. This output is useful for applying the palette colors in various applications.
    - Python dtype: `list`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Color_Palette:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "colors": ("INT", {"default": 16, "min": 8, "max": 256, "step": 1}),
                "mode": (["Chart", "back_to_back"],),
            },
        }

    RETURN_TYPES = ("IMAGE","LIST")
    RETURN_NAMES = ("image","color_palettes")
    FUNCTION = "image_generate_palette"

    CATEGORY = "WAS Suite/Image/Analyze"

    def image_generate_palette(self, image, colors=16, mode="chart"):

        # WAS Filters
        WTools = WAS_Tools_Class()

        res_dir = os.path.join(WAS_SUITE_ROOT, 'res')
        font = os.path.join(res_dir, 'font.ttf')

        if not os.path.exists(font):
            font = None
        else:
            if mode == "Chart":
                cstr(f'Found font at `{font}`').msg.print()

        if len(image) > 1:
            palette_strings = []
            palette_images = []
            for img in image:
                img = tensor2pil(img)
                palette_image, palette = WTools.generate_palette(img, colors, 128, 10, font, 15, mode.lower())
                palette_images.append(pil2tensor(palette_image))
                palette_strings.append(palette)
            palette_images = torch.cat(palette_images, dim=0)
            return (palette_images, palette_strings)
        else:
            image = tensor2pil(image)
            palette_image, palette = WTools.generate_palette(image, colors, 128, 10, font, 15, mode.lower())
            return (pil2tensor(palette_image), [palette,])

```
