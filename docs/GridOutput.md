# Documentation
- Class name: GridOutput
- Category: ♾️Mixlab/Layer
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点类封装了处理和输出网格坐标及尺寸的功能，便于在基于网格的系统中进行操作和定位。

# Input types
## Required
- grid
    - grid参数代表网格系统中元素的坐标和尺寸。它对于确定元素的位置和大小至关重要。
    - Comfy dtype: tuple[int, int, int, int]
    - Python dtype: Tuple[int, int, int, int]

# Output types
- x
    - 网格的x坐标，表示元素在网格中的水平位置。
    - Comfy dtype: int
    - Python dtype: int
- y
    - 网格的y坐标，表示元素在网格中的垂直位置。
    - Comfy dtype: int
    - Python dtype: int
- width
    - 网格中元素的宽度，定义了其水平延伸的范围。
    - Comfy dtype: int
    - Python dtype: int
- height
    - 网格中元素的高度，定义了其垂直延伸的范围。
    - Comfy dtype: int
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class GridOutput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'grid': ('_GRID',)}}
    RETURN_TYPES = ('INT', 'INT', 'INT', 'INT')
    RETURN_NAMES = ('x', 'y', 'width', 'height')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Layer'
    INPUT_IS_LIST = False

    def run(self, grid):
        (x, y, w, h) = grid
        return (x, y, w, h)
```