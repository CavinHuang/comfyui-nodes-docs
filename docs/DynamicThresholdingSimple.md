# Documentation
- Class name: DynamicThresholdingSimpleComfyNode
- Category: advanced/mcmonkey
- Output node: False
- Repo Ref: https://github.com/mcmonkeyprojects/sd-dynamic-thresholding

该节点根据指定的百分位数和缩放因子动态调整模型的阈值设定，使得模型输出能够符合期望的特征。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了将要对其输出进行动态阈值设定的神经网络的基础架构和参数。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- mimic_scale
    - 该参数调整模型输出修改为匹配目标特征的程度，对节点的整体效果有重大影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold_percentile
    - 阈值百分位数确定了用于调整模型输出的相对阈值，这对于实现期望的输出分布至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是输入模型的修改版本，现在具有根据指定目标特征调整的阈值参数。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class DynamicThresholdingSimpleComfyNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'mimic_scale': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 100.0, 'step': 0.5}), 'threshold_percentile': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'advanced/mcmonkey'

    def patch(self, model, mimic_scale, threshold_percentile):
        dynamic_thresh = DynThresh(mimic_scale, threshold_percentile, 'CONSTANT', 0, 'CONSTANT', 0, 0, 0, 999, False, 'MEAN', 'AD', 1)

        def sampler_dyn_thresh(args):
            input = args['input']
            cond = input - args['cond']
            uncond = input - args['uncond']
            cond_scale = args['cond_scale']
            time_step = model.model.model_sampling.timestep(args['sigma'])
            time_step = time_step[0].item()
            dynamic_thresh.step = 999 - time_step
            return input - dynamic_thresh.dynthresh(cond, uncond, cond_scale, None)
        m = model.clone()
        m.set_model_sampler_cfg_function(sampler_dyn_thresh)
        return (m,)
```