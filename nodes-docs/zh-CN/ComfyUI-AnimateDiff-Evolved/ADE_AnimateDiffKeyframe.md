# Documentation
- Class name: ADKeyframeNode
- Category: Animate Diff 🎭🅐🅓
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

ADKeyframeNode 类用于管理动画差异的关键帧。它提供加载和操作关键帧的功能，确保动画序列的连贯性和明确性。此节点对于创建平滑过渡和维护整个动画序列的完整性至关重要。

# Input types
## Required
- start_percent
    - start_percent 参数定义了关键帧在动画时间线中的起始位置。它对于确定动画的时机和确保关键帧序列的正确排序至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- prev_ad_keyframes
    - prev_ad_keyframes 参数允许用户提供一组先前的关键帧，新的关键帧将被添加到这些关键帧中。这对于保持连续性并在现有动画框架上构建至关重要。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: ADKeyframeGroup
- scale_multival
    - scale_multival 参数调整关键帧处动画的缩放。它对于控制动画变化的强度和在序列特定点的范围至关重要。
    - Comfy dtype: MULTIVAL
    - Python dtype: Union[float, torch.Tensor]
- effect_multival
    - effect_multival 参数用于修改关键帧处的效果强度。它在微调动画在特定时刻的视觉影响中起着至关重要的作用。
    - Comfy dtype: MULTIVAL
    - Python dtype: Union[float, torch.Tensor]
- inherit_missing
    - inherit_missing 参数决定关键帧是否应该从先前的关键帧继承属性，如果它们没有被明确定义的话。这对于维护整个序列中一致的动画风格至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- guarantee_steps
    - guarantee_steps 参数确保关键帧之间的最小步数，这对于动画的平滑度和流畅性很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- AD_KEYFRAMES
    - ADKeyframeNode 的输出是一组关键帧，代表了带有新添加或修改的关键帧的动画序列。这个输出对于动画的后续处理和渲染非常重要。
    - Comfy dtype: AD_KEYFRAMES
    - Python dtype: ADKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class ADKeyframeNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'prev_ad_keyframes': ('AD_KEYFRAMES',), 'scale_multival': ('MULTIVAL',), 'effect_multival': ('MULTIVAL',), 'inherit_missing': ('BOOLEAN', {'default': True}), 'guarantee_steps': ('INT', {'default': 1, 'min': 0, 'max': BIGMAX})}}
    RETURN_TYPES = ('AD_KEYFRAMES',)
    FUNCTION = 'load_keyframe'
    CATEGORY = 'Animate Diff 🎭🅐🅓'

    def load_keyframe(self, start_percent: float, prev_ad_keyframes=None, scale_multival: Union[float, torch.Tensor]=None, effect_multival: Union[float, torch.Tensor]=None, inherit_missing: bool=True, guarantee_steps: int=1):
        if not prev_ad_keyframes:
            prev_ad_keyframes = ADKeyframeGroup()
        prev_ad_keyframes = prev_ad_keyframes.clone()
        keyframe = ADKeyframe(start_percent=start_percent, scale_multival=scale_multival, effect_multival=effect_multival, inherit_missing=inherit_missing, guarantee_steps=guarantee_steps)
        prev_ad_keyframes.add(keyframe)
        return (prev_ad_keyframes,)
```