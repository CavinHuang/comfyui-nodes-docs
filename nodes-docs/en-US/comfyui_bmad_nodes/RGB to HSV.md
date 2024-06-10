---
tags:
- Color
- HSVColorSpace
---

# RGB to HSV
## Documentation
- Class name: `RGB to HSV`
- Category: `Bmad/CV/Color A.`
- Output node: `False`

This node converts RGB color values to HSV color space, enabling a different representation of colors that separates color hue, saturation, and value (brightness).
## Input types
### Required
- **`rgb_color`**
    - The RGB color to be converted to HSV. This input is crucial as it determines the color that will undergo the transformation from RGB to HSV color space.
    - Comfy dtype: `COLOR`
    - Python dtype: `Tuple[int, int, int]`
## Output types
- **`hsv_color`**
    - Comfy dtype: `HSV_COLOR`
    - The resulting HSV color representation of the input RGB color.
    - Python dtype: `Tuple[int, int, int]`
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
