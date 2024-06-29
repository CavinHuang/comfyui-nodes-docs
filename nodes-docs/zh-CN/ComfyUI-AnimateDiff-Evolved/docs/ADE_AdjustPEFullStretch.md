# Documentation
- Class name: FullStretchPENode
- Category: Animate Diff 🎭🅐🅓/ad settings/pe adjust
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

FullStretchPENode 类旨在修改动画中角色私处的属性。它通过应用各种调整，如拉伸、偏移和限制初始长度来实现这一点。该节点的主要功能是通过这些修改增强动画的视觉效果和细节。

# Input types
## Required
- pe_stretch
    - 'pe_stretch' 参数控制应用于角色私处的拉伸程度。这对于定义该区域动画的视觉范围和细节至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- print_adjustment
    - 'print_adjustment' 参数决定是否将调整细节输出到控制台。这对于调试和理解正在做的调整很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_pe_adjust
    - 'prev_pe_adjust' 参数允许对之前的私处设置进行调整。这对于根据之前的调整来完善动画很重要。
    - Comfy dtype: PE_ADJUST
    - Python dtype: Union[AdjustGroup, None]

# Output types
- PE_ADJUST
    - 输出 'PE_ADJUST' 表示对角色私处所做的最终调整集。它封装了应用于动画的视觉增强。
    - Comfy dtype: PE_ADJUST
    - Python dtype: AdjustGroup

# Usage tips
- Infra type: CPU

# Source code
```
class FullStretchPENode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pe_stretch': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX}), 'print_adjustment': ('BOOLEAN', {'default': False})}, 'optional': {'prev_pe_adjust': ('PE_ADJUST',)}}
    RETURN_TYPES = ('PE_ADJUST',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings/pe adjust'
    FUNCTION = 'get_pe_adjust'

    def get_pe_adjust(self, pe_stretch: int, print_adjustment: bool, prev_pe_adjust: AdjustGroup=None):
        if prev_pe_adjust is None:
            prev_pe_adjust = AdjustGroup()
        prev_pe_adjust = prev_pe_adjust.clone()
        adjust = AdjustPE(motion_pe_stretch=pe_stretch, print_adjustment=print_adjustment)
        prev_pe_adjust.add(adjust)
        return (prev_pe_adjust,)
```