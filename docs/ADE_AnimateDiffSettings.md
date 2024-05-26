# Documentation
- Class name: AnimateDiffSettingsNode
- Category: Animate Diff 🎭🅐🅓/ad settings
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

AnimateDiffSettingsNode 旨在生成用于调整场景差异的动画设置。它封装了调整位置嵌入和权重的逻辑，这些对于动画过程至关重要。该节点的主要功能是提供一种结构化的方法来动画化差异，确保调整在整个动画序列中一致且有效地应用。

# Input types
## Optional
- pe_adjust
    - pe_adjust 参数允许对动画中的位置嵌入进行微调。这对于实现动画元素所需的空间分布和运动至关重要。此参数直接影响动画的空间方面如何呈现，影响动画场景的整体质量和连贯性。
    - Comfy dtype: PE_ADJUST
    - Python dtype: Union[AdjustGroup, None]
- weight_adjust
    - weight_adjust 参数用于修改与动画元素相关联的权重。它在控制动画效果的强度和焦点方面起着重要作用。通过调整权重，节点可以增强或减弱动画的特定方面，从而获得更细致和针对性的视觉结果。
    - Comfy dtype: WEIGHT_ADJUST
    - Python dtype: Union[AdjustGroup, None]

# Output types
- ad_settings
    - ad_settings 输出提供了一套根据输入参数调整的全面动画设置。这个输出对于动画流水线的后续步骤至关重要，因为它决定了动画差异将如何在最终渲染的场景中体现。
    - Comfy dtype: AD_SETTINGS
    - Python dtype: AnimateDiffSettings

# Usage tips
- Infra type: CPU

# Source code
```
class AnimateDiffSettingsNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'optional': {'pe_adjust': ('PE_ADJUST',), 'weight_adjust': ('WEIGHT_ADJUST',)}}
    RETURN_TYPES = ('AD_SETTINGS',)
    CATEGORY = 'Animate Diff 🎭🅐🅓/ad settings'
    FUNCTION = 'get_ad_settings'

    def get_ad_settings(self, pe_adjust: AdjustGroup=None, weight_adjust: AdjustGroup=None):
        return (AnimateDiffSettings(adjust_pe=pe_adjust, adjust_weight=weight_adjust),)
```