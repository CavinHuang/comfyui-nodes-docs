# Documentation
- Class name: LatentKeyframeInterpolationNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/keyframes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

LatentKeyframeInterpolationNode 旨在在潜在空间中对关键帧进行插值，允许在生成过程中进行平滑过渡。它通过根据指定的强度和插值方法（可以是线性或各种缓动函数）计算中间关键帧来实现这一点。该节点在增强潜在表示生成的流畅性和控制方面发挥着关键作用。

# Input types
## Required
- batch_index_from
    - 插值开始的批次索引，定义了关键帧序列中的初始位置。这对于确定过渡的起始点至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- strength_from
    - 起始关键帧处的强度值，它影响插值过程中初始状态的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_index_to_excl
    - 计算插值的批次索引，不包括索引本身，定义序列的结束位置。
    - Comfy dtype: INT
    - Python dtype: int
- strength_to
    - 结束关键帧处的强度值，确定插值后最终状态的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation
    - 在关键帧之间使用的插值类型，可以是线性的或者是一个缓动函数，以实现更自然的过渡。
    - Comfy dtype: COMBO[LINEAR, EASE_IN, EASE_OUT, EASE_IN_OUT]
    - Python dtype: str
## Optional
- prev_latent_kf
    - 一个可选的先前的潜在关键帧组，它为插值提供上下文，允许更有信息量的生成过程。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup
- print_keyframes
    - 一个布尔标志，当设置为 true 时，将打印生成的关键帧的详细信息，用于调试目的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- LATENT_KF
    - 生成的插值潜在关键帧组，代表初始和最终状态之间的过渡。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class LatentKeyframeInterpolationNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'batch_index_from': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX, 'step': 1}), 'batch_index_to_excl': ('INT', {'default': 0, 'min': BIGMIN, 'max': BIGMAX, 'step': 1}), 'strength_from': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'strength_to': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.001}), 'interpolation': ([SI.LINEAR, SI.EASE_IN, SI.EASE_OUT, SI.EASE_IN_OUT],)}, 'optional': {'prev_latent_kf': ('LATENT_KEYFRAME',), 'print_keyframes': ('BOOLEAN', {'default': False})}}
    RETURN_NAMES = ('LATENT_KF',)
    RETURN_TYPES = ('LATENT_KEYFRAME',)
    FUNCTION = 'load_keyframe'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/keyframes'

    def load_keyframe(self, batch_index_from: int, strength_from: float, batch_index_to_excl: int, strength_to: float, interpolation: str, prev_latent_kf: LatentKeyframeGroup=None, prev_latent_keyframe: LatentKeyframeGroup=None, print_keyframes=False):
        if batch_index_from > batch_index_to_excl:
            raise ValueError('batch_index_from must be less than or equal to batch_index_to.')
        if batch_index_from < 0 and batch_index_to_excl >= 0:
            raise ValueError('batch_index_from and batch_index_to must be either both positive or both negative.')
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        curr_latent_keyframe = LatentKeyframeGroup()
        steps = batch_index_to_excl - batch_index_from
        diff = strength_to - strength_from
        if interpolation == SI.LINEAR:
            weights = np.linspace(strength_from, strength_to, steps)
        elif interpolation == SI.EASE_IN:
            index = np.linspace(0, 1, steps)
            weights = diff * np.power(index, 2) + strength_from
        elif interpolation == SI.EASE_OUT:
            index = np.linspace(0, 1, steps)
            weights = diff * (1 - np.power(1 - index, 2)) + strength_from
        elif interpolation == SI.EASE_IN_OUT:
            index = np.linspace(0, 1, steps)
            weights = diff * ((1 - np.cos(index * np.pi)) / 2) + strength_from
        for i in range(steps):
            keyframe = LatentKeyframe(batch_index_from + i, float(weights[i]))
            curr_latent_keyframe.add(keyframe)
        if print_keyframes:
            for keyframe in curr_latent_keyframe.keyframes:
                logger.info(f'keyframe {keyframe.batch_index}:{keyframe.strength}')
        for latent_keyframe in prev_latent_keyframe.keyframes:
            curr_latent_keyframe.add(latent_keyframe)
        return (curr_latent_keyframe,)
```