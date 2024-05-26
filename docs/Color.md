# Documentation
- Class name: ColorInput
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点便于处理和提取输入颜色信息，并以结构化格式提供颜色组成部分的详细分析。

# Input types
## Required
- color
    - 颜色参数对于节点的运行至关重要，因为它是颜色分析的主要数据来源。
    - Comfy dtype: TCOLOR
    - Python dtype: Dict[str, Union[str, int]]

# Output types
- hex
    - 十六进制输出代表十六进制颜色代码，是网页和图形设计中的标准表示方法。
    - Comfy dtype: STRING
    - Python dtype: str
- r
    - r输出表示颜色的红色分量，对整体色调和饱和度有贡献。
    - Comfy dtype: INT
    - Python dtype: int
- g
    - g输出表示绿色分量，影响颜色的中间色调。
    - Comfy dtype: INT
    - Python dtype: int
- b
    - b输出对应蓝色分量，影响颜色的冷度或暖度。
    - Comfy dtype: INT
    - Python dtype: int
- a
    - a输出代表alpha通道，指示颜色的透明度级别。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class ColorInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'color': ('TCOLOR',)}}
    RETURN_TYPES = ('STRING', 'INT', 'INT', 'INT', 'FLOAT')
    RETURN_NAMES = ('hex', 'r', 'g', 'b', 'a')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, False, False, False, False)

    def run(self, color):
        h = color['hex']
        r = color['r']
        g = color['g']
        b = color['b']
        a = color['a']
        return (h, r, g, b, a)
```