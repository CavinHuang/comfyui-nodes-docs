# Documentation
- Class name: KfGetCurveFromPGroup
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点有助于从参数组中提取特定的曲线，使用户能够隔离和分析复杂数据集中的单个数据趋势。

# Input types
## Required
- curve_label
    - 要提取的曲线的标识符，对于精确定位要分析的确切数据趋势至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- parameter_group
    - 形成数据集的参数集合，从中将提取曲线，在整体数据分析过程中起着至关重要的作用。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: kf.ParameterGroup

# Output types
- curve
    - 提取的曲线代表了隔离的数据趋势，提供了对较大数据集中特定模式的清晰和专注的视图。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfGetCurveFromPGroup:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_label': ('STRING', {'default': 'My Curve'}), 'parameter_group': ('PARAMETER_GROUP', {'forceInput': True})}}

    def main(self, curve_label, parameter_group):
        curve = parameter_group.parameters[curve_label]
        return (deepcopy(curve),)
```