# Documentation
- Class name: SamplerDPMPP_3M_SDE
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerDPMPP_3M_SDE节点旨在使用特定的采样方法（称为DPM++，配备3-Mixture SDE调度器）从训练好的模型生成高质量样本。它适用于需要高效和高保真度采样的场景，提供速度和样本质量之间的平衡。

# Input types
## Required
- eta
    - 参数'eta'控制采样过程中的探索率。它是决定生成样本多样性的关键因素。调整'eta'可以导致输出中的变化更多或更少，从而影响结果的整体创造性和独特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_noise
    - 参数's_noise'定义了采样过程中应用的初始噪声水平。它在采样算法的初始状态中起着重要作用，影响生成样本的起点。此参数对于设置正确的噪声条件以实现所需的样本质量至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- noise_device
    - 参数'noise_device'指定用于生成噪声的计算设备，可以是GPU或CPU。这个选择可以影响采样过程的性能和效率，特别是在需要高计算能力以实现更快处理的场景中。
    - Comfy dtype: COMBO['gpu', 'cpu']
    - Python dtype: str

# Output types
- sampler
    - 输出'sampler'是为DPM++ 3-Mixture SDE调度器的特定需求量身定制的采样方法的实例。它封装了执行采样过程所需的功能，为从模型生成高质量样本提供了一种结构化的方法。
    - Comfy dtype: SAMPLER
    - Python dtype: KSAMPLER

# Usage tips
- Infra type: GPU

# Source code
```
class SamplerDPMPP_3M_SDE:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'eta': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 's_noise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'noise_device': (['gpu', 'cpu'],)}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, eta, s_noise, noise_device):
        if noise_device == 'cpu':
            sampler_name = 'dpmpp_3m_sde'
        else:
            sampler_name = 'dpmpp_3m_sde_gpu'
        sampler = comfy.samplers.ksampler(sampler_name, {'eta': eta, 's_noise': s_noise})
        return (sampler,)
```