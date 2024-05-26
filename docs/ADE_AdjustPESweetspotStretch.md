# Documentation
- Class name: SweetspotStretchPENode
- Category: Animate Diff 🎭🅐🅓/ad settings/pe adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

SweetspotStretchPENode 类旨在通过拉伸或压缩峰值效果（PE）来调整动画的峰值效果。该节点允许对动画的动态进行微调，确保 PE 最佳地定位和缩放以实现所需的视觉效果。

# Input types
## Required
- sweetspot
    - 'sweespot' 参数定义了动画中峰值效果的初始长度。这对于确定 PE 调整过程的起始点至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- new_sweetspot
    - 'new_sweetspot' 参数指定了将峰值效果调整到的目标长度。它是控制动画 PE 最终外观的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- print_adjustment
    - 'print_adjustment' 参数是一个布尔标志，当设置为 True 时，指示节点打印出 PE 调整过程的详细信息。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_pe_adjust
    - 'prev_pe_adjust' 参数是可选的以前调整的组，可以应用于当前的 PE 调整。它允许对复杂动画场景进行调整的链式处理。
    - Comfy dtype: PE_ADJUST
    - Python dtype: Union[AdjustGroup, None]

# Output types
- PE_ADJUST
    - 节点的输出是一个包含新 PE 调整以及任何先前调整的 AdjustGroup 对象。此对象用于将 PE 调整应用于动画。
    - Comfy dtype: PE_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class SweetspotStretchPENode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'sweetspot': ('INT', {'default': 16, 'min': 0, 'max': BIGMAX}), 'new_sweetspot': ('INT', {'default': 16, 'min': 0, 'max': BIGMAX}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_pe_adjust': ('PE_ADJUST',)}}
    RETURN_TYPES = ('PE_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/pe adjust'
    FUNCTION = 'get_pe_adjust'

    def get_pe_adjust(self, sweetspot: int, new_sweetspot: int, print_adjustment: bool, prev_pe_adjust: AdjustGroup=None):
        if prev_pe_adjust is None:
            prev_pe_adjust = AdjustGroup()
        prev_pe_adjust = prev_pe_adjust.clone()
        adjust = AdjustPE(cap_initial_pe_length=sweetspot, interpolate_pe_to_length=new_sweetspot, print_adjustment=print_adjustment)
        prev_pe_adjust.add(adjust)
        return (prev_pe_adjust,)
```