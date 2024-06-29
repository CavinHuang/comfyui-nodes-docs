# Documentation
- Class name: ConditioningCombine
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningCombine节点旨在将两个条件输入合并为单个输出。它在简化数据处理流程中扮演着关键角色，通过确保合并后的条件信息在后续模型操作中得到有效利用。

# Input types
## Required
- conditioning_1
    - 第一个条件输入对于节点的操作至关重要，因为它为组合过程提供了所需的一部分数据。它通过贡献组合条件的初始状态，显著影响最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- conditioning_2
    - 第二个条件输入同样重要，它补充了第一个输入，完成了节点生成组合输出所需的数据集。它对实现一个连贯和全面的条件结果的贡献是不可或缺的。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Output types
- combined_conditioning
    - ConditioningCombine节点的输出是组合后的条件数据，这是两个输入条件的综合。这个输出是工作流程中后续步骤的关键信息，可以用来指导模型预测或影响进一步处理。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningCombine:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning_1': ('CONDITIONING',), 'conditioning_2': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'combine'
    CATEGORY = 'conditioning'

    def combine(self, conditioning_1, conditioning_2):
        return (conditioning_1 + conditioning_2,)
```