# Documentation
- Class name: LCMScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/jojkaart/ComfyUI-sampler-lcm-alternative

LCMScheduler节点旨在为扩散模型生成一系列sigma值的调度计划。它通过利用指定的模型，根据均匀调度计算sigma值，这对控制采样步骤中的方差至关重要。该节点抽象了底层计算的复杂性，提供了一个简单的接口，用于获取适合扩散过程的sigma值。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了调度器将用于计算sigma值的扩散模型。这是一个强制性输入，直接影响生成的sigma调度计划，这对于扩散过程中的后续步骤至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- steps
    - 步骤参数决定了调度器计算的sigma值的数量。虽然它是可选的，但它显著影响sigma调度的粒度，进而影响扩散采样过程的质量和收敛性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- sigmas
    - sigmas输出是由调度器生成的一系列sigma值，这些值对于扩散采样过程至关重要。每个sigma值对应于采样中的一个特定步骤，指导在该步骤添加或移除的噪声的方差。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class LCMScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'steps': ('INT', {'default': 8, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, model, steps):
        sigmas = comfy.samplers.calculate_sigmas_scheduler(model.model, 'sgm_uniform', steps).cpu()
        return (sigmas,)
```