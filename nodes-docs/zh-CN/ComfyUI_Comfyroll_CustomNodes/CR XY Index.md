# Documentation
- Class name: CR_XYIndex
- Category: Comfyroll/XY Grid
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_XYIndex 节点旨在根据给定的索引值计算网格结构中对应的 x 和 y 坐标。它作为将线性索引映射到二维网格空间的实用工具，对于图像处理或数据索引等各种应用至关重要。

# Input types
## Required
- x_columns
    - 参数 'x_columns' 指定了网格中的列数。它是确定网格布局的关键元素，因此也是计算给定索引的 x 和 y 坐标的决定因素。
    - Comfy dtype: INT
    - Python dtype: int
- y_rows
    - 参数 'y_rows' 定义了网格中的行数。与 'x_columns' 一起，它决定了网格的整体结构，对于准确计算网格索引至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- index
    - 参数 'index' 是需要被转换为网格坐标的线性索引。它是节点操作的核心，因为它是所有计算的起点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- x
    - 输出 'x' 表示根据提供的索引计算出的网格内的 x 坐标。它是节点功能的关键结果，指示水平位置。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - 输出 'y' 表示根据提供的索引计算出的网格内的 y 坐标。它对于确定索引在网格结构中的垂直位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - 输出 'show_help' 提供了一个文档的 URL 链接，以供进一步帮助。它作为用户寻求有关节点功能更多信息的有用资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_XYIndex:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ['Lerp']
        return {'required': {'x_columns': ('INT', {'default': 5.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_rows': ('INT', {'default': 5.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'index': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('INT', 'INT', 'STRING')
    RETURN_NAMES = ('x', 'y', 'show_help')
    FUNCTION = 'index'
    CATEGORY = icons.get('Comfyroll/XY Grid')

    def index(self, x_columns, y_rows, index):
        index -= 1
        x = index % x_columns
        y = int(index / x_columns)
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-index'
        return (x, y, show_help)
```