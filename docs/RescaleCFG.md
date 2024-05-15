# Documentation
- Class name: RescaleCFG
- Category: advanced/model
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

RescaleCFG节点旨在通过对其参数应用缩放因子来修改模型的配置。这种调整旨在增强模型的性能或使其适应不同的操作条件，而不会改变其基本架构。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将被重新缩放的基础模型。它是节点操作的主要输入，以实现所需的缩放效果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- multiplier
    - 乘数参数至关重要，因为它决定了要应用于模型配置的缩放程度。它直接影响重新缩放过程的最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- rescaled_model
    - 重新缩放后的模型输出代表了应用缩放过程后的模型。它是节点操作的结果，并标志着模型的新配置。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class RescaleCFG:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'multiplier': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'advanced/model'

    def patch(self, model, multiplier):

        def rescale_cfg(args):
            cond = args['cond']
            uncond = args['uncond']
            cond_scale = args['cond_scale']
            sigma = args['sigma']
            sigma = sigma.view(sigma.shape[:1] + (1,) * (cond.ndim - 1))
            x_orig = args['input']
            x = x_orig / (sigma * sigma + 1.0)
            cond = (x - (x_orig - cond)) * (sigma ** 2 + 1.0) ** 0.5 / sigma
            uncond = (x - (x_orig - uncond)) * (sigma ** 2 + 1.0) ** 0.5 / sigma
            x_cfg = uncond + cond_scale * (cond - uncond)
            ro_pos = torch.std(cond, dim=(1, 2, 3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1, 2, 3), keepdim=True)
            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = multiplier * x_rescaled + (1.0 - multiplier) * x_cfg
            return x_orig - (x - x_final * sigma / (sigma * sigma + 1.0) ** 0.5)
        m = model.clone()
        m.set_model_sampler_cfg_function(rescale_cfg)
        return (m,)
```