
# Documentation
- Class name: `Compare Palettes [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

Compare Palettes节点旨在通过计算两个调色板之间的亮度、对比度和RGB颜色强度的平均乘数来比较它们。这种比较为两个调色板之间的色彩特征差异提供了定量度量。

# Input types
## Required
- a
    - 要比较的第一个RGB调色板。它作为与第二个调色板比较的基准。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID
- b
    - 要与第一个调色板进行比较的第二个RGB调色板。这种比较会产生乘数，指示第二个调色板相对于第一个调色板的亮度、对比度或颜色差异程度。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: RGBPalette.ID

# Output types
- brightness_multiplier
    - 两个调色板之间亮度差异的平均乘数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast_multiplier
    - 两个调色板之间对比度差异的平均乘数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- red_multiplier
    - 两个调色板之间红色强度差异的平均乘数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- green_multiplier
    - 两个调色板之间绿色强度差异的平均乘数。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
