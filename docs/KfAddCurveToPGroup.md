# Documentation
- Class name: KfAddCurveToPGroup
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点将曲线集成到参数组中，便于在项目中管理和组织关键帧曲线。它通过允许无缝添加曲线来增强工作流程，确保它们成为结构化组的一部分，以便更容易访问和操作。

# Input types
## Required
- curve
    - 曲线参数是必不可少的，因为它定义了要添加到参数组的特定曲线。它是主要的输入参数，决定了哪些曲线的数据和属性将在组内进行管理。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.Curve
## Optional
- parameter_group
    - 参数组作为曲线的容器，允许对多个参数进行集体管理。其存在或不存在会影响节点操作中数据的结构和组织。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: kf.ParameterGroup

# Output types
- parameter_group
    - 输出的参数组现在因添加了曲线而得到增强，成为一个更全面的参数管理实体。它很重要，因为它代表了节点操作的成果，封装了有组织的数据处理以供进一步使用。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: kf.ParameterGroup

# Usage tips
- Infra type: CPU

# Source code
```
class KfAddCurveToPGroup:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('PARAMETER_GROUP',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('KEYFRAMED_CURVE', {'forceInput': True})}, 'optional': {'parameter_group': ('PARAMETER_GROUP', {'forceInput': True})}}

    def main(self, curve, parameter_group=None):
        curve = deepcopy(curve)
        if parameter_group is None:
            parameter_group = kf.ParameterGroup([curve])
        else:
            parameter_group = deepcopy(parameter_group)
            parameter_group.parameters[curve.label] = curve
        return (parameter_group,)
```