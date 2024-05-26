# Documentation
- Class name: KfEvaluateCurveAtT
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfEvaluateCurveAtT节点旨在评估并检索特定时间't'处的关键帧曲线的值。它通过接受一个关键帧曲线和一个时间参数来操作，并返回给定时间点曲线值的浮点数和整数表示，全面洞察该时刻曲线的状态。

# Input types
## Required
- curve
    - ‘curve’参数至关重要，因为它定义了节点将评估的关键帧曲线。它是直接影响节点输出的关键组件，通过确定在指定时间 't' 要分析的曲线的形状和值。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- t
    - ‘t’参数指定了要评估曲线值的时间。虽然它有一个默认值0，但在确定节点的确切输出时至关重要，因为它指示了沿曲线提取值的确切位置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- curve_value_float
    - 在时间 't' 处曲线值的浮点表示是节点的关键输出。它捕获了指定时间曲线的精确连续性质，提供了对曲线行为的详细洞察。
    - Comfy dtype: FLOAT
    - Python dtype: float
- curve_value_int
    - 在时间 't' 处曲线值的整数表示提供了曲线值的离散化版本。在需要或更倾向于使用整数的上下文中，如某些类型的数据分析或可视化，此输出可能特别有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class KfEvaluateCurveAtT:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('FLOAT', 'INT')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('KEYFRAMED_CURVE', {'forceInput': True}), 't': ('INT', {'default': 0})}}

    def main(self, curve, t):
        return (curve[t], int(curve[t]))
```