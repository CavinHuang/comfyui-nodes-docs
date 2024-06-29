# Documentation
- Class name: PolyexponentialScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PolyexponentialScheduler节点旨在为扩散模型中的sigma值生成自定义时间表。它使用polyexponential函数在给定的步数内平滑变化噪声水平。该调度程序对于控制学习动态和确保稳定的采样结果至关重要。

# Input types
## Required
- steps
    - “steps”参数定义了将安排sigma值的间隔数。它至关重要，因为它直接影响噪声时间表的粒度和持续时间，影响整体采样过程。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_max
    - “sigma_max”参数代表sigma的最大值，即扩散过程中的初始噪声水平。它很重要，因为它设置了噪声水平的上限，从而影响最终样本的收敛性和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_min
    - “sigma_min”参数表示sigma的最小值，对应于扩散过程结束时的目标噪声水平。它至关重要，因为它决定了最终的噪声水平，影响生成样本的清晰度和准确性。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- rho
    - “rho”参数调整polyexponential时间表的曲率。它影响sigma值从“sigma_max”到“sigma_min”的减少速度，从而影响噪声时间表的整体形状和采样动态。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SIGMAS
    - 输出'SIGMAS'是由PolyexponentialScheduler生成的sigma值序列。这些值对采样过程至关重要，因为它们规定了每个步骤的噪声水平，直接影响所得样本的质量和稳定性。
    - Comfy dtype: FLOAT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class PolyexponentialScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'sigma_max': ('FLOAT', {'default': 14.614642, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'sigma_min': ('FLOAT', {'default': 0.0291675, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'rho': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, steps, sigma_max, sigma_min, rho):
        sigmas = k_diffusion_sampling.get_sigmas_polyexponential(n=steps, sigma_min=sigma_min, sigma_max=sigma_max, rho=rho)
        return (sigmas,)
```