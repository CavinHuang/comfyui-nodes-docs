# Documentation
- Class name: DynamicThresholdingComfyNode
- Category: advanced/mcmonkey
- Output node: False
- Repo Ref: https://github.com/mcmonkeyprojects/sd-dynamic-thresholding

该节点动态调整模型的阈值处理过程，以达到期望的模仿水平，并控制生成的输出。它通过解释规模和变异性度量来细化模型的响应，从而根据指定的参数优化生成过程。

# Input types
## Required
- model
    - 模型参数是必不可少的，它定义了节点操作的基础。它是应用动态阈值处理过程的基础，其特征直接影响输出结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- mimic_scale
    - mimic_scale参数对于控制输出中的模仿程度至关重要。它调整阈值处理过程的强度，从而影响生成内容的最终质量和相似度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- threshold_percentile
    - threshold_percentile参数在确定生成内容的变异性方面起着重要作用。它根据分位数值设定一个阈值，用于控制特征的动态缩放。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mimic_mode
    - mimic_mode参数规定了阈值处理过程中的缩放模式。它在定义模型如何适应输入并相应调整其输出方面起着关键作用。
    - Comfy dtype: ENUM
    - Python dtype: str
- cfg_mode
    - cfg_mode参数指定了动态阈值的配置模式。它在指导节点如何解释和应用特征调整的缩放因子方面至关重要。
    - Comfy dtype: ENUM
    - Python dtype: str

# Output types
- model
    - 输出模型是动态阈值处理过程的结果。它已根据输入参数进行了优化和调整，提供了符合期望模仿和质量标准的优化和受控输出。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class DynamicThresholdingComfyNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'mimic_scale': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 100.0, 'step': 0.5}), 'threshold_percentile': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'mimic_mode': (DynThresh.Modes,), 'mimic_scale_min': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.5}), 'cfg_mode': (DynThresh.Modes,), 'cfg_scale_min': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 100.0, 'step': 0.5}), 'sched_val': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01}), 'separate_feature_channels': (['enable', 'disable'],), 'scaling_startpoint': (DynThresh.Startpoints,), 'variability_measure': (DynThresh.Variabilities,), 'interpolate_phi': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'advanced/mcmonkey'

    def patch(self, model, mimic_scale, threshold_percentile, mimic_mode, mimic_scale_min, cfg_mode, cfg_scale_min, sched_val, separate_feature_channels, scaling_startpoint, variability_measure, interpolate_phi):
        dynamic_thresh = DynThresh(mimic_scale, threshold_percentile, mimic_mode, mimic_scale_min, cfg_mode, cfg_scale_min, sched_val, 0, 999, separate_feature_channels == 'enable', scaling_startpoint, variability_measure, interpolate_phi)

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