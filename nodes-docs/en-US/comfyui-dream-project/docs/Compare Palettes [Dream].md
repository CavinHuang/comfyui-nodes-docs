---
tags:
- Color
---

# 📊 Compare Palettes
## Documentation
- Class name: `Compare Palettes [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

The 'Compare Palettes' node is designed to compare two color palettes by calculating the average multipliers for brightness, contrast, and RGB color intensities between them. This comparison provides a quantitative measure of the differences in color characteristics between the two palettes.
## Input types
### Required
- **`a`**
    - The first RGB palette to be compared. It serves as the baseline for comparison against the second palette.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
- **`b`**
    - The second RGB palette to be compared against the first. This comparison yields multipliers indicating how much brighter, more contrasted, or differently colored the second palette is relative to the first.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `RGBPalette.ID`
## Output types
- **`brightness_multiplier`**
    - Comfy dtype: `FLOAT`
    - The average multiplier for brightness differences between the two palettes.
    - Python dtype: `float`
- **`contrast_multiplier`**
    - Comfy dtype: `FLOAT`
    - The average multiplier for contrast differences between the two palettes.
    - Python dtype: `float`
- **`red_multiplier`**
    - Comfy dtype: `FLOAT`
    - The average multiplier for red color intensity differences between the two palettes.
    - Python dtype: `float`
- **`green_multiplier`**
    - Comfy dtype: `FLOAT`
    - The average multiplier for green color intensity differences between the two palettes.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamComparePalette:
    NODE_NAME = "Compare Palettes"
    ICON = "📊"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "a": (RGBPalette.ID,),
                "b": (RGBPalette.ID,),
            },
        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = ("FLOAT", "FLOAT", "FLOAT", "FLOAT")
    RETURN_NAMES = (
        "brightness_multiplier", "contrast_multiplier", "red_multiplier", "green_multiplier", "blue_multiplier")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, a, b):
        MIN_VALUE = 1 / 255.0

        brightness = list()
        contrasts = list()
        reds = list()
        greens = list()
        blues = list()

        for i in range(min(len(a), len(b))):
            (bright, ctr, red, green, blue) = a[i].analyze()
            (bright2, ctr2, red2, green2, blue2) = b[i].analyze()
            brightness.append(bright2 / max(MIN_VALUE, bright))
            contrasts.append(ctr2 / max(MIN_VALUE, ctr))
            reds.append(red2 / max(MIN_VALUE, red))
            greens.append(green2 / max(MIN_VALUE, green))
            blues.append(blue2 / max(MIN_VALUE, blue))

        n = len(brightness)

        return (sum(brightness) / n, sum(contrasts) / n, sum(reds) / n,
                sum(greens) / n, sum(blues) / n)

```
