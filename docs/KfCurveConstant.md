# Documentation
- Class name: KfCurveConstant
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfCurveConstant节点旨在在关键帧框架中生成一个常数曲线。它封装了一个作为输入提供的单一值，并且将其表示为一个随时间没有变化的常数曲线。该节点在创建动态系统中的稳定状态或固定点非常有用，其中在一段时间内需要一个恒定的值。

# Input types
## Required
- value
    - ‘value’参数至关重要，因为它定义了曲线的常数值。它是节点的唯一输入，并直接影响输出，确保曲线在其持续时间内保持不变。这个参数对于在模拟中建立稳态至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出‘curve’在关键帧框架中代表一个常数曲线。它基于输入值生成，然后用于创建一个随时间不波动的曲线。这个输出很重要，因为它提供了系统中常数状态的视觉和计算表示。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurveConstant:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('FLOAT', {'forceInput': True})}}

    def main(self, value):
        curve = kf.Curve(value)
        return (curve,)
```