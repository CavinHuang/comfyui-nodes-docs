# Documentation
- Class name: WeightAdjustIndivAttnMultNode
- Category: Animate Diff 🎭🅐🅓/ad settings/weight adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

WeightAdjustIndivAttnMultNode 类旨在单独调整神经网络模型中注意力机制的权重。它允许通过将它们与指定的因子相乘来微调位置编码和注意力组件的影响。此节点对于通过调整注意力过程以满足特定任务需求来优化模型性能至关重要。

# Input types
## Required
- pe_MULT
    - pe_MULT 参数对于缩放位置编码权重至关重要。它直接影响模型捕获输入的顺序的能力，这对于语言翻译或文本生成等任务至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_MULT
    - attn_MULT 参数调整整体注意力权重，影响模型对输入序列不同部分的聚焦。这对于强调或淡化某些输入特征特别有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_q_MULT
    - attn_q_MULT 参数专门针对注意力机制中的查询权重，允许修改模型查询输入数据不同元素的方式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_k_MULT
    - attn_k_MULT 参数影响注意力机制中的键权重，它决定了模型如何将输入序列与上下文对齐。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_v_MULT
    - attn_v_MULT 参数修改注意力机制中的值权重，这对于模型衡量不同输入元素的重要性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_out_weight_MULT
    - attn_out_weight_MULT 参数缩放开了注意力机制的输出权重，这对于模型中输入序列的最终表示非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- attn_out_bias_MULT
    - attn_out_bias_MULT 参数调整注意力机制输出的偏置项，这有助于微调模型的预测。
    - Comfy dtype: FLOAT
    - Python dtype: float
- other_MULT
    - other_MULT 参数为模型中未明确分类的其他权重组件提供通用的缩放因子。
    - Comfy dtype: FLOAT
    - Python dtype: float
- print_adjustment
    - print_adjustment 参数决定节点是否输出详细说明对权重所做的调整的日志。这对于调试和理解调整的影响非常有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_weight_adjust
    - prev_weight_adjust 参数允许提供先前的权重调整组，使节点能够基于现有调整进行构建，或者重置并重新开始。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: Union[AdjustGroup, None]

# Output types
- weight_adjust
    - 节点的输出是一个 WEIGHT_ADJUST 对象，它封装了对模型权重所做的调整。这个对象可以用来将这些调整应用于模型，或者在后续节点中进一步细化调整。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class WeightAdjustIndivAttnMultNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pe_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_q_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_k_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_v_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_out_weight_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'attn_out_bias_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'other_MULT': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 2.0, 'step': 1e-06}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_weight_adjust': ('WEIGHT_ADJUST',)}}
    RETURN_TYPES = ('WEIGHT_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/weight adjust'
    FUNCTION = 'get_weight_adjust'

    def get_weight_adjust(self, pe_MULT: float, attn_MULT: float, attn_q_MULT: float, attn_k_MULT: float, attn_v_MULT: float, attn_out_weight_MULT: float, attn_out_bias_MULT: float, other_MULT: float, print_adjustment: bool, prev_weight_adjust: AdjustGroup=None):
        if prev_weight_adjust is None:
            prev_weight_adjust = AdjustGroup()
        prev_weight_adjust = prev_weight_adjust.clone()
        adjust = AdjustWeight(pe_MULT=pe_MULT, attn_MULT=attn_MULT, attn_q_MULT=attn_q_MULT, attn_k_MULT=attn_k_MULT, attn_v_MULT=attn_v_MULT, attn_out_weight_MULT=attn_out_weight_MULT, attn_out_bias_MULT=attn_out_bias_MULT, other_MULT=other_MULT, print_adjustment=print_adjustment)
        prev_weight_adjust.add(adjust)
        return (prev_weight_adjust,)
```