# Documentation
- Class name: ConditioningSetArea
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningSetArea节点旨在操作和向条件集添加数据，这对于影响某些模型的行为至关重要。它允许指定一个区域及其相关强度，这可以引导模型的输出朝期望的方向发展。

# Input types
## Required
- conditioning
    - 条件参数至关重要，因为它定义了模型处理的初始状态或上下文。这是一个关键输入，直接影响模型如何解释和响应它处理的数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- width
    - 宽度参数指定要进行条件处理的区域的宽度。它在确定模型操作中条件效果的空间范围方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置受条件影响的区域的垂直尺寸。它对于控制模型对特定区域的关注度很重要。
    - Comfy dtype: INT
    - Python dtype: int
- x
    - x参数确定受条件影响的区域的水平起始点。它对于精确定位模型输入空间中应用条件的确切位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- y
    - y参数确定要进行条件处理的区域的垂直起始点。它与x参数一起工作，以定义条件效果的精确坐标。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - 强度参数量化了条件效果的强度。它是模型输出受条件集影响程度的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出的条件集是将指定参数应用于初始条件集的结果。它反映了模型将用于进一步处理的更新状态。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningSetArea:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',), 'width': ('INT', {'default': 64, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 64, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'x': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'y': ('INT', {'default': 0, 'min': 0, 'max': MAX_RESOLUTION, 'step': 8}), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'append'
    CATEGORY = 'conditioning'

    def append(self, conditioning, width, height, x, y, strength):
        c = node_helpers.conditioning_set_values(conditioning, {'area': (height // 8, width // 8, y // 8, x // 8), 'strength': strength, 'set_area_to_bounds': False})
        return (c,)
```