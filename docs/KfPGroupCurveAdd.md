# Documentation
- Class name: KfPGroupCurveAdd
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点便于将曲线整合入参数组中，增强了数据模型的整体结构和功能。它旨在简化将关键帧动画元素与参数设置结合的过程，从而提高系统内数据操作的效率。

# Input types
## Required
- parameter_group
    - 参数组是必要的，因为它构成了曲线整合的基础。它是影响节点整体行为和输出的关键组件，决定了曲线操作的结构上下文。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: Dict[str, Any]
- curve
    - 曲线输入对于向参数组引入动态变化至关重要。它携带将与静态参数合并的动画数据，从而为最终结果增加复杂性和流畅性。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve

# Output types
- result
    - 结果参数组和曲线的合并输出，标志着成功的整合。它代表了节点操作的结晶，封装了两个输入的组合属性和行为。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class KfPGroupCurveAdd:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('PARAMETER_GROUP',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameter_group': ('PARAMETER_GROUP', {'forceInput': True}), 'curve': ('KEYFRAMED_CURVE', {'forceInput': True})}}

    def main(self, parameter_group, curve):
        parameter_group = deepcopy(parameter_group)
        curve = deepcopy(curve)
        return (parameter_group + curve,)
```