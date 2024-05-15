# Documentation
- Class name: VideoTriangleCFGGuidance
- Category: sampling/video_models
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VideoTriangleCFGGuidance节点旨在通过应用引入可配置引导函数的补丁来增强视频模型的可控性。它修改了采样过程，根据线性配置比例混合条件和非条件输出，允许对生成的视频内容进行微调。

# Input types
## Required
- model
    - 模型参数对于VideoTriangleCFGGuidance节点至关重要，因为它代表了将被引导和修改的视频模型。节点依赖此输入来应用补丁并相应调整采样行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- min_cfg
    - min_cfg参数决定了用于混合视频模型的条件和非条件输出的配置的最小比例。它在控制采样过程中应用的引导程度方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - modified_model输出代表了已使用新的采样引导更新的视频模型。它很重要，因为它是通过VideoTriangleCFGGuidance节点应用补丁的直接结果，使得能够生成具有调整后内容特征的视频。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class VideoTriangleCFGGuidance:

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
            period = 1.0
            values = torch.linspace(0, 1, cond.shape[0], device=cond.device)
            values = 2 * (values / period - torch.floor(values / period + 0.5)).abs()
            scale = (values * (cond_scale - min_cfg) + min_cfg).reshape((cond.shape[0], 1, 1, 1))
            return uncond + scale * (cond - uncond)
        m = model.clone()
        m.set_model_sampler_cfg_function(linear_cfg)
        return (m,)
```