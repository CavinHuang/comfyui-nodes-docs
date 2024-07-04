
# Documentation
- Class name: RemapStretch
- Category: Bmad/CV/Transform
- Output node: False

RemapStretch节点用于对图像应用拉伸变换，根据指定的x轴和y轴幂因子，以给定点为中心调整图像几何形状。该节点旨在以非线性方式操纵图像尺寸，提供一种模拟或校正失真的方法。

# Input types
## Required
- power_x
    - 指定沿x轴方向拉伸的幂因子。较高的值会导致更明显的拉伸效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- power_y
    - 指定沿y轴方向拉伸的幂因子。与power_x类似，它控制垂直方向的拉伸程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_x
    - 确定拉伸效果的水平中心点。取值范围为0到1，表示图像宽度的百分比。
    - Comfy dtype: FLOAT
    - Python dtype: float
- center_y
    - 确定拉伸效果的垂直中心点。取值范围为0到1，表示图像高度的百分比。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- remap
    - 输出是一组参数或变换映射，定义了根据输入参数如何拉伸图像。该映射用于调整图像几何形状以实现拉伸效果。
    - Comfy dtype: REMAP
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemapStretch(RemapBase):
    @classmethod
    def INPUT_TYPES(s):
        return RemapPinch.INPUT_TYPES_DICT

    def send_remap(self, power_x, power_y, center_x, center_y):
        from .utils.remaps import remap_pinch_or_stretch
        return ({
                    "func": remap_pinch_or_stretch,
                    "xargs": [(1 / power_x, 1 / power_y), (center_x, center_y)]
                },)

```
