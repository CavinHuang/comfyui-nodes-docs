# Documentation
- Class name: ConditioningConcat
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningConcat节点旨在将两个条件输入合并为单个输出。它巧妙地将源条件输入与目标条件输入沿指定维度连接起来，确保生成的输出非常适合神经网络架构中的后续处理步骤。

# Input types
## Required
- conditioning_to
    - 'conditioning_to'参数表示将与另一个条件输入连接的目标条件输入。它在确定最终输出的结构中起着关键作用，因为它决定了附加额外条件信息的基础。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]
- conditioning_from
    - 'conditioning_from'参数提供了将与'conditioning_to'结合的源条件输入。它很重要，因为它为最终连接的输出贡献了额外的上下文或特征，可能增强模型做出明智预测的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]

# Output types
- output
    - ConditioningConcat节点的输出是合并后的条件张量，整合了'conditioning_to'和'conditioning_from'输入的元素。这个输出被策略性地构建，以与下游神经网络操作兼容。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningConcat:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning_to': ('CONDITIONING',), 'conditioning_from': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'concat'
    CATEGORY = 'conditioning'

    def concat(self, conditioning_to, conditioning_from):
        out = []
        if len(conditioning_from) > 1:
            logging.warning('Warning: ConditioningConcat conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.')
        cond_from = conditioning_from[0][0]
        for i in range(len(conditioning_to)):
            t1 = conditioning_to[i][0]
            tw = torch.cat((t1, cond_from), 1)
            n = [tw, conditioning_to[i][1].copy()]
            out.append(n)
        return (out,)
```