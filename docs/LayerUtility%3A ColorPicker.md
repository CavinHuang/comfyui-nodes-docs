# Documentation
- Class name: ColorPicker
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

在色板上选取颜色并输出。 改自mtb nodes的web extensions，感谢原作者。

# Input types

## Required

- color
    - 输入的颜色。
    - Comfy dtype: COLOR
    - Python dtype: str
    - Options: {"default": "#FFFFFF"}

- mode
    - 输出模式
    - Comfy dtype: STRING
    - Python dtype: str
    - Options: ['HEX', 'DEC']

# Output types

- value
    - 输出的颜色。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class ColorPicker:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        mode_list = ['HEX', 'DEC']
        return {
            "required": {
                "color": ("COLOR", {"default": "#FFFFFF"},),
                "mode": (mode_list,),  # 输出模式
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("value",)
    FUNCTION = 'picker'
    CATEGORY = '😺dzNodes/LayerUtility'

    def picker(self, color, mode):
        ret = color
        if mode == 'DEC':
            ret = Hex_to_RGB(ret)
        return (ret,)
```