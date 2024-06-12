# Documentation
- Class name: VideoLinearCFGGuidance
- Category: sampling/video_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VideoLinearCFGGuidance节点旨在提供一种修改视频模型采样过程指导的方法。它通过使用线性配置函数修补模型来实现这一点，该函数根据最小配置比例平滑地混合无条件和有条件的采样。这个节点增强了模型生成具有不同细节和控制水平的视频的能力。

# Input types
## Required
- model
    - 模型参数对于VideoLinearCFGGuidance节点至关重要，因为它代表了将要被修补的视频模型。正是通过这个模型，节点发挥其功能，允许定制采样过程。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- min_cfg
    - min_cfg参数确定了VideoLinearCFGGuidance节点内线性指导函数的最小配置比例。它是控制无条件和有条件采样之间混合的关键因素，从而影响输出视频的特性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - VideoLinearCFGGuidance节点的输出是一个融入了线性配置函数的修改后的视频模型。这允许对视频生成采取更细致的方法，为最终输出提供更大的灵活性和控制。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class VideoLinearCFGGuidance:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'min_cfg': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.5, 'round': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'sampling/video_models'

    def patch(self, model, min_cfg):

        def linear_cfg(args):
            cond = args['cond']
            uncond = args['uncond']
            cond_scale = args['cond_scale']
            scale = torch.linspace(min_cfg, cond_scale, cond.shape[0], device=cond.device).reshape((cond.shape[0], 1, 1, 1))
            return uncond + scale * (cond - uncond)
        m = model.clone()
        m.set_model_sampler_cfg_function(linear_cfg)
        return (m,)
```