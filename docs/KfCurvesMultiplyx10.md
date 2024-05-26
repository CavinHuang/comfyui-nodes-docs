# Documentation
- Class name: KfCurvesMultiplyx10
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点便于对多个曲线进行乘法运算，增强了对关键帧数据进行操作和组合以实现复杂动画或模拟的能力。它旨在简化缩放和整合各种曲线输入的过程，从而实现创建复杂的运动序列。

# Input types
## Required
- curve_0
    - 主要的曲线输入对于乘法过程至关重要，它作为其他曲线将要因子的基础。它的存在确保了节点可以启动复杂的操作。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
## Optional
- curve_1
    - 后续的曲线输入作为乘数，有助于增强主曲线的整体缩放效果。每条曲线都丰富了最终输出的复杂性和细节。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_2
    - 额外的曲线输入进一步完善了缩放过程，允许对生成的运动序列进行细致的控制。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_3
    - 包含更多曲线输入增加了节点的多功能性，使得通过组合多个曲线值能够实现广泛的效果。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_4
    - 更多的曲线输入提供了细粒度的控制，允许根据每条曲线的特定特征对最终输出进行复杂的操作。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_5
    - 结合额外的曲线可以在最终动画中实现更复杂的细节水平，因为每条曲线都贡献了独特的缩放因子。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_6
    - 更多曲线的乘法提供了更高的精度和定制化程度，在生成的运动序列中。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_7
    - 通过包含更多的曲线输入，节点可以生成高度复杂和细腻的动画，满足特定的创意需求。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_8
    - 进一步整合曲线增强了节点生成复杂和详细动画的能力，响应高级运动设计的需求。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve
- curve_9
    - 最后一组曲线输入使节点具有在最终动画中实现卓越细节和精度的能力，推动可能性的界限。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Output types
- curve_out
    - 输出代表了所有输入曲线乘法的累积结果，提供了一个单一的、统一的曲线，封装了组合效果。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurvesMultiplyx10:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve_0': ('KEYFRAMED_CURVE', {'forceInput': True})}, 'optional': {'curve_1': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_2': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_3': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_4': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_5': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_6': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_7': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_8': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1}), 'curve_9': ('KEYFRAMED_CURVE', {'forceInput': True, 'default': 1})}}

    def main(self, curve_0, curve_1, curve_2, curve_3, curve_4, curve_5, curve_6, curve_7, curve_8, curve_9):
        curve_out = curve_0 * curve_1 * curve_2 * curve_3 * curve_4 * curve_5 * curve_6 * curve_7 * curve_8 * curve_9
        return (curve_out,)
```