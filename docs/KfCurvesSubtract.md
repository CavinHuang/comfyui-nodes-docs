# Documentation
- Class name: KfCurvesSubtract
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点实现了从一个曲线中减去另一个曲线的功能，通过结合关键帧操作和数学运算，在动画和数据可视化领域中实现期望的结果。

# Input types
## Required
- curve_1
    - 第一条曲线输入是至关重要的，因为它为减法操作设定了基线。它是整个过程的中心，因为它决定了操作后结果曲线的形式和结构。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_2
    - 第二条曲线作为要从第一条曲线中减去的元素。它的角色至关重要，因为它直接影响减法的最终结果，决定了结果曲线的形状和特征。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Output types
- result_curve
    - 输出代表减法操作的结果，将两条输入曲线的精髓结合成一条单一的、精炼的曲线，反映了原始两条曲线之间的差异。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurvesSubtract:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_1': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve_2': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, curve_1, curve_2):
        curve_1 = deepcopy(curve_1)
        curve_2 = deepcopy(curve_2)
        return (curve_1 - curve_2,)
```