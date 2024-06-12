# Documentation
- Class name: ManualAdjustPENode
- Category: Animate Diff 🎭🅐🅓/ad settings/pe adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

该节点旨在手动调整与动画工作流中PE（个人能量）相关的参数。它允许微调初始和最终PE索引，插值到特定长度，并提供打印调整的选项。节点在自定义动画中的能量水平以实现所需效果中发挥着关键作用。

# Input types
## Required
- cap_initial_pe_length
    - 此参数定义了要限制的PE的初始长度，这对于控制动画中的起始能量水平至关重要。它直接影响能量动态和整个动画序列的整体感觉。
    - Comfy dtype: INT
    - Python dtype: int
- interpolate_pe_to_length
    - 插值参数允许PE平滑过渡到指定长度，确保动画中能量的和谐流动。这是实现能量水平自然进展的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- initial_pe_idx_offset
    - 此偏移参数用于调整PE的起始索引，可以显著改变动画的初始能量状态。它提供了一种在序列开始时微调能量输入的方法。
    - Comfy dtype: INT
    - Python dtype: int
- final_pe_idx_offset
    - 最终PE索引偏移对于定义动画的结束能量状态至关重要。它允许对动画序列结束时能量的解决方式进行精确控制。
    - Comfy dtype: INT
    - Python dtype: int
- print_adjustment
    - 这个布尔标志决定了对PE所做的调整是否会被打印出来。这对于调试和理解调整对动画的影响非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_pe_adjust
    - 以前的PE调整组提供了一种在现有调整基础上构建的方法，允许在动画中产生累积效果。它是一个可选参数，增强了节点功能的灵活性。
    - Comfy dtype: PE_ADJUST
    - Python dtype: AdjustGroup

# Output types
- PE_ADJUST
    - 该节点的输出是一个包含对PE进行手动调整的AdjustGroup对象。它很重要，因为它直接影响最终的能量水平和动画的整体结果。
    - Comfy dtype: PE_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class ManualAdjustPENode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'cap_initial_pe_length': ('INT', {'default': 0, 'min': 0, 'step': 1}), 'interpolate_pe_to_length': ('INT', {'default': 0, 'min': 0, 'step': 1}), 'initial_pe_idx_offset': ('INT', {'default': 0, 'min': 0, 'step': 1}), 'final_pe_idx_offset': ('INT', {'default': 0, 'min': 0, 'step': 1}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_pe_adjust': ('PE_ADJUST',)}}
    RETURN_TYPES = ('PE_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/pe adjust'
    FUNCTION = 'get_pe_adjust'

    def get_pe_adjust(self, cap_initial_pe_length: int, interpolate_pe_to_length: int, initial_pe_idx_offset: int, final_pe_idx_offset: int, print_adjustment: bool, prev_pe_adjust: AdjustGroup=None):
        if prev_pe_adjust is None:
            prev_pe_adjust = AdjustGroup()
        prev_pe_adjust = prev_pe_adjust.clone()
        adjust = AdjustPE(cap_initial_pe_length=cap_initial_pe_length, interpolate_pe_to_length=interpolate_pe_to_length, initial_pe_idx_offset=initial_pe_idx_offset, final_pe_idx_offset=final_pe_idx_offset, print_adjustment=print_adjustment)
        prev_pe_adjust.add(adjust)
        return (prev_pe_adjust,)
```