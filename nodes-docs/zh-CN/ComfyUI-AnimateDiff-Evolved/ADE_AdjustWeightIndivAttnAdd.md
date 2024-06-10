# Documentation
- Class name: WeightAdjustIndivAttnAddNode
- Category: Animate Diff 🎭🅐🅓/ad settings/weight adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

WeightAdjustIndivAttnAddNode 类旨在调整神经网络模型中各个注意力机制的权重。它提供了一种方法来微调注意力参数，例如查询（q）、键（k）和值（v）向量，以及输出权重和偏差。此节点允许根据特定用例或实验要求修改这些参数，以定制模型行为。

# Input types
## Required
- pe_ADD
    - pe_ADD 参数用于调整模型的位置编码权重。它在模型解释序列顺序方面起着至关重要的作用，这可能显著影响模型在对输入数据顺序敏感的任务上的性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_ADD
    - attn_ADD 参数允许调整模型内的一般注意力权重。这有助于强调或淡化输入数据的某些方面，从而影响模型的焦点，并可能增强其捕捉相关信息的能力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_q_ADD
    - attn_q_ADD 参数专门针对注意力机制的查询权重。通过微调此参数，可以引导模型更多地关注某些输入特征，这对于需要深入理解输入上下文的任务特别有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_k_ADD
    - attn_k_ADD 参数负责调整注意力机制的键权重。修改此参数可以改变模型与输入数据的相关部分对齐的能力，这对于依赖准确上下文对齐的任务至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_v_ADD
    - attn_v_ADD 参数影响注意力机制内的值权重。它对于确定每个输入元素对最终输出的贡献很重要，这对于需要精确表示输入数据的任务至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_out_weight_ADD
    - attn_out_weight_ADD 参数用于调整注意力机制的输出权重。这有助于提炼模型的输出，使其更贴近期望的结果，这对于需要输出层高精度的任务特别重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_out_bias_ADD
    - attn_out_bias_ADD 参数允许调整注意力机制内的输出偏差。这对于调整模型的预测以更好地符合预期结果很有用，特别是对于需要精确输出调整的任务。
    - Comfy dtype: FLOAT
    - Python dtype: float
- other_ADD
    - other_ADD 参数为模型内其他未指定的权重提供了一般性调整。它可以用来对模型的行为进行广泛的调整，这些调整不属于其他参数的具体类别。
    - Comfy dtype: FLOAT
    - Python dtype: float
- print_adjustment
    - print_adjustment 参数是一个布尔标志，设置为 True 时启用记录权重调整的详细信息。这对于调试和理解调整如何影响模型参数很有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_weight_adjust
    - prev_weight_adjust 参数是可选的先前权重调整组，可以应用于模型。这允许继续一系列调整或应用一组预定义的调整。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: Union[AdjustGroup, None]

# Output types
- weight_adjust
    - weight_adjust 输出提供了将各个注意力调整应用于模型的结果。它包含了所有输入参数对模型权重的综合影响，提供了调整后权重的结构化表示。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class WeightAdjustIndivAttnAddNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pe_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_q_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_k_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_v_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_out_weight_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'attn_out_bias_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'other_ADD': ('FLOAT', {'default': 0.0, 'min': -2.0, 'max': 2.0, 'step': 1e-06}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_weight_adjust': ('WEIGHT_ADJUST',)}}
    RETURN_TYPES = ('WEIGHT_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/weight adjust'
    FUNCTION = 'get_weight_adjust'

    def get_weight_adjust(self, pe_ADD: float, attn_ADD: float, attn_q_ADD: float, attn_k_ADD: float, attn_v_ADD: float, attn_out_weight_ADD: float, attn_out_bias_ADD: float, other_ADD: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(pe_ADD=pe_ADD, attn_ADD=attn_ADD, attn_q_ADD=attn_q_ADD, attn_k_ADD=attn_k_ADD, attn_v_ADD=attn_v_ADD, attn_out_weight_ADD=attn_out_weight_ADD, attn_out_bias_ADD=attn_out_bias_ADD, other_ADD=other_ADD, print_adjustment=print_adjustment)
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)
```