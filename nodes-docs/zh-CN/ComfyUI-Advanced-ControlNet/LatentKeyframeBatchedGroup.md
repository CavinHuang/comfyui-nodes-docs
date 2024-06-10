# Documentation
- Class name: LatentKeyframeBatchedGroupNode
- Category: Adv-ControlNet 🛂🅐🅒🅝/keyframes
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

LatentKeyframeBatchedGroupNode 旨在管理和创建一批具有不同强度的潜在关键帧。它允许整合之前的潜在关键帧，并提供打印关键帧详细信息的功能。此节点在 ControlNet 框架内关键帧的生成和操作中扮演着关键角色。

# Input types
## Required
- float_strengths
    - 'float_strengths' 参数对于确定批量中每个关键帧的强度至关重要。它可以是一个单独的浮点数或浮点数的可迭代对象，直接影响节点内关键帧的创建。
    - Comfy dtype: FLOAT
    - Python dtype: Union[float, List[float]]
## Optional
- prev_latent_kf
    - 'prev_latent_kf' 参数允许将之前的潜在关键帧组整合到当前操作中。这对于在现有关键帧结构的基础上构建特别有用。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: Optional[LatentKeyframeGroup]
- print_keyframes
    - 'print_keyframes' 参数设置为 True 时，将启用关键帧信息的日志记录。这对于调试和理解关键帧通过节点的流程非常有帮助。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- LATENT_KF
    - 'LATENT_KF' 输出代表了处理输入强度并整合任何之前的关键帧后得到的潜在关键帧批量。这是 ControlNet 系统中进一步处理的关键输出。
    - Comfy dtype: LATENT_KEYFRAME
    - Python dtype: LatentKeyframeGroup

# Usage tips
- Infra type: CPU

# Source code
```
class LatentKeyframeBatchedGroupNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'float_strengths': ('FLOAT', {'default': -1, 'min': -1, 'step': 0.001, 'forceInput': True})}, 'optional': {'prev_latent_kf': ('LATENT_KEYFRAME',), 'print_keyframes': ('BOOLEAN', {'default': False})}}
    RETURN_NAMES = ('LATENT_KF',)
    RETURN_TYPES = ('LATENT_KEYFRAME',)
    FUNCTION = 'load_keyframe'
    CATEGORY = 'Adv-ControlNet 🛂🅐🅒🅝/keyframes'

    def load_keyframe(self, float_strengths: Union[float, list[float]], prev_latent_kf: LatentKeyframeGroup=None, prev_latent_keyframe: LatentKeyframeGroup=None, print_keyframes=False):
        prev_latent_keyframe = prev_latent_keyframe if prev_latent_keyframe else prev_latent_kf
        if not prev_latent_keyframe:
            prev_latent_keyframe = LatentKeyframeGroup()
        else:
            prev_latent_keyframe = prev_latent_keyframe.clone()
        curr_latent_keyframe = LatentKeyframeGroup()
        if type(float_strengths) in (float, int):
            logger.info('No batched float_strengths passed into Latent Keyframe Batch Group node; will not create any new keyframes.')
        elif isinstance(float_strengths, Iterable):
            for (idx, strength) in enumerate(float_strengths):
                keyframe = LatentKeyframe(idx, strength)
                curr_latent_keyframe.add(keyframe)
        else:
            raise ValueError(f'Expected strengths to be an iterable input, but was {type(float_strengths).__repr__}.')
        if print_keyframes:
            for keyframe in curr_latent_keyframe.keyframes:
                logger.info(f'keyframe {keyframe.batch_index}:{keyframe.strength}')
        for latent_keyframe in prev_latent_keyframe.keyframes:
            curr_latent_keyframe.add(latent_keyframe)
        return (curr_latent_keyframe,)
```