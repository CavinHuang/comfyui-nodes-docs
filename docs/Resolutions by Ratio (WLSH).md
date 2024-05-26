# Documentation
- Class name: WLSH_Resolutions_by_Ratio
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Resolutions_by_Ratio节点的'get_resolutions'方法旨在根据给定的宽高比、方向和短边长度计算图像的宽度和高度。它首先从宽高比字符串中确定比例，然后根据短边长度和比例计算宽度。该方法还考虑了图像的方向，如果方向是纵向，则交换宽度和高度。这个节点在图像处理和显示设置中扮演着关键角色，其中宽高比和方向至关重要。

# Input types
## Required
- aspect
    - 参数'aspect'定义了图像的宽高比，对于确定正确的尺寸至关重要。它是一个表示比例的字符串，例如'16:9'。在调整图像大小时，宽高比对于保持图像的形状和比例至关重要。
    - Comfy dtype: STR
    - Python dtype: str
- direction
    - 参数'direction'指定了图像的方向，可以是'landscape'（横向）或'portrait'（纵向）。这个参数至关重要，因为它影响宽度和高度的计算，确保尺寸适合指定的方向。
    - Comfy dtype: STR
    - Python dtype: str
- shortside
    - 参数'shortside'表示图像较短边的长度。它是一个关键输入，因为它直接影响基于宽高比和方向的宽度和高度的计算。该方法确保宽度针对显示或处理目的进行了优化。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - 输出参数'width'提供了考虑了宽高比、方向和短边长度后计算出的图像宽度。它对于确保图像适合所需的显示或处理限制非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 输出参数'height'提供了考虑了宽高比、方向和短边长度后计算出的图像高度。它在保持图像比例和确保满足显示要求方面发挥着重要作用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Resolutions_by_Ratio:
    aspects = ['1:1', '6:5', '5:4', '4:3', '3:2', '16:10', '16:9', '21:9', '2:1', '3:1', '4:1']
    direction = ['landscape', 'portrait']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'aspect': (s.aspects,), 'direction': (s.direction,), 'shortside': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 64})}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'get_resolutions'
    CATEGORY = 'WLSH Nodes/number'

    def get_resolutions(self, aspect, direction, shortside):
        (x, y) = aspect.split(':')
        x = int(x)
        y = int(y)
        ratio = x / y
        width = int(shortside * ratio)
        width = width + 63 & -64
        height = shortside
        if direction == 'portrait':
            (width, height) = (height, width)
        return (width, height)
```