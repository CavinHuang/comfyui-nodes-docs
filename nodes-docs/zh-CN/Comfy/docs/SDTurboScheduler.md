# Documentation
- Class name: SDTurboScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SDTurboScheduler 是一个用于在扩散模型框架内高效管理和调度采样操作的节点。它抽象了采样步骤和去噪过程的复杂性，为生成采样过程中必不可少的 sigma 值提供了一个简化的接口。此节点确保采样过程遵循指定的参数，便于在不深入个别采样步骤的细节的情况下，对扩散采样工作流程进行高级控制。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了调度器将操作的扩散模型。这是节点执行其采样任务的基础元素，模型的架构和参数决定了采样过程的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- steps
    - 步骤参数对于定义采样过程将经历的迭代次数至关重要。它直接影响采样过程的粒度，是控制计算时间和结果质量之间权衡的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 去噪参数非常重要，因为它控制了采样过程中应用的噪声减少水平。它是实现细节保留和噪声消除之间所需平衡的关键组成部分，从而影响最终输出的视觉保真度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sigmas
    - sigmas 输出是采样过程中的关键组成部分，代表用于指导扩散步骤的标准偏差。它是采样质量的关键决定因素，其值直接影响生成样本的结果。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SDTurboScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'steps': ('INT', {'default': 1, 'min': 1, 'max': 10}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, model, steps, denoise):
        start_step = 10 - int(10 * denoise)
        timesteps = torch.flip(torch.arange(1, 11) * 100 - 1, (0,))[start_step:start_step + steps]
        comfy.model_management.load_models_gpu([model])
        sigmas = model.model.model_sampling.sigma(timesteps)
        sigmas = torch.cat([sigmas, sigmas.new_zeros([1])])
        return (sigmas,)
```