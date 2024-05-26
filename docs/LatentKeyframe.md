# Documentation
- Class name: LatentKeyframeNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/keyframes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

该节点旨在在控制网络中管理和操作关键帧，专注于基于批次索引和强度参数集成新的键帧。它便于组织和流动关键帧数据，确保控制网络的顺畅运作。

# Input types
## Required
- batch_index
    - 批次索引是一个关键参数，它决定了关键帧在批处理过程中的位置。对于节点正确组织和引用关键帧至关重要，确保系统内准确的数据流和同步。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - 强度参数影响关键帧对整个控制网络影响的权重。它在决定关键帧对最终输出的影响程度方面非常重要，因此在节点的功能中扮演了关键角色。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- prev_latent_kf
    - 该参数代表之前的一组关键帧，节点用它来构建并整合新的关键帧。它对于保持控制网络操作中的连续性和一致性很重要。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup

# Output types
- LATENT_KF
    - 输出是包含新添加关键帧的更新后的关键帧组。这一点很重要，因为它代表了控制网络的进展，反映了通过节点操作所做的更改和调整。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class LatentKeyframeNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_index': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX, 'step': 1}), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001})}, 'optional': {'prev_latent_kf': ('LATENT_KEYFRAME',)}}
    RETURN_NAMES = ('LATENT_KF',)
    RETURN_TYPES = ('LATENT_KEYFRAME',)
    FUNCTION = 'load_keyframe'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/keyframes'

    def load_keyframe(self, batch_index: int, strength: float, prev_latent_kf: LatentKeyframeGroup=None, prev_latent_keyframe: LatentKeyframeGroup=None):
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        keyframe = LatentKeyframe(batch_index, strength)
        prev_latent_keyframe.add(keyframe)
        return (prev_latent_keyframe,)
```