# Documentation
- Class name: ConditioningZeroOut
- Category: advanced/conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningZeroOut节点旨在通过将条件数据中的特定元素（如'pooled_output'）置零来操作条件数据。这一过程对于控制神经网络中信息的流动至关重要，它允许在不改变数据底层结构的情况下，有针对性地修改模型的预测。

# Input types
## Required
- conditioning
    - 'conditioning'参数对于节点的操作至关重要，因为它提供了将被处理的输入数据。这个输入显著影响节点的执行和零化操作的结果，决定了条件数据中哪些素被定位为修改的目标。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]

# Output types
- conditioning
    - 输出的'conditioning'参数代表了zero_out操作后修改的条件数据。它很重要，因为它携带了可以直接影响神经网络处理流程中后续步骤的更新信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, Any]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningZeroOut:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'zero_out'
    CATEGORY = 'advanced/conditioning'

    def zero_out(self, conditioning):
        c = []
        for t in conditioning:
            d = t[1].copy()
            if 'pooled_output' in d:
                d['pooled_output'] = torch.zeros_like(d['pooled_output'])
            n = [torch.zeros_like(t[0]), d]
            c.append(n)
        return (c,)
```