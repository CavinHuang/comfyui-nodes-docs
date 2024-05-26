# Documentation
- Class name: KfCurvesMultiply
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfCurvesMultiply节点旨在对两个给定的关键帧曲线进行逐元素的乘法运算，有效地结合它们在相应关键帧的各自值。此操作对于以非线性方式调整和操作动画曲线的强度或幅度至关重要，增强了在动画和模拟过程中的创造性控制。

# Input types
## Required
- curve_1
    - 第一个关键帧曲线输入至关重要，因为它定义了将与第二个曲线相乘的初始关键帧及其相关值。此参数对于建立将被第二个曲线修改的基线动画或效果至关重要。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_2
    - 第二个关键帧曲线输入作为第一个曲线的乘数，允许调整由第一个曲线定义的动画或效果。此参数对于以受控方式改变动画的动态或应用复杂效果至关重要。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Output types
- result
    - KfCurvesMultiply节点的输出是一个新的关键帧曲线，代表了两个输入曲线的逐元素乘积。这个结果曲线可以用于进一步细化动画或在动画序列中引入新的复杂性和细节水平。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurvesMultiply:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_1': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve_2': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, curve_1, curve_2):
        curve_1 = deepcopy(curve_1)
        curve_2 = deepcopy(curve_2)
        return (curve_1 * curve_2,)
```