# Documentation
- Class name: KfPGroupCurveMultiply
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点实现了将一组参数与曲线相乘，根据关键帧数据动态调整随时间变化的参数值。

# Input types
## Required
- parameter_group
    - 参数组，其值将与曲线相乘。这对于定义节点将要调整的参数集至关重要。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: Dict[str, Any]
- curve
    - 曲线定义了参数组在不同时间点的乘法因子。它对于控制动态调整至关重要。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.Curve

# Output types
- result
    - 输出是修改后的参数组，其值根据曲线乘法进行了调整。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class KfPGroupCurveMultiply:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('PARAMETER_GROUP',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameter_group': ('PARAMETER_GROUP', {'forceInput': True}), 'curve': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, parameter_group, curve):
        parameter_group = deepcopy(parameter_group)
        curve = deepcopy(curve)
        return (parameter_group * curve,)
```