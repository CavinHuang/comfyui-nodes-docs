# Documentation
- Class name: LatentKeyframeGroupNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/keyframes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

LatentKeyframeGroupNode的load_keyframes方法旨在根据提供的索引强度处理和组织潜在的关键帧。它考虑了先前的潜在关键帧组和可选的潜在参数来构建一个新的关键帧组。该方法在控制网络中管理潜在空间操作的复杂性方面至关重要，确保了关键帧处理的连贯性和结构化方法。

# Input types
## Required
- index_strengths
    - index_strengths参数是一个字符串，定义了组内潜在关键帧的分布和强度。它对于确定关键帧如何影响潜在空间至关重要，对节点的运行至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prev_latent_kf
    - prev_latent_kf参数是一个可选的LatentKeyframeGroup，它为当前关键帧组提供了上下文。它对于保持潜在空间操作的连续性和一致性具有重要意义。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup
- latent_optional
    - latent_optional参数是一个可选的潜在表示，可用于进一步细化关键帧组。它在微调潜在空间调整中发挥作用。
    - Comfy dtype: LATENT
    - Python dtype: Union[Tensor, None]
- print_keyframes
    - print_keyframes参数是一个布尔标志，设置为True时启用关键帧信息的记录。这对于调试和理解节点的操作非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- LATENT_KF
    - load_keyframes方法的输出是一个LatentKeyframeGroup，它封装了处理后的关键帧。这个组对于进一步的下游处理很重要，并且代表了节点操作的结构化输出。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class LatentKeyframeGroupNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index_strengths': ('STRING', {'multiline': True, 'default': ''})}, 'optional': {'prev_latent_kf': ('LATENT_KEYFRAME',), 'latent_optional': ('LATENT',), 'print_keyframes': ('BOOLEAN', {'default': False})}}
    RETURN_NAMES = ('LATENT_KF',)
    RETURN_TYPES = ('LATENT_KEYFRAME',)
    FUNCTION = 'load_keyframes'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/keyframes'

    def validate_index(self, index: int, latent_count: int=0, is_range: bool=False, allow_negative=False) -> int:
        if is_range:
            return index
        if latent_count > 0 and index > latent_count - 1:
            raise IndexError(f"Index '{index}' out of range for the total {latent_count} latents.")
        if index < 0:
            if not allow_negative:
                raise IndexError(f'Negative indeces not allowed, but was {index}.')
            conv_index = latent_count + index
            if conv_index < 0:
                raise IndexError(f"Index '{index}', converted to '{conv_index}' out of range for the total {latent_count} latents.")
            index = conv_index
        return index

    def convert_to_index_int(self, raw_index: str, latent_count: int=0, is_range: bool=False, allow_negative=False) -> int:
        try:
            return self.validate_index(int(raw_index), latent_count=latent_count, is_range=is_range, allow_negative=allow_negative)
        except ValueError as e:
            raise ValueError(f"index '{raw_index}' must be an integer.", e)

    def convert_to_latent_keyframes(self, latent_indeces: str, latent_count: int) -> set[LatentKeyframe]:
        if not latent_indeces:
            return set()
        int_latent_indeces = [i for i in range(0, latent_count)]
        allow_negative = latent_count > 0
        chosen_indeces = set()
        groups = latent_indeces.split(',')
        groups = [g.strip() for g in groups]
        for g in groups:
            strength = 1.0
            if '=' in g:
                (g, strength_str) = g.split('=', 1)
                g = g.strip()
                try:
                    strength = float(strength_str.strip())
                except ValueError as e:
                    raise ValueError(f"strength '{strength_str}' must be a float.", e)
                if strength < 0:
                    raise ValueError(f"Strength '{strength}' cannot be negative.")
            if ':' in g:
                index_range = g.split(':', 1)
                index_range = [r.strip() for r in index_range]
                start_index = self.convert_to_index_int(index_range[0], latent_count=latent_count, is_range=True, allow_negative=allow_negative)
                end_index = self.convert_to_index_int(index_range[1], latent_count=latent_count, is_range=True, allow_negative=allow_negative)
                if len(int_latent_indeces) > 0:
                    for i in int_latent_indeces[start_index:end_index]:
                        chosen_indeces.add(LatentKeyframe(i, strength))
                else:
                    for i in range(start_index, end_index):
                        chosen_indeces.add(LatentKeyframe(i, strength))
            else:
                chosen_indeces.add(LatentKeyframe(self.convert_to_index_int(g, latent_count=latent_count, allow_negative=allow_negative), strength))
        return chosen_indeces

    def load_keyframes(self, index_strengths: str, prev_latent_kf: LatentKeyframeGroup=None, prev_latent_keyframe: LatentKeyframeGroup=None, latent_image_opt=None, print_keyframes=False):
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        curr_latent_keyframe = LatentKeyframeGroup()
        latent_count = -1
        if latent_image_opt:
            latent_count = latent_image_opt['samples'].size()[0]
        latent_keyframes = self.convert_to_latent_keyframes(index_strengths, latent_count=latent_count)
        for latent_keyframe in latent_keyframes:
            curr_latent_keyframe.add(latent_keyframe)
        if print_keyframes:
            for keyframe in curr_latent_keyframe.keyframes:
                logger.info(f'keyframe {keyframe.batch_index}:{keyframe.strength}')
        for latent_keyframe in prev_latent_keyframe.keyframes:
            curr_latent_keyframe.add(latent_keyframe)
        return (curr_latent_keyframe,)
```