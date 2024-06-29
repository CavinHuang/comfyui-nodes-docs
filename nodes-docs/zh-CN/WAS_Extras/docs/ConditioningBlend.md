# Documentation
- Class name: WAS_ConditioningBlend
- Category: conditioning
- Output node: False
- Repo Ref: https://github.com/WASasquatch/WAS_Extras

WAS_ConditioningBlend节点旨在使用指定的混合模式和强度将两个条件输入无缝混合，确保两个输入的和谐整合。此节点在生成条件输出中发挥关键作用，通过结合不同条件信号并自定义影响程度来实现。

# Input types
## Required
- conditioning_a
    - 第一个要与另一个条件输入混合的条件输入。它是一个关键组件，因为它构成了混合的一半，并显著影响最终的条件输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- conditioning_b
    - 第二个条件输入，在混合过程中补充第一个。它至关重要，因为它有助于最终混合，影响条件输出的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]
- blending_mode
    - 混合模式决定了两个条件输入如何组合。它是一个关键参数，因为它决定了用于混合的算法，从而影响最终输出的性质。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- blending_strength
    - 混合强度参数控制混合效果的强度。它很重要，因为它允许微调混合中两个条件输入之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - 节点内用于随机数生成的种子。它通过在执行过程中保持一致的随机状态，确保结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- conditioning
    - WAS_ConditioningBlend节点的输出是一个单一的条件张量，代表了两个输入条件张量的混合结果。它很重要，因为它作为需要条件数据的后续节点的输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_ConditioningBlend:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'conditioning_a': ('CONDITIONING',), 'conditioning_b': ('CONDITIONING',), 'blending_mode': (list(blending_modes.keys()),), 'blending_strength': ('FLOAT', {'default': 0.5, 'min': -10.0, 'max': 10.0, 'step': 0.001}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('CONDITIONING',)
    RETURN_NAMES = ('conditioning',)
    FUNCTION = 'combine'
    CATEGORY = 'conditioning'

    def combine(self, conditioning_a, conditioning_b, blending_mode, blending_strength, seed):
        if seed > 0:
            torch.manual_seed(seed)
        a = conditioning_a[0][0].clone()
        b = conditioning_b[0][0].clone()
        pa = conditioning_a[0][1]['pooled_output'].clone()
        pb = conditioning_b[0][1]['pooled_output'].clone()
        cond = normalize(blending_modes[blending_mode](a, b, 1 - blending_strength))
        pooled = normalize(blending_modes[blending_mode](pa, pb, 1 - blending_strength))
        conditioning = [[cond, {'pooled_output': pooled}]]
        return (conditioning,)
```