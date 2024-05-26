# Documentation
- Class name: KfKeyframedCondition
- Category: RootCategory
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfKeyframedCondition节点旨在将条件元素整合到关键帧结构中，允许在不同时间点对数据进行操作和转换。它在序列中条件的动态调整中发挥关键作用，确保状态之间平滑且连贯的过渡。

# Input types
## Required
- conditioning
    - conditioning参数对于定义将在特定关键帧应用的初始状态或条件至关重要。它为后续的转换和插值设定了基础，影响序列的整体行为。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[torch.Tensor, Dict[str, torch.Tensor]]
## Optional
- time
    - time参数指定了序列中将附加条件的时间位置。它对于确定条件的顺序及其对系统演变状态的影响至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation_method
    - 插值方法决定了条件在关键帧之间如何过渡。它对于创建条件的自然流动非常重要，并且可以极大地影响序列的最终输出。
    - Comfy dtype: COMBO[linear, easeIn, easeOut, easeInOut]
    - Python dtype: str

# Output types
- kf_cond_t
    - kf_cond_t输出代表了指定时间的关键帧条件，包含了转换后的条件及其插值方法。它是序列中的关键组成部分，指导系统状态的进展。
    - Comfy dtype: KEYFRAMED_CONDITION
    - Python dtype: kf.Keyframe
- kf_cond_pooled
    - 当存在kf_cond_pooled输出时，它提供了在指定时间应用的额外条件层。它为系统演变状态的复杂性和细微差别做出了贡献。
    - Comfy dtype: KEYFRAMED_CONDITION
    - Python dtype: Optional[kf.Keyframe]
- cond_dict
    - cond_dict输出是一个包含条件详细信息的字典，包括任何池化输出。它作为指定时间条件状态的参考，便于进一步的分析和处理。
    - Comfy dtype: Dict[str, torch.Tensor]
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class KfKeyframedCondition:
    """
    Attaches a condition to a keyframe
    """
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CONDITION',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'conditioning': ('CONDITIONING', {}), 'time': ('FLOAT', {'default': 0, 'step': 1}), 'interpolation_method': (list(kf.interpolation.EASINGS.keys()), {'default': 'linear'})}}

    def main(self, conditioning, time, interpolation_method):
        (cond_tensor, cond_dict) = conditioning[0]
        cond_tensor = cond_tensor.clone()
        kf_cond_t = kf.Keyframe(t=time, value=cond_tensor, interpolation_method=interpolation_method)
        cond_pooled = cond_dict.get('pooled_output')
        cond_dict = deepcopy(cond_dict)
        kf_cond_pooled = None
        if cond_pooled is not None:
            cond_pooled = cond_pooled.clone()
            kf_cond_pooled = kf.Keyframe(t=time, value=cond_pooled, interpolation_method=interpolation_method)
            cond_dict['pooled_output'] = cond_pooled
        return ({'kf_cond_t': kf_cond_t, 'kf_cond_pooled': kf_cond_pooled, 'cond_dict': cond_dict},)
```