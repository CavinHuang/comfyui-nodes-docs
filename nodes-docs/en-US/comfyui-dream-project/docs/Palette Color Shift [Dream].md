---
tags:
- Color
---

# 🎨 Palette Color Shift
## Documentation
- Class name: `Palette Color Shift [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

This node applies a color shift to a given palette by adjusting the red, green, and blue color components according to specified multipliers, optionally maintaining a fixed brightness level. It enables the customization of color palettes for images or visual elements, enhancing or altering their aesthetic appeal.
## Input types
### Required
- **`palette`**
    - The input palette to be modified. It represents a collection of colors that will undergo adjustments based on the provided multipliers.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `Tuple[RGBPalette]`
- **`red_multiplier`**
    - A multiplier for the red component of each color in the palette, allowing for the intensification or reduction of red hues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`green_multiplier`**
    - A multiplier for the green component of each color in the palette, enabling the adjustment of green hues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blue_multiplier`**
    - A multiplier for the blue component of each color in the palette, facilitating the modification of blue hues.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fixed_brightness`**
    - Determines whether the brightness level of the palette should remain constant despite the color shifts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`palette`**
    - Comfy dtype: `RGB_PALETTE`
    - The modified palette after applying the specified red, green, and blue multipliers, potentially with fixed brightness.
    - Python dtype: `Tuple[RGBPalette]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamColorShift:
    NODE_NAME = "Palette Color Shift"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.palette | {
                "red_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.1}),
                "green_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.1}),
                "blue_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.1}),
                "fixed_brightness": (["yes", "no"],),
            }
        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = (RGBPalette.ID,)
    RETURN_NAMES = ("palette",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, palette, red_multiplier, green_multiplier, blue_multiplier, fixed_brightness):
        results = list()

        def _limit(c):
            return max(min(c, 255), 0)

        for p in palette:
            new_pixels = list()
            for pixel in p:
                s = pixel[0] + pixel[1] + pixel[2]
                r = _limit(round(pixel[0] * red_multiplier))
                g = _limit(round(pixel[1] * green_multiplier))
                b = _limit(round(pixel[2] * blue_multiplier))
                if fixed_brightness == "yes":
                    brightness_factor = max(s, 1) / float(max(r + g + b, 1))
                    r = _limit(round(r * brightness_factor))
                    g = _limit(round(g * brightness_factor))
                    b = _limit(round(b * brightness_factor))

                new_pixels.append((r, g, b))
            results.append(RGBPalette(colors=new_pixels))
        return (tuple(results),)

```
