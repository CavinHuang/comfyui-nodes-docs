# Documentation
- Class name: RescaleClassifierFreeGuidance
- Category: custom_node_experiments
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

RescaleClassifierFreeGuidance节点的'patch'方法旨在通过引入一个重新缩放操作来修改给定的模型。它调整模型的内部配置，对分类器的引导信号应用动态缩放因子，从而允许对模型的行为进行更精细的控制。这种方法特别适用于微调模型的输出以满足特定的要求或约束。

# Input types
## Required
- model
    - ‘model’参数对于节点至关重要，因为它代表了将由‘patch’方法修改的机器学习模型。它是主要的输入，决定了节点的操作以及修补过程后模型的后续行为。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- multiplier
    - ‘multiplier’参数在控制应用于模型引导信号的重新缩放程度中起着关键作用。它是一个浮点数，决定了原始配置和重新缩放配置之间的平衡，直接影响修补后模型的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - ‘modified_model’输出是将‘patch’方法应用于输入模型的结果。它是原始模型的修改版本，其引导信号的缩放因子已调整，这可能导致基于指定的乘数产生不同的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class RescaleClassifierFreeGuidance:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'multiplier': ('FLOAT', {'default': 0.7, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'custom_node_experiments'

    def patch(self, model, multiplier):

        def rescale_cfg(args):
            cond = args['cond']
            uncond = args['uncond']
            cond_scale = args['cond_scale']
            x_cfg = uncond + cond_scale * (cond - uncond)
            ro_pos = torch.std(cond, dim=(1, 2, 3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1, 2, 3), keepdim=True)
            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = multiplier * x_rescaled + (1.0 - multiplier) * x_cfg
            return x_final
        m = model.clone()
        m.set_model_sampler_cfg_function(rescale_cfg)
        return (m,)
```