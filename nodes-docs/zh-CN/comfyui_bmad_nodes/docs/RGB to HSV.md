
# Documentation
- Class name: RGB to HSV
- Category: Bmad/CV/Color A.
- Output node: False

此节点将RGB颜色值转换为HSV颜色空间，实现了一种不同的颜色表示方式，将颜色的色相、饱和度和明度（亮度）分离开来。

# Input types
## Required
- rgb_color
    - 需要转换为HSV的RGB颜色。这个输入至关重要，因为它决定了将要从RGB转换到HSV颜色空间的颜色。
    - Comfy dtype: COLOR
    - Python dtype: Tuple[int, int, int]

# Output types
- hsv_color
    - 输入RGB颜色转换后得到的HSV颜色表示。
    - Comfy dtype: HSV_COLOR
    - Python dtype: Tuple[int, int, int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorToHSVColor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "rgb_color": ("COLOR",)
        }}

    RETURN_TYPES = ("HSV_COLOR",)
    FUNCTION = "convert"
    CATEGORY = "Bmad/CV/Color A."

    def convert(self, rgb_color):
        from colorsys import rgb_to_hsv
        rgb_color = setup_color_to_correct_type(rgb_color)
        (r, g, b) = tuple(rgb_color)
        rgb_color = (r / 255, g / 255, b / 255)
        (h, s, v) = rgb_to_hsv(*rgb_color)
        hsv = (int(h * 179), int(s * 255), int(v * 255))
        return (hsv,)

```
