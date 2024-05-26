# Documentation
- Class name: KfSetCurveLabel
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点允许为曲线分配一个描述性标签，增强了数据可视化或分析上下文中曲线的可追溯性和可解释性。

# Input types
## Required
- curve
    - 曲线参数是必需的，因为它代表了将要分配标签的数据结构，确保曲线可以在系统中被识别和引用。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
## Optional
- label
    - 标签参数作为曲线的文本标识符，有助于在较大的数据集或工作流中组织和检索特定的曲线。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- curve
    - 输出的曲线现在包含了分配的标签，提供了更全面的数据表示，便于进一步的分析或展示。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSetCurveLabel:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('KEYFRAMED_CURVE', {'forceInput': True}), 'label': ('STRING', {'multiline': False, 'default': '~curve~'})}}

    def main(self, curve, label):
        curve = deepcopy(curve)
        curve.label = label
        return (curve,)
```