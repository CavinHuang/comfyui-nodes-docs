# Documentation
- Class name: WeightAdjustIndivAddNode
- Category: Animate Diff 🎭🅐🅓/ad settings/weight adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

WeightAdjustIndivAddNode 旨在通过向不同类型的参数添加特定值来单独调整模型的权重。它封装了根据指定标准进行修改的逻辑，确保以结构化和模块化的方式应用这些调整。

# Input types
## Required
- pe_ADD
    - pe_ADD 参数允许调整位置编码权重。它在微调模型对输入序列结构的理解中起着至关重要的作用，这对于依赖于元素顺序的任务至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_ADD
    - attn_ADD 参数用于修改注意力机制的权重。通过调整此参数，可以增强模型聚焦输入的不同部分的能力，可能有助于提高模型在需要对上下文有细微理解的任务上的性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- other_ADD
    - other_ADD 参数用于调整不属于预定义类别的权重。它提供了微调模型的灵活性，以覆盖其他参数未涵盖的方式，允许进行更广泛的调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- print_adjustment
    - print_adjustment 标志控制是否将对权重所做的调整记录在日志中。这对于调试和理解调整对模型行为的影响非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_weight_adjust
    - prev_weight_adjust 参数是可选的先前调整组，可以应用于模型。这允许继续一系列调整或应用一组预定义的修改。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Output types
- weight_adjust
    - WeightAdjustIndivAddNode 的输出是一个 WEIGHT_ADJUST 对象，它代表了对模型权重所做的集体调整。这个对象可以用来进一步完善模型或将调整应用于另一个模型实例。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class WeightAdjustIndivAddNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pe_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'other_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_weight_adjust': ('WEIGHT_ADJUST',)}}
    RETURN_TYPES = ('WEIGHT_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/weight adjust'
    FUNCTION = 'get_weight_adjust'

    def get_weight_adjust(self, pe_ADD: float, attn_ADD: float, other_ADD: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(pe_ADD=pe_ADD, attn_ADD=attn_ADD, other_ADD=other_ADD, print_adjustment=print_adjustment)
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)
```