# Documentation
- Class name: ModelSamplingDiscrete
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelSamplingDiscrete 是一个用于生成模型中离散采样的 PyTorch 模块类。它通过注册一个 beta 时间表来管理采样过程，这对于确定采样期间每个时间步的方差至关重要。该类提供了将 sigma 值与时间步转换的方法，促进了离散采样过程的进行。

# Input types
## Optional
- model_config
    - 模型配置为采样提供了必要的设置，例如 beta 时间表和线性起始/结束值。它对于正确初始化采样参数并影响采样行为至关重要。
    - Comfy dtype: Optional[Dict]
    - Python dtype: Optional[Dict[str, Any]]

# Output types
- sigmas
    - sigmas 参数代表每个时间步的标准差，由注册的 beta 时间表派生而来。它是 ModelSamplingDiscrete 类的关键输出，在采样过程中用于控制噪声水平。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ModelSamplingDiscrete(torch.nn.Module):

    def __init__(self, model_config=None):
        super().__init__()
        if model_config is not None:
            sampling_settings = model_config.sampling_settings
        else:
            sampling_settings = {}
        beta_schedule = sampling_settings.get('beta_schedule', 'linear')
        linear_start = sampling_settings.get('linear_start', 0.00085)
        linear_end = sampling_settings.get('linear_end', 0.012)
        self._register_schedule(given_betas=None, beta_schedule=beta_schedule, timesteps=1000, linear_start=linear_start, linear_end=linear_end, cosine_s=0.008)
        self.sigma_data = 1.0

    def _register_schedule(self, given_betas=None, beta_schedule='linear', timesteps=1000, linear_start=0.0001, linear_end=0.02, cosine_s=0.008):
        if given_betas is not None:
            betas = given_betas
        else:
            betas = make_beta_schedule(beta_schedule, timesteps, linear_start=linear_start, linear_end=linear_end, cosine_s=cosine_s)
        alphas = 1.0 - betas
        alphas_cumprod = torch.cumprod(alphas, dim=0)
        (timesteps,) = betas.shape
        self.num_timesteps = int(timesteps)
        self.linear_start = linear_start
        self.linear_end = linear_end
        sigmas = ((1 - alphas_cumprod) / alphas_cumprod) ** 0.5
        self.set_sigmas(sigmas)

    def set_sigmas(self, sigmas):
        self.register_buffer('sigmas', sigmas.float())
        self.register_buffer('log_sigmas', sigmas.log().float())

    @property
    def sigma_min(self):
        return self.sigmas[0]

    @property
    def sigma_max(self):
        return self.sigmas[-1]

    def timestep(self, sigma):
        log_sigma = sigma.log()
        dists = log_sigma.to(self.log_sigmas.device) - self.log_sigmas[:, None]
        return dists.abs().argmin(dim=0).view(sigma.shape).to(sigma.device)

    def sigma(self, timestep):
        t = torch.clamp(timestep.float().to(self.log_sigmas.device), min=0, max=len(self.sigmas) - 1)
        low_idx = t.floor().long()
        high_idx = t.ceil().long()
        w = t.frac()
        log_sigma = (1 - w) * self.log_sigmas[low_idx] + w * self.log_sigmas[high_idx]
        return log_sigma.exp().to(timestep.device)

    def percent_to_sigma(self, percent):
        if percent <= 0.0:
            return 999999999.9
        if percent >= 1.0:
            return 0.0
        percent = 1.0 - percent
        return self.sigma(torch.tensor(percent * 999.0)).item()
```