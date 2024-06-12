---
tags:
- Color
---

# 🖼 Image Color Shift
## Documentation
- Class name: `Image Color Shift [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

This node is designed to adjust the color balance of an image by applying multipliers to the red, green, and blue color channels, allowing for fine-tuned color correction or creative color adjustments.
## Input types
### Required
- **`image`**
    - The input image to be color-shifted. It serves as the base for applying color adjustments.
    - Comfy dtype: `IMAGE`
    - Python dtype: `DreamImage`
- **`red_multiplier`**
    - A multiplier for the red channel, adjusting the intensity of red colors in the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`green_multiplier`**
    - A multiplier for the green channel, adjusting the intensity of green colors in the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blue_multiplier`**
    - A multiplier for the blue channel, adjusting the intensity of blue colors in the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after the color shift has been applied, reflecting the adjustments made to the color channels.
    - Python dtype: `DreamImage`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageColorShift:
    NODE_NAME = "Image Color Shift"
    ICON = "🖼"
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {"image": ("IMAGE",),
                         "red_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         "green_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         "blue_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0}),
                         },

        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, image, red_multiplier, green_multiplier, blue_multiplier):
        proc = DreamImageProcessor(inputs=image)

        def recolor(im: DreamImage, *a, **args):
            return (im.adjust_colors(red_multiplier, green_multiplier, blue_multiplier),)

        return proc.process(recolor)

```
