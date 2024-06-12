# Documentation
- Class name: WeightAdjustIndivMultNode
- Category: Animate Diff 🎭🅐🅓/ad settings/weight adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

WeightAdjustIndivMultNode 类旨在通过乘法单独修改模型的权重。它提供了一种方法，可以根据预定义的乘数（如 pe_MULT、attn_MULT 和 other_MULT）调整模型的不同部分的权重，允许对模型参数进行微调，而不会改变其底层结构。如果需要，该节点还支持打印调整细节，提供对权重修改过程的透明度。

# Input types
## Required
- pe_MULT
    - pe_MULT 参数是一个乘数，用于调整模型中与位置编码（PE）相关的权重。它在微调模型对输入元素顺序的敏感度中起着关键作用，这可以显著影响模型在依赖序列顺序的任务上的性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_MULT
    - attn_MULT 参数是模型中注意力机制权重的乘数。通过调整此值，可以控制注意力机制对模型输出的影响，这对于需要对上下文和元素之间的关系有细致理解的任务至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- other_MULT
    - other_MULT 参数是一个通用乘数，可以应用于模型中未被 pe_MULT 或 attn_MULT 涵盖的其他权重。它为特定用例或实验设置中调整模型行为提供了灵活性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- print_adjustment
    - print_adjustment 参数是一个布尔标志，设置为 True 时启用记录权重调整细节。这对于开发人员在调整过程中跟踪和验证对模型权重所做的更改非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_weight_adjust
    - prev_weight_adjust 参数允许提供先前的权重调整组，可用于在现有权重调整的基础上进行构建或修改。当需要在迭代调整中保留先前调整步骤的状态并进一步改进时，此参数特别有用。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Output types
- WEIGHT_ADJUST
    - WeightAdjustIndivMultNode 的输出是一个 AdjustGroup 对象，它封装了应用于模型的结果权重调整。这个对象可以用来进一步完善模型或将调整应用于另一个模型实例。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class WeightAdjustIndivMultNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pe_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'other_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_weight_adjust': ('WEIGHT_ADJUST',)}}
    RETURN_TYPES = ('WEIGHT_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/weight adjust'
    FUNCTION = 'get_weight_adjust'

    def get_weight_adjust(self, pe_MULT: float, attn_MULT: float, other_MULT: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(pe_MULT=pe_MULT, attn_MULT=attn_MULT, other_MULT=other_MULT, print_adjustment=print_adjustment)
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)
```