# Documentation
- Class name: VPScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VPScheduler节点旨在为扩散模型生成一个连续的方差保持（VP）噪声时间表。它在采样过程中起着至关重要的作用，通过确定每一步的噪声水平，这对于在生成的样本中实现高质量的结果至关重要。

# Input types
## Required
- steps
    - 参数'steps'定义了噪声时间表中的步数。它是采样过程的一个基本方面，因为它决定了每一步应用的噪声水平的粒度，直接影响最终输出的质量。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- beta_d
    - 参数'beta_d'控制时间表中噪声增加的速率。它很重要，因为它影响着步骤中噪声的分布，进而影响生成样本的收敛和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- beta_min
    - 参数'beta_min'设置时间表中噪声的最低水平。它很重要，因为它确保采样过程的初始步骤具有足够的噪声水平，以促进生成多样化和详细的输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- eps_s
    - 参数'eps_s'指定噪声时间表的结束值。它是确定采样过程中应用的最终噪声水平的关键因素，这对于生成样本的细微细节和整体质量至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sigmas
    - 输出'sigmas'提供了VP噪声时间表中每一步计算出的噪声水平。它很重要，因为它构成了采样过程的基础，指导生成最终输出。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class VPScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'beta_d': ('FLOAT', {'default': 19.9, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'beta_min': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1000.0, 'step': 0.01, 'round': False}), 'eps_s': ('FLOAT', {'default': 0.001, 'min': 0.0, 'max': 1.0, 'step': 0.0001, 'round': False})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, steps, beta_d, beta_min, eps_s):
        sigmas = k_diffusion_sampling.get_sigmas_vp(n=steps, beta_d=beta_d, beta_min=beta_min, eps_s=eps_s)
        return (sigmas,)
```