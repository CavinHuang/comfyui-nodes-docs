# Documentation
- Class name: WLSH_Res_Multiply
- Category: WLSH Nodes/number
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_Res_Multiply节点旨在对宽度和高度值执行乘法运算，根据提供的乘数进行缩放。它在调整图像或类似几何实体的尺寸方面起着至关重要的作用，确保缩放因子均匀应用于两个维度。

# Input types
## Required
- width
    - ‘width’参数代表要缩放实体的初始宽度。它对节点的操作至关重要，因为它决定了乘法过程的起始点。宽度一旦乘以乘数，将定义缩放后的新宽度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数表示缩放前实体的初始高度。它是节点的关键输入，因为它决定了将受乘数影响的垂直维度。操作后的最终高度将反映缩放后的高度。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - ‘multiplier’参数是宽度和高度将被缩放的因子。它是节点的关键组成部分，因为它直接影响缩放操作的幅度。适当选择乘数对于实现所需的尺寸至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- width
    - ‘width’输出代表乘法操作后实体的缩放宽度。它很重要，因为它提供了缩放过程产生的新宽度测量值。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’输出表示乘法后的实体缩放高度。它是节点操作的一个重要结果，因为它提供了缩放后的新高度测量值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WLSH_Res_Multiply:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'width': ('INT', {'default': 512, 'min': 16, 'max': MAX_RESOLUTION, 'forceInput': True}), 'height': ('INT', {'default': 512, 'min': 16, 'max': MAX_RESOLUTION, 'forceInput': True}), 'multiplier': ('INT', {'default': 2, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('INT', 'INT')
    RETURN_NAMES = ('width', 'height')
    FUNCTION = 'multiply'
    CATEGORY = 'WLSH Nodes/number'

    def multiply(self, width, height, multiplier):
        adj_width = width * multiplier
        adj_height = height * multiplier
        return (int(adj_width), int(adj_height))
```