# Documentation
- Class name: KfCurvesAdd
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfCurvesAdd节点旨在将两个关键帧曲线合并为一个复合曲线。当合并曲线对于创建复杂动画或数据表示至关重要时，该节点在工作流程中扮演着关键角色。它通过接收两个输入曲线并将它们无缝集成，以产生一个统一的输出曲线，从而增强了动画或图形过程的整体功能和多样性。

# Input types
## Required
- curve_1
    - 要合并的第一个关键帧曲线是KfCurvesAdd节点的基本输入。它对于形成最终复合曲线至关重要，直接影响动画或图形表示的结果。节点严重依赖此曲线的结构和属性以有效执行其功能。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_2
    - 第二个关键帧曲线与第一个曲线一样，是节点的必需输入。它对合并曲线的过程至关重要，显著影响最终复合曲线的形状和特性。节点结合使用这个曲线和第一个曲线以实现所需的动画或图形效果。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Output types
- combined_curve
    - KfCurvesAdd节点的输出是一个关键帧曲线，代表两个输入曲线的总和。这个输出很重要，因为它包含了输入曲线的组合效果，为进一步在动画或数据可视化流程中使用提供了一个单一、连贯的曲线。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurvesAdd:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_1': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve_2': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, curve_1, curve_2):
        curve_1 = deepcopy(curve_1)
        curve_2 = deepcopy(curve_2)
        return (curve_1 + curve_2,)
```