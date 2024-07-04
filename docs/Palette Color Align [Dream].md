
# Documentation
- Class name: Palette Color Align [Dream]
- Category: ✨ Dream/🌄 image/🎨 color
- Output node: False

该节点旨在根据指定的对齐因子将给定调色板的颜色与目标调色板对齐。它调整原始调色板颜色的RGB值，使其更接近目标调色板的颜色，从而实现色彩方案的可控混合或匹配。

# Input types
## Required
- palette
    - 需要进行对齐的原始色彩调色板。它作为向目标调色板调整颜色的基础。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: Tuple[RGBPalette]
- target_align
    - 原始调色板应该与之对齐的目标色彩调色板。这个调色板作为所需颜色调整的参考。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: Tuple[RGBPalette]
- alignment_factor
    - 一个浮点值，用于确定原始调色板和目标调色板之间的对齐程度。较高的值会导致更接近目标调色板的颜色。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- palette
    - 经过与目标调色板对齐后的调整色彩调色板，反映了应用的颜色变化。
    - Comfy dtype: RGB_PALETTE
    - Python dtype: Tuple[RGBPalette]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamColorAlign:
    NODE_NAME = "Palette Color Align"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.palette | {
                "target_align": (RGBPalette.ID,),
                "alignment_factor": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 10.0, "step": 0.1}),
            }
        }

    CATEGORY = NodeCategories.IMAGE_COLORS
    RETURN_TYPES = (RGBPalette.ID,)
    RETURN_NAMES = ("palette",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, palette: Tuple[RGBPalette], target_align: Tuple[RGBPalette], alignment_factor: float):
        results = list()

        def _limit(c):
            return max(min(c, 255), 0)

        for i in range(len(palette)):
            p = palette[i]
            t = target_align[i]
            (_, _, r1, g1, b1) = p.analyze()
            (_, _, r2, g2, b2) = t.analyze()

            dr = (r2 - r1) * alignment_factor
            dg = (g2 - g1) * alignment_factor
            db = (b2 - b1) * alignment_factor
            new_pixels = list()
            for pixel in p:
                r = _limit(round(pixel[0] + (255 * dr)))
                g = _limit(round(pixel[1] + (255 * dg)))
                b = _limit(round(pixel[1] + (255 * db)))
                new_pixels.append((r, g, b))
            results.append(RGBPalette(colors=new_pixels))
        return (tuple(results),)

```
