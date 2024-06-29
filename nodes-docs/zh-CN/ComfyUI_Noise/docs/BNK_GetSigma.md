# Documentation
- Class name: GetSigma
- Category: latent/noise
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_Noise.git

该节点旨在计算sigma值，这是在生成模型上下文中衡量噪声或信噪比的指标。它处理模型在指定步骤范围内的输出，以确定sigma的变化，提供对模型行为和噪声特性的洞察。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了要分析的生成模型。它通过确定用于计算sigma值的数据来源，影响整个处理过程。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- sampler_name
    - 采样器名称决定了从模型中采样的方法，这反过来影响了sigma的计算，因为它影响了采样数据的质量和分布。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: str
- scheduler
    - 调度器参数至关重要，因为它控制采样过程，包括去噪过程，这直接影响sigma的计算，通过改变采样数据中的噪声水平。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: str
- steps
    - 步骤参数定义了计算sigma值的迭代范围，影响噪声分析的全面性。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - 该参数指定了sigma计算的起始点，确定了噪声分析的初始状态及其在指定步骤中的演变。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 结束步骤参数设置了sigma计算的终点，影响了噪声分析的最终状态以及在步骤范围内sigma的整体变化。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sigma
    - 输出的sigma值代表了在指定步骤范围内噪声特性的变化，提供了模型在噪声减少和信号清晰度方面的性能度量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: GPU

# Source code
```
class GetSigma:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'steps': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'calc_sigma'
    CATEGORY = 'latent/noise'

    def calc_sigma(self, model, sampler_name, scheduler, steps, start_at_step, end_at_step):
        device = comfy.model_management.get_torch_device()
        end_at_step = min(steps, end_at_step)
        start_at_step = min(start_at_step, end_at_step)
        real_model = None
        comfy.model_management.load_model_gpu(model)
        real_model = model.model
        sampler = comfy.samplers.KSampler(real_model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        return (sigma.cpu().numpy(),)
```