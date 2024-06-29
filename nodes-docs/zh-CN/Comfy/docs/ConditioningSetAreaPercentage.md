# Documentation
- Class name: ConditioningSetAreaPercentage
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningSetAreaPercentage节点旨在通过添加一组新的参数来修改条件集的属性，这些参数定义了面积百分比。它通过将'area'属性调整为基于提供的宽度和高度的百分比值来操作，而不影响现有的界限。该节点在微调模型的条件方面发挥着关键作用，允许对条件过程进行更精细的控制。

# Input types
## Required
- conditioning
    - 条件参数对节点至关重要，因为它代表了将被修改的初始条件集。这是节点操作的起点，并决定了应用面积百分比的上下文。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- width
    - 宽度参数定义了相对于总宽度的面积宽度百分比。它是确定条件集中面积大小的关键因素，因此对节点的输出有显著影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- height
    - 高度参数指定了相对于总高度的面积高度百分比。它与宽度一起工作，以确定条件集中区域的尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x
    - x参数表示条件集中区域左上角的水平位置。它对于精确定位应用面积百分比的确切位置至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y
    - y参数表示条件集中区域左上角的垂直位置。它对于在集中准确定位区域至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength
    - 强度参数决定区域内条件集中的影响强度。它允许微调区域特征如何强烈地影响整体条件。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出的条件集是输入的修改版本，应用了面积百分比和强度参数。它代表了节点处理后条件的更新状态。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningSetAreaPercentage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'width': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 1.0, 'step': 0.01}), 'height': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 1.0, 'step': 0.01}), 'x': ('FLOAT', {'default': 0, 'min': 0, 'max': 1.0, 'step': 0.01}), 'y': ('FLOAT', {'default': 0, 'min': 0, 'max': 1.0, 'step': 0.01}), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'append'
    CATEGORY = 'conditioning'

    def append(self, conditioning, width, height, x, y, strength):
        c = node_helpers.conditioning_set_values(conditioning, {'area': ('percentage', height, width, y, x), 'strength': strength, 'set_area_to_bounds': False})
        return (c,)
```