# Documentation
- Class name: ExponentialScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ExponentialScheduler节点旨在生成一个随着指定步数呈指数级递减的噪声水平计划。它在扩散模型的上下文中使用，用于控制采样过程中向数据添加或移除的噪声量，这对于生成高质量的输出至关重要。

# Input types
## Required
- steps
    - 'steps'参数定义了噪声计划中的步数。它非常重要，因为它决定了噪声减少的粒度，影响采样过程的质量和收敛性。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_max
    - 'sigma_max'参数设置了计划的初始噪声水平。它很重要，因为它决定了噪声指数衰减的起始点，影响扩散过程的初始状态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_min
    - 'sigma_min'参数指定了计划中的最终噪声水平。它很重要，因为它设定了采样过程旨在实现的目标噪声水平，影响最终输出的噪声特性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SIGMAS
    - 'SIGMAS'输出提供了遵循指数衰减模式的计算出的噪声水平计划。它很重要，因为它直接影响采样过程的后续步骤。
    - Comfy dtype: FLOAT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class ExponentialScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'sigma_max': ('FLOAT', {'default': 14.614642, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'sigma_min': ('FLOAT', {'default': 0.0291675, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, steps, sigma_max, sigma_min):
        sigmas = k_diffusion_sampling.get_sigmas_exponential(n=steps, sigma_min=sigma_min, sigma_max=sigma_max)
        return (sigmas,)
```