# Documentation
- Class name: ModelSamplingContinuousEDM
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelSamplingContinuousEDM 是一个 PyTorch 模块，旨在促进连续能量距离建模（EDM）中的采样过程。它封装了设置和管理 sigma 值的逻辑，这些值对于扩散过程至关重要。该节点旨在提供一种结构化的方法来处理采样参数，确保采样工作流程的平滑和高效。

# Input types
## Required
- sigma_min
    - Sigma 最小值定义了采样过程中使用的 sigma 值的下限。它是一个关键参数，影响扩散速率和生成样本的质量。一个恰当选择的 sigma_min 确保了采样速度和结果保真度之间的平衡。
    - Comfy dtype: float
    - Python dtype: float
- sigma_max
    - Sigma 最大值在采样期间设置了 sigma 值的上限。它是一个关键参数，决定了扩散过程的规模。一个高的 sigma_max 值可以产生更多样化的样本，但可能需要更多的计算，而一个较低的值加快了过程，但可能导致变化性减少。
    - Comfy dtype: float
    - Python dtype: float
- sigma_data
    - Sigma 数据表示数据中假设的噪声水平。它是一个重要参数，影响采样过程的初始条件。正确设置 sigma_data 对于使模型的假设与实际数据特征保持一致至关重要，从而获得更准确和可靠的采样结果。
    - Comfy dtype: float
    - Python dtype: float
## Optional
- model_config
    - 模型配置为采样过程提供必要的设置。它是一个包含诸如 'sigma_min'、'sigma_max' 和 'sigma_data' 等参数的字典，这些参数定义了 sigma 的范围和初始值。此参数对于初始化采样参数并将采样行为调整为特定模型的特定要求至关重要。
    - Comfy dtype: Optional[Dict[str, Any]]
    - Python dtype: Optional[Dict[str, Any]]

# Output types
- sigmas
    - sigmas 输出是一个张量，包含在 sigma_min 和 sigma_max 之间对数间隔的一系列 sigma 值。这些值在整个采样过程中用于控制扩散步骤。sigmas 张量是采样策略的一个基本组成部分，使模型能够产生一系列逐渐细化到目标分布的样本。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor
- log_sigmas
    - log_sigmas 输出是一个张量，表示 sigmas 的自然对数。它在采样过程中用于计算效率，特别是在处理指数函数时。log_sigmas 张量允许更快的计算，是优化采样程序的重要组成部分。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ModelSamplingContinuousEDM(torch.nn.Module):

    def __init__(self, model_config=None):
        super().__init__()
        if model_config is not None:
            sampling_settings = model_config.sampling_settings
        else:
            sampling_settings = {}
        sigma_min = sampling_settings.get('sigma_min', 0.002)
        sigma_max = sampling_settings.get('sigma_max', 120.0)
        sigma_data = sampling_settings.get('sigma_data', 1.0)
        self.set_parameters(sigma_min, sigma_max, sigma_data)

    def set_parameters(self, sigma_min, sigma_max, sigma_data):
        self.sigma_data = sigma_data
        sigmas = torch.linspace(math.log(sigma_min), math.log(sigma_max), 1000).exp()
        self.register_buffer('sigmas', sigmas)
        self.register_buffer('log_sigmas', sigmas.log())

    @property
    def sigma_min(self):
        return self.sigmas[0]

    @property
    def sigma_max(self):
        return self.sigmas[-1]

    def timestep(self, sigma):
        return 0.25 * sigma.log()

    def sigma(self, timestep):
        return (timestep / 0.25).exp()

    def percent_to_sigma(self, percent):
        if percent <= 0.0:
            return 999999999.9
        if percent >= 1.0:
            return 0.0
        percent = 1.0 - percent
        log_sigma_min = math.log(self.sigma_min)
        return math.exp((math.log(self.sigma_max) - log_sigma_min) * percent + log_sigma_min)
```