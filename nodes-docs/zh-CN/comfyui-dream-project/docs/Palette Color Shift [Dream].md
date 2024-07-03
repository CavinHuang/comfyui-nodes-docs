
# Documentation
- Class name: `Palette Color Shift [Dream]`
- Category: `✨ Dream/🌄 image/🎨 color`
- Output node: `False`

该节点通过调整红、绿、蓝色分量的乘数来对给定的调色板应用颜色偏移，可选择保持固定的亮度水平。它能够自定义图像或视觉元素的调色板，从而增强或改变其美感。

# Input types
## Required
- **`palette`**
    - 需要修改的输入调色板。它代表一组颜色集合，这些颜色将根据提供的乘数进行调整。
    - Comfy dtype: `RGB_PALETTE`
    - Python dtype: `Tuple[RGBPalette]`
- **`red_multiplier`**
    - 调色板中每种颜色的红色分量的乘数，允许增强或减弱红色色调。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`green_multiplier`**
    - 调色板中每种颜色的绿色分量的乘数，用于调整绿色色调。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blue_multiplier`**
    - 调色板中每种颜色的蓝色分量的乘数，用于修改蓝色色调。
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`fixed_brightness`**
    - 决定在颜色偏移过程中是否保持调色板的亮度水平不变。
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`

# Output types
- **`palette`**
    - 应用指定的红、绿、蓝乘数后的修改调色板，可能保持固定亮度。
    - Comfy dtype: `RGB_PALETTE`
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
