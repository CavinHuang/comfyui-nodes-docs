# Documentation
- Class name: KfAddCurveToPGroupx10
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点将多条曲线集成到一个参数组中，简化了项目中关键帧曲线的管理和应用。它强调数据的整合，以提高效率和工作流程。

# Input types
## Required
- curve0
    - 初始曲线至关重要，因为它为参数组设定了基础。它的包含是强制性的，直接影响节点的运作和输出。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- parameter_group
    - 参数组作为曲线的容器，在组织和构建节点工作流程中的数据结构中起着关键作用。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: kf.ParameterGroup
## Optional
- curve1
    - 像curve1这样的附加曲线增加了参数组的复杂性和多功能性，允许处理和操作更丰富的数据集。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve2
    - 进一步合并曲线，如curve2，有助于节点处理多样化和复杂的数据，提高了整体功能。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve3
    - 像curve3这样的可选曲线为参数组提供了额外的维度，使节点能够有效管理更复杂的数据结构。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve4
    - curve4的包含进一步扩展了参数组的能力，允许对正在处理的数据进行更细致的控制。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve5
    - curve5增加了参数组整合多种数据的能力，提高了节点对各种数据输入的适应性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve6
    - 通过包含curve6，节点获得了管理更加复杂数据集的能力，有助于参数组的整体健壮性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve7
    - curve7是另一个可选曲线，包含后可以进一步丰富参数组并增强节点的数据处理能力。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve8
    - curve8的添加使节点能够处理更广泛的数据范围，提高了参数组的多功能性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- curve9
    - 包含最后一个可选曲线curve9，使节点能够处理最复杂的数据集，最大化参数组的全面性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve

# Output types
- parameter_group
    - 输出参数组是所有输入曲线的集合，代表了一个统一和结构化的数据集，可以在工作流程的下游被利用。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: kf.ParameterGroup

# Usage tips
- Infra type: CPU

# Source code
```
class KfAddCurveToPGroupx10:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('PARAMETER_GROUP',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve0': ('KEYFRAMED_CURVE', {'forceInput': True})}, 'optional': {'parameter_group': ('PARAMETER_GROUP', {'forceInput': True}), 'curve1': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve2': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve3': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve4': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve5': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve6': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve7': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve8': ('KEYFRAMED_CURVE', {'forceInput': True}), 'curve9': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, parameter_group=None, **kwargs):
        if parameter_group is None:
            parameter_group = kf.ParameterGroup(kwargs)
        else:
            parameter_group = deepcopy(parameter_group)
            for curve in parameter_group.values():
                parameter_group.parameters[curve.label] = curve
        return (parameter_group,)
```