---
tags:
- Color
---

# Color (hexadecimal)
## Documentation
- Class name: `Color (hexadecimal)`
- Category: `Bmad/image`
- Output node: `False`

This node is designed to convert a hexadecimal color code into a specific color format. It validates the input hexadecimal code and returns the corresponding color, ensuring the input is in a valid hexadecimal format before proceeding with the conversion.
## Input types
### Required
- **`hex`**
    - The hexadecimal code representing a color. This parameter is crucial for determining the exact color to be converted. The node validates this code to ensure it is in a proper hexadecimal format before proceeding.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`color`**
    - Comfy dtype: `COLOR`
    - The color obtained from the input hexadecimal code. This output is the direct result of converting the validated hexadecimal code into its corresponding color format.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ColorRGBFromHex:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"hex": ("STRING", {"default": "#000000"})}}

    RETURN_TYPES = ("COLOR",)
    FUNCTION = "ret"
    CATEGORY = "Bmad/image"

    def ret(self, hex):
        import re
        hex_color_pattern = r'^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$'
        if re.match(hex_color_pattern, hex) is None:
            print_yellow(f"ColorRGBFromHex node > The following is not a valid hex code:{hex}")
        return (hex,)

```
