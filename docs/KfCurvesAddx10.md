# Documentation
- Class name: KfCurvesAddx10
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在聚合多个输入曲线，通过将它们的值相加以增强数据的整体表示。它作为通过求和来简化关键帧曲线的分析和可视化的工具。

# Input types
## Required
- curve_0
    - 初始曲线输入是至关重要的，因为它为后续其他曲线的加法设置了基线。它的出现是强制性的，并且直接影响节点操作的结果。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
## Optional
- curve_1
    - 额外的曲线输入对于节点的功能是不可或缺的，它们有助于累积效果的增加。它们增强了最终输出的全面性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_2
    - 更多的曲线输入在聚合过程中起着重要作用，影响最终的总和以及节点在综合数据方面的有效性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_3
    - 后续的曲线输入对于节点实现全面的聚合至关重要，影响合成数据的深度和广度。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_4
    - 包含更多的曲线输入丰富了节点聚合和处理数据的能力，有助于形成更加细腻的最终输出。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_5
    - 额外的曲线输入对于增强节点综合更广泛数据范围的能力至关重要，有助于更全面地理解聚合信息。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_6
    - 将更多的曲线输入纳入节点操作允许更详细和复杂的聚合，丰富了数据的最终表示。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_7
    - 额外曲线输入的存在增强了节点的功能，使其能够处理并整合更广泛的数据点到最终总和中。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_8
    - 通过包括更多的曲线输入，节点可以有效聚合多样化的数据集，这对于实现对组合曲线的整体视图至关重要。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_9
    - 最后的曲线输入为聚合过程添加了最后一层数据，确保节点的输出是所有组合曲线的全面表示。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Output types
- curve_out
    - 输出代表所有输入曲线的总和，提供了聚合数据的全面和综合视图。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurvesAddx10:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_0': ('KEYFRAMED_CURVE', {'forceInput': True})}, 'optional': {'curve_1': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_2': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_3': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_4': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_5': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_6': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_7': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_8': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0}), 'curve_9': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 0})}}

    def main(self, curve_0=0, curve_1=0, curve_2=0, curve_3=0, curve_4=0, curve_5=0, curve_6=0, curve_7=0, curve_8=0, curve_9=0):
        curve_out = curve_0 + curve_1 + curve_2 + curve_3 + curve_4 + curve_5 + curve_6 + curve_7 + curve_8 + curve_9
        return (curve_out,)
```