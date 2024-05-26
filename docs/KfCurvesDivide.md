# Documentation
- Class name: KfCurvesDivide
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点执行两条曲线的除法操作，提供了分析它们之间关系的手段。对于需要曲线数据标准化或比较的操作至关重要，提供了一种直接的方法来获得包含除法结果的新曲线。

# Input types
## Required
- curve_1
    - 第一条曲线是定义除法操作中一个操作数的基本输入。它的值对确定除法结果的outcome至关重要，因为它们直接影响结果曲线的形状和特征。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_2
    - 第二条曲线是另一个重要的输入，它在除法操作中作为除数。它的重要性在于它会影响结果曲线相对于第一条曲线的缩放。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Output types
- result_curve
    - 节点的输出是一条新曲线，代表第一条输入曲线除以第二条曲线的结果。这条结果曲线很重要，因为它包含了两条原始曲线之间的归一化关系。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurvesDivide:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_1': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve_2': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, curve_1, curve_2):
        curve_1 = deepcopy(curve_1)
        curve_2 = deepcopy(curve_2)
        return (curve_1 / curve_2,)
```