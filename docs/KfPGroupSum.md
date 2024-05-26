# Documentation
- Class name: KfPGroupSum
- Category: keyframed/experimental
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfPGroupSum节点旨在将关键帧曲线聚合成单个复合曲线。它通过将给定参数组关联的各个曲线相加来操作，从而生成一个统一的表示，该表示包含了输入曲线的集体行为。

# Input types
## Required
- parameter_group
    - 参数组是KfPGroupSum节点的关键输入，因为它包含要相加的关键帧曲线集。此输入通过确定哪些曲线贡献给最终复合曲线，直接影响输出曲线。
    - Comfy dtype: PARAMETER_GROUP
    - Python dtype: Dict[str, kf.Curve]

# Output types
- composite_curve
    - KfPGroupSum节点的输出是一个复合的关键帧曲线，它是参数组中所有输入曲线的总和。这条曲线很重要，因为它提供了输入曲线所代表的组合运动或效果的简化视图。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfPGroupSum:
    CATEGORY = 'keyframed/experimental'
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'parameter_group': ('PARAMETER_GROUP', {'forceInput': True})}}

    def main(self, parameter_group):
        parameter_group = deepcopy(parameter_group)
        outv = kf.Curve(0)
        for curve in parameter_group.parameters.values():
            outv += curve
        return (outv,)
```