# Documentation
- Class name: SamplerDPMPP_SDE
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerDPMPP_SDE节点旨在为从扩散模型生成样本提供自定义采样方法。它利用带有随机微分方程（SDE）方法的DPM-PP（扩散概率模型先验预测）框架来增强采样过程。对于需要精细控制采样参数以在生成的样本中实现特定特征的用户来说，此节点至关重要。

# Input types
## Required
- eta
    - ‘eta’参数对于控制采样过程中的噪声水平至关重要。它直接影响生成样本的质量和收敛性。适当调整‘eta’可以导致更稳定和高效的采样过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_noise
    - ‘s_noise’参数定义了在采样过程中应用于数据的初始噪声尺度。它在确定扩散过程的起点以及影响采样方法的整体行为方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- r
    - ‘r’参数对于调整采样算法中的收敛速率至关重要。它影响采样过程接近目标分布的速度，从而影响最终输出的保真度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_device
    - ‘noise_device’参数决定了用于生成噪声的计算设备，可以是GPU或CPU。设备的选择可以显著影响采样过程的性能和速度。
    - Comfy dtype: COMBO['gpu','cpu']
    - Python dtype: str

# Output types
- sampler
    - 输出‘sampler’是根据输入参数设置的特定要求定制的采样算法的实例。它很重要，因为它使得生成的样本符合所需的噪声特性和收敛标准。
    - Comfy dtype: SAMPLER
    - Python dtype: KSAMPLER

# Usage tips
- Infra type: GPU

# Source code
```
class SamplerDPMPP_SDE:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'eta': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 's_noise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'r': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'noise_device': (['gpu', 'cpu'],)}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, eta, s_noise, r, noise_device):
        if noise_device == 'cpu':
            sampler_name = 'dpmpp_sde'
        else:
            sampler_name = 'dpmpp_sde_gpu'
        sampler = comfy.samplers.ksampler(sampler_name, {'eta': eta, 's_noise': s_noise, 'r': r})
        return (sampler,)
```