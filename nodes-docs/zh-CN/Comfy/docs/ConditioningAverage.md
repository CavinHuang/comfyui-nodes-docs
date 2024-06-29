# Documentation
- Class name: ConditioningAverage
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ConditioningAverage节点旨在通过应用加权平均值来混合不同的条件输入。它基于指定的强度智能地将'conditioning_from'与'conditioning_to'结合起来，允许在生成模型中对条件过程进行精细控制。

# Input types
## Required
- conditioning_to
    - ‘conditioning_to’参数至关重要，因为它定义了将应用加权平均的目标条件数据。它在确定节点的最终输出中起着重要作用，通过影响条件混合的执行方式来影响结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- conditioning_from
    - ‘conditioning_from’参数是必不可少的，因为它提供了将与‘conditioning_to’平均的源条件数据。它之所以重要，是因为它决定了将混合的初始条件，从而影响节点的执行和结果输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- conditioning_to_strength
    - ‘conditioning_to_strength’参数在确定‘conditioning_to’在加权平均中的影响程度时非常关键。它通过控制‘conditioning_to’在混合中覆盖‘conditioning_from’的程度，直接影响节点的操作。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - ConditioningAverage节点的输出是包含修改后的张量和可能包含'pooled_output'的字典的元组列表。这个输出代表了加权平均混合过程的结果，对于生成模型中的进一步处理非常重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConditioningAverage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning_to': ('CONDITIONING',), 'conditioning_from': ('CONDITIONING',), 'conditioning_to_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'addWeighted'
    CATEGORY = 'conditioning'

    def addWeighted(self, conditioning_to, conditioning_from, conditioning_to_strength):
        out = []
        if len(conditioning_from) > 1:
            logging.warning('Warning: ConditioningAverage conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to.')
        cond_from = conditioning_from[0][0]
        pooled_output_from = conditioning_from[0][1].get('pooled_output', None)
        for i in range(len(conditioning_to)):
            t1 = conditioning_to[i][0]
            pooled_output_to = conditioning_to[i][1].get('pooled_output', pooled_output_from)
            t0 = cond_from[:, :t1.shape[1]]
            if t0.shape[1] < t1.shape[1]:
                t0 = torch.cat([t0] + [torch.zeros((1, t1.shape[1] - t0.shape[1], t1.shape[2]))], dim=1)
            tw = torch.mul(t1, conditioning_to_strength) + torch.mul(t0, 1.0 - conditioning_to_strength)
            t_to = conditioning_to[i][1].copy()
            if pooled_output_from is not None and pooled_output_to is not None:
                t_to['pooled_output'] = torch.mul(pooled_output_to, conditioning_to_strength) + torch.mul(pooled_output_from, 1.0 - conditioning_to_strength)
            elif pooled_output_from is not None:
                t_to['pooled_output'] = pooled_output_from
            n = [tw, t_to]
            out.append(n)
        return (out,)
```