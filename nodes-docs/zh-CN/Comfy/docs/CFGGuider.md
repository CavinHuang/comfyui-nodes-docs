# Documentation
- Class name: CFGGuider
- Category: sampler
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CFGGuider节点旨在通过调整条件和控制噪声预测来指导生成模型中的采样过程。它封装了设置条件和配置引导因子的逻辑，这对于引导模型朝向期望的结果至关重要。

# Input types
## Required
- model_patcher
    - model_patcher参数对于CFGGuider至关重要，因为它提供了采样过程所需的模型选项和功能。它负责管理模型的状态，并确保在采样期间正确应用条件。
    - Comfy dtype: comfy.model_patcher.ModelPatcher
    - Python dtype: comfy.model_patcher.ModelPatcher
## Optional
- positive
    - 正向条件用于指导采样过程生成包含特定特征的内容。它们通过影响模型的决策过程，在塑造最终输出中起着重要作用。
    - Comfy dtype: List[comfy.conds.Condition]
    - Python dtype: List[comfy.conds.Condition]
- negative
    - 负向条件用于防止生成的内容中出现某些特征或元素。它们对于完善输出并确保其符合所需的规格至关重要。
    - Comfy dtype: List[comfy.conds.Condition]
    - Python dtype: List[comfy.conds.Condition]
- cfg
    - cfg参数，代表引导因子，是CFGGuider的一个关键组成部分。它决定了条件对采样过程的影响强度，允许对模型的行为进行微调。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - CFGGuider节点的输出是一个张量，代表采样的潜在图像。它是引导采样过程的结果，并根据提供的条件和设置封装了生成的内容。
    - Comfy dtype: torch.Tensor
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CFGGuider:

    def __init__(self, model_patcher):
        self.model_patcher = model_patcher
        self.model_options = model_patcher.model_options
        self.original_conds = {}
        self.cfg = 1.0

    def set_conds(self, positive, negative):
        self.inner_set_conds({'positive': positive, 'negative': negative})

    def set_cfg(self, cfg):
        self.cfg = cfg

    def inner_set_conds(self, conds):
        for k in conds:
            self.original_conds[k] = comfy.sampler_helpers.convert_cond(conds[k])

    def __call__(self, *args, **kwargs):
        return self.predict_noise(*args, **kwargs)

    def predict_noise(self, x, timestep, model_options={}, seed=None):
        return sampling_function(self.inner_model, x, timestep, self.conds.get('negative', None), self.conds.get('positive', None), self.cfg, model_options=model_options, seed=seed)

    def inner_sample(self, noise, latent_image, device, sampler, sigmas, denoise_mask, callback, disable_pbar, seed):
        if latent_image is not None and torch.count_nonzero(latent_image) > 0:
            latent_image = self.inner_model.process_latent_in(latent_image)
        self.conds = process_conds(self.inner_model, noise, self.conds, device, latent_image, denoise_mask, seed)
        extra_args = {'model_options': self.model_options, 'seed': seed}
        samples = sampler.sample(self, sigmas, extra_args, callback, noise, latent_image, denoise_mask, disable_pbar)
        return self.inner_model.process_latent_out(samples.to(torch.float32))

    def sample(self, noise, latent_image, sampler, sigmas, denoise_mask=None, callback=None, disable_pbar=False, seed=None):
        if sigmas.shape[-1] == 0:
            return latent_image
        self.conds = {}
        for k in self.original_conds:
            self.conds[k] = list(map(lambda a: a.copy(), self.original_conds[k]))
        (self.inner_model, self.conds, self.loaded_models) = comfy.sampler_helpers.prepare_sampling(self.model_patcher, noise.shape, self.conds)
        device = self.model_patcher.load_device
        if denoise_mask is not None:
            denoise_mask = comfy.sampler_helpers.prepare_mask(denoise_mask, noise.shape, device)
        noise = noise.to(device)
        latent_image = latent_image.to(device)
        sigmas = sigmas.to(device)
        output = self.inner_sample(noise, latent_image, device, sampler, sigmas, denoise_mask, callback, disable_pbar, seed)
        comfy.sampler_helpers.cleanup_models(self.conds, self.loaded_models)
        del self.inner_model
        del self.conds
        del self.loaded_models
        return output
```