---
tags:
- Color
---

# 📊 Analyze Palette
## Documentation
- Class name: `Analyze Palette [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

The 'Analyze Palette' node processes a palette to compute average metrics such as brightness, contrast, and color dominance (redness, greenness, blueness). It abstracts the color characteristics of the palette into numerical values that can be used for further image processing or analysis.
## Input types
### Required
- **`palette`**
    - The palette to be analyzed. It is a collection of colors from which the node calculates average brightness, contrast, and color dominance values.
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `Tuple[RGBPalette]`
## Output types
- **`brightness`**
    - Comfy dtype: `FLOAT`
    - The average brightness value of the analyzed palette.
    - Python dtype: `float`
- **`contrast`**
    - Comfy dtype: `FLOAT`
    - The average contrast value of the analyzed palette.
    - Python dtype: `float`
- **`redness`**
    - Comfy dtype: `FLOAT`
    - The average red dominance value of the analyzed palette.
    - Python dtype: `float`
- **`greenness`**
    - Comfy dtype: `FLOAT`
    - The average green dominance value of the analyzed palette.
    - Python dtype: `float`
- **`blueness`**
    - Comfy dtype: `FLOAT`
    - The average blue dominance value of the analyzed palette.
    - Python dtype: `float`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamAnalyzePalette:
    NODE_NAME = "Analyze Palette"
    ICON = "📊"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.palette
            ,
        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = ("FLOAT", "FLOAT", "FLOAT", "FLOAT", "FLOAT")
    RETURN_NAMES = ("brightness", "contrast", "redness", "greenness", "blueness")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, palette):
        f = 1.0 / len(palette)
        (w, c, r, g, b) = (0, 0, 0, 0, 0)
        for p in palette:
            (brightness, contrast, red, green, blue) = p.analyze()
            w += brightness
            c += contrast
            r += red
            g += green
            b += blue

        return w * f, c * f, r * f, g * f, b * f

```
