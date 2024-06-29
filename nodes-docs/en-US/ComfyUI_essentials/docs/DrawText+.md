---
tags:
- Image
- TextOnImage
---

# 🔧 Draw Text
## Documentation
- Class name: `DrawText+`
- Category: `essentials`
- Output node: `False`

The DrawText+ node is designed for rendering text onto images, allowing for customization of text appearance including font, size, color, and background. It supports text alignment and shadow effects, providing a versatile tool for image annotation and graphic design tasks.
## Input types
### Required
- **`text`**
    - The text to be rendered on the image. It's a crucial parameter as it defines the content of the annotation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - Specifies the font used to render the text, affecting the style and appearance of the text on the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`size`**
    - Determines the size of the text, impacting its visibility and how it occupies space within the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`color`**
    - The color of the text, defining its visual impact and how it contrasts with the image background.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`background_color`**
    - The color of the text background, which can enhance readability or aesthetic appeal depending on the image context.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`shadow_distance`**
    - The distance of the shadow from the text, adding depth and emphasis to the text rendering.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shadow_blur`**
    - Controls the blur intensity of the text shadow, affecting the softness and spread of the shadow effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shadow_color`**
    - The color of the shadow, which can add visual interest or improve text legibility.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`alignment`**
    - Determines the text alignment (left, center, right) within the specified area, influencing the layout and overall appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - The width of the area where the text is to be rendered, defining the text wrapping and layout constraints.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the area where the text is to be rendered, defining the vertical space available for the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image with the rendered text.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - A mask indicating the areas of the image occupied by the text, useful for further processing or compositing.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DrawText:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", { "multiline": True, "dynamicPrompts": True, "default": "Hello, World!" }),
                "font": ([f for f in os.listdir(FONTS_DIR) if f.endswith('.ttf') or f.endswith('.otf')], ),
                "size": ("INT", { "default": 56, "min": 1, "max": 9999, "step": 1 }),
                "color": ("STRING", { "multiline": False, "default": "#FFFFFF" }),
                "background_color": ("STRING", { "multiline": False, "default": "#00000000" }),
                "shadow_distance": ("INT", { "default": 0, "min": 0, "max": 100, "step": 1 }),
                "shadow_blur": ("INT", { "default": 0, "min": 0, "max": 100, "step": 1 }),
                "shadow_color": ("STRING", { "multiline": False, "default": "#000000" }),
                "alignment": (["left", "center", "right"],),
                "width": ("INT", { "default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1 }),
                "height": ("INT", { "default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1 }),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, text, font, size, color, background_color, shadow_distance, shadow_blur, shadow_color, alignment, width, height):
        font = ImageFont.truetype(os.path.join(FONTS_DIR, font), size)

        lines = text.split("\n")

        # Calculate the width and height of the text
        text_width = max(font.getbbox(line)[2] for line in lines)
        line_height = font.getmask(text).getbbox()[3] + font.getmetrics()[1]  # add descent to height
        text_height = line_height * len(lines)

        width = width if width > 0 else text_width
        height = height if height > 0 else text_height

        background_color = ImageColor.getrgb(background_color)
        image = Image.new('RGBA', (width + shadow_distance, height + shadow_distance), color=background_color)

        image_shadow = None
        if shadow_distance > 0:
            image_shadow = Image.new('RGBA', (width + shadow_distance, height + shadow_distance), color=background_color)

        for i, line in enumerate(lines):
            line_width = font.getbbox(line)[2]
            #text_height =font.getbbox(line)[3]
            if alignment == "left":
                x = 0
            elif alignment == "center":
                x = (width - line_width) / 2
            elif alignment == "right":
                x = width - line_width
            y = i * line_height

            draw = ImageDraw.Draw(image)
            draw.text((x, y), line, font=font, fill=color)

            if image_shadow is not None:
                draw = ImageDraw.Draw(image_shadow)
                draw.text((x + shadow_distance, y + shadow_distance), line, font=font, fill=shadow_color)

        if image_shadow is not None:
            image_shadow = image_shadow.filter(ImageFilter.GaussianBlur(shadow_blur))
            image = Image.alpha_composite(image_shadow, image)

        image = pb(T.ToTensor()(image).unsqueeze(0))
        mask = image[:, :, :, 3] if image.shape[3] == 4 else torch.ones_like(image[:, :, :, 0])

        return (image[:, :, :, :3], mask,)

```
