# Documentation
- Class name: SamplerDPMPP_2M_SDE
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerDPMPP_2M_SDE类旨在提供一种从概率分布生成数据点的采样方法。它利用SDE（随机微分方程）方法创建一个收敛于所需分布的马尔可夫链。这个节点特别适用于需要高质量样本且计算效率至关重要的应用场景。

# Input types
## Required
- solver_type
    - solver_type参数决定了解决底层SDE所使用的数值方法。它对采样过程的准确性和稳定性至关重要。可用选项有'midpoint'和'heun'，每种方法在速度和精度之间提供不同的权衡。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- eta
    - eta参数控制SDE采样过程中的学习率。它显著影响收敛速度和生成样本的质量。在采样空间中实现探索与利用之间平衡的一个良好选择的eta值是至关重要的。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s_noise
    - s_noise参数代表采样过程中的噪声水平。它是确定生成样本变异性的一个重要因素。调整s_noise可以帮助实现输出中所需的多样性水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_device
    - noise_device参数指定了采样过程中用于生成噪声的计算设备。它可以设置为'gpu'或'cpu'，这取决于可用的硬件和所需的性能特性。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- sampler
    - SamplerDPMPP_2M_SDE节点的输出是一个封装了配置好的采样方法的采样器对象。这个对象可以用来根据节点配置期间提供的参数，从指定的分布中生成样本。
    - Comfy dtype: SAMPLER
    - Python dtype: KSAMPLER

# Usage tips
- Infra type: GPU

# Source code
```
class SamplerDPMPP_2M_SDE:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'solver_type': (['midpoint', 'heun'],), 'eta': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 's_noise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False}), 'noise_device': (['gpu', 'cpu'],)}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def get_sampler(self, solver_type, eta, s_noise, noise_device):
        if noise_device == 'cpu':
            sampler_name = 'dpmpp_2m_sde'
        else:
            sampler_name = 'dpmpp_2m_sde_gpu'
        sampler = comfy.samplers.ksampler(sampler_name, {'eta': eta, 's_noise': s_noise, 'solver_type': solver_type})
        return (sampler,)
```