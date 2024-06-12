# Documentation
- Class name: KarrasScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KarrasScheduler节点旨在根据Karras等人（2022年）的方法生成噪声时间表。它在自定义采样过程中起着关键作用，提供一系列σ值，这些值决定了在采样迭代期间添加到数据中的噪声水平。该节点在控制扩散过程中起着关键作用，确保从噪声到清晰数据表示的平稳过渡。

# Input types
## Required
- steps
    - ‘steps’参数定义了采样过程中的迭代次数。它至关重要，因为它直接影响噪声时间表的粒度，进而影响采样结果的质量。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_max
    - ‘sigma_max’参数指定了采样过程中噪声的最大标准差。它是形成初始噪声水平的关键决定因素，对于采样的整体保真度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_min
    - ‘sigma_min’参数设置了噪声的最小标准差，影响采样数据的最终清晰度。它在采样过程结束时对噪声时间表的微调中起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rho
    - ‘rho’参数控制了采样迭代过程中噪声标准差降低的速率。它是噪声减少计划安排中的一个关键因素，影响着采样算法的收敛。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- SIGMAS
    - 输出'SIGMAS'是一系列σ值，代表了采样过程的噪声时间表。这个时间表对于算法逐步减少噪声，生成清晰的数据表示至关重要。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class KarrasScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'sigma_max': ('FLOAT', {'default': 14.614642, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'sigma_min': ('FLOAT', {'default': 0.0291675, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'rho': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 100.0, 'step': 0.01, 'round': False})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, steps, sigma_max, sigma_min, rho):
        sigmas = k_diffusion_sampling.get_sigmas_karras(n=steps, sigma_min=sigma_min, sigma_max=sigma_max, rho=rho)
        return (sigmas,)
```