# Documentation
- Class name: ConcatConditionings
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

该节点旨在将多个条件输入合并为单个输出。它通过将每个条件输入的第一个元素与主要条件输入连接起来，有效地结合了它们的影响。该节点在整合不同的条件信号以引导后续模型行为中发挥着关键作用。

# Input types
## Required
- conditioning1
    - 主要的条件输入，将与其他条件输入结合。它至关重要，因为它构成了合并输出的基础，影响着应用于模型的最终条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]
## Optional
- conditioning_from
    - 将与主要条件输入连接的额外条件输入。每个输入都预期对整体条件效果有所贡献，但如果存在多个条件，则会发出警告，表明只有第一个将被应用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]

# Output types
- out
    - 节点的输出是合并后的条件对列表，其中每对由主条件张量和附加条件张量连接而成的张量，以及原始条件对中次要元素的副本组成。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Any]]

# Usage tips
- Infra type: CPU

# Source code
```
class ConcatConditionings:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning1': ('CONDITIONING',)}}
    RETURN_TYPES = ('CONDITIONING',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, **kwargs):
        conditioning_to = list(kwargs.values())[0]
        for (k, conditioning_from) in list(kwargs.items())[1:]:
            out = []
            if len(conditioning_from) > 1:
                print('Warning: ConcatConditionings {k} contains more than 1 cond, only the first one will actually be applied to conditioning1.')
            cond_from = conditioning_from[0][0]
            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from), 1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)
            conditioning_to = out
        return (out,)
```