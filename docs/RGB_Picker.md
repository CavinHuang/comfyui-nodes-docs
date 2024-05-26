# Documentation
- Class name: RGB_Picker
- Category: 😺dzNodes/WordCloud
- Output node: True
- Repo Ref: https://github.com/chflame163/ComfyUI_WordCloud.git

RGB_Picker节点旨在促进颜色值的转换和选择。它处理各种格式的颜色输入，专注于为用户提供在十六进制和十进制表示法中处理颜色的灵活性。

# Input types
## Required
- color
    - ‘color’参数是必需的，因为它定义了节点操作的初始颜色输入。它是所有后续颜色转换的基础，对确定最终输出至关重要。
    - Comfy dtype: COLOR
    - Python dtype: str
## Optional
- mode
    - ‘mode’参数决定了颜色输入的转换过程。它影响颜色的解释方式和输出的结果格式，增强了节点对不同颜色表示要求的适应性。
    - Comfy dtype: COMBO[mode_list]
    - Python dtype: str

# Output types
- value
    - ‘value’输出代表所需格式下的处理后颜色，包含了节点颜色转换和选择的主要功能。
    - Comfy dtype: STRING
    - Python dtype: tuple

# Usage tips
- Infra type: CPU

# Source code
```
class RGB_Picker:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'color': ('COLOR', {'default': 'white'}), 'mode': (mode_list,)}, 'optional': {}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('value',)
    FUNCTION = 'picker'
    CATEGORY = '😺dzNodes/WordCloud'
    OUTPUT_NODE = True

    def picker(self, color, mode):
        ret = color
        if mode == 'DEC':
            ret = hex_to_dec(color)
        return (ret,)
```