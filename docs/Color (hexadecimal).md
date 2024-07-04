
# Documentation
- Class name: Color (hexadecimal)
- Category: Bmad/image
- Output node: False

此节点用于将十六进制颜色代码转换为特定的颜色格式。它会验证输入的十六进制代码，并返回相应的颜色，确保在进行转换之前输入的是有效的十六进制格式。

# Input types
## Required
- hex
    - 表示颜色的十六进制代码。这个参数对于确定要转换的具体颜色至关重要。节点会验证这个代码，确保它是正确的十六进制格式，然后再进行处理。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- color
    - 从输入的十六进制代码获得的颜色。这个输出是将验证过的十六进制代码直接转换为相应颜色格式的结果。
    - Comfy dtype: COLOR
    - Python dtype: str


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
