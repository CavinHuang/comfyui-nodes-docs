
# Documentation
- Class name: `Analyze Palette [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

"Analyze Palette"节点用于处理调色板，计算平均亮度、对比度以及颜色主导性（红色、绿色、蓝色）等指标。它将调色板的色彩特征抽象为数值，这些数值可用于进一步的图像处理或分析。

# Input types
## Required
- palette
    - 待分析的调色板。它是一组颜色的集合，节点将从中计算平均亮度、对比度和颜色主导性值。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: Tuple[RGBPalette]

# Output types
- brightness
    - 分析后的调色板的平均亮度值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 分析后的调色板的平均对比度值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- redness
    - 分析后的调色板的平均红色主导性值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- greenness
    - 分析后的调色板的平均绿色主导性值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blueness
    - 分析后的调色板的平均蓝色主导性值。
    - Comfy dtype: FLOAT
    - Python dtype: float


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
