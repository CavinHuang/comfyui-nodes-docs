# Documentation
- Class name: TimestepKeyframeNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/keyframes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

TimestepKeyframeNode 是生成高级控制网络关键帧过程中的一个关键组件。它旨在根据指定的参数，如起始百分比和强度，促进关键帧的创建和操作。该节点在定义动画或模拟的时间结构中起着至关重要的作用，确保状态之间的过渡平滑且连贯。

# Input types
## Required
- start_percent
    - start_percent 参数定义了关键帧在时间线中的初始位置，这对于确定动画中事件的顺序至关重要。它影响关键帧如何与其他元素交互，并有助于整体动画流程。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- strength
    - strength 参数调整关键帧对整体动画的影响。它允许微调关键帧的影响，确保它以符合创意愿景的方式对动画做出贡献。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cn_weights
    - cn_weights 参数指定要应用于控制网的权重，这对于形成动画对关键帧的响应行为至关重要。它是实现期望效果和结果的关键方面。
    - Comfy dtype: CONTROL_NET_WEIGHTS
    - Python dtype: ControlWeights
- latent_keyframe
    - latent_keyframe 参数提供了一种将潜在关键帧纳入动画的方法，为事件序列增加了深度和复杂性。它是创建复杂和详细动画的重要工具。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup

# Output types
- TIMESTEP_KF
    - TimestepKeyframeNode 的输出是 TimestepKeyframe，它代表了具有特定属性（如起始百分比和强度）的动画中的一个时刻。这个输出非常重要，因为它构成了动画后续处理和渲染的基础。
    - Comfy dtype: TIMESTEP_KEYFRAME
    - Python dtype: TimestepKeyframe

# Usage tips
- Infra type: CPU

# Source code
```
class TimestepKeyframeNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start_percent': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'prev_timestep_kf': ('TIMESTEP_KEYFRAME',), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'cn_weights': ('CONTROL_NET_WEIGHTS',), 'latent_keyframe': ('LATENT_KEYFRAME',), 'null_latent_kf_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'inherit_missing': ('BOOLEAN', {'default': True}), 'guarantee_usage': ('BOOLEAN', {'default': True}), 'mask_optional': ('MASK',)}}
    RETURN_NAMES = ('TIMESTEP_KF',)
    RETURN_TYPES = ('TIMESTEP_KEYFRAME',)
    FUNCTION = 'load_keyframe'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/keyframes'

    def load_keyframe(self, start_percent: float, strength: float=1.0, cn_weights: ControlWeights=None, control_net_weights: ControlWeights=None, latent_keyframe: LatentKeyframeGroup=None, prev_timestep_kf: TimestepKeyframeGroup=None, prev_timestep_keyframe: TimestepKeyframeGroup=None, null_latent_kf_strength: float=0.0, inherit_missing=True, guarantee_usage=True, mask_optional=None, interpolation: str=SI.NONE):
        control_net_weights = control_net_weights if control_net_weights else cn_weights
        prev_timestep_keyframe = prev_timestep_keyframe if prev_timestep_keyframe else prev_timestep_kf
        if not prev_timestep_keyframe:
            prev_timestep_keyframe = TimestepKeyframeGroup()
        else:
            prev_timestep_keyframe = prev_timestep_keyframe.clone()
        keyframe = TimestepKeyframe(start_percent=start_percent, strength=strength, interpolation=interpolation, null_latent_kf_strength=null_latent_kf_strength, control_weights=control_net_weights, latent_keyframes=latent_keyframe, inherit_missing=inherit_missing, guarantee_usage=guarantee_usage, mask_hint_orig=mask_optional)
        prev_timestep_keyframe.add(keyframe)
        return (prev_timestep_keyframe,)
```