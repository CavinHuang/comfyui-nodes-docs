# Documentation
- Class name: IterativeMixingKSampler
- Category: test
- Output node: False
- Repo Ref: https://github.com/deroberon/demofusion-comfyui

该节点通过逐步引入一组参考潜在表示的指导，来细化一批潜在表示，旨在通过迭代混合提高生成样本的质量。

# Input types
## Required
- model
    - 用于去噪和细化潜在表示的生成模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 用于初始化噪声生成的随机数生成器的种子值。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 影响去噪过程的配置参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 用于迭代去噪过程的采样器名称。
    - Comfy dtype: ENUM
    - Python dtype: str
- scheduler
    - 用于随时间调整去噪过程的调度策略。
    - Comfy dtype: ENUM
    - Python dtype: str
- step_increment
    - 在每次去噪过程迭代中增加的步数。
    - Comfy dtype: INT
    - Python dtype: int
- positive
    - 用于指导去噪过程的正向调节数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- negative
    - 用于进一步细化去噪过程的负向调节数据。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- latent_image_batch
    - 需要被去噪和细化的潜在表示批次。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- denoise
    - 控制每一步应用的去噪程度的参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- alpha_1
    - 影响参考潜在表示与去噪样本之间混合速率的参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- reverse_batch
    - 一个标志，指示在处理之前是否应反转批次。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent_image_batch
    - 经过迭代去噪过程后细化的潜在表示批次。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IterativeMixingKSampler:
    """
    Take a batch of latents, z_prime, and progressively de-noise them
    step by step from z_prime[0] to z_prime[steps], mixing in a weighted
    fraction of z_prime[i] at each step so that de-noising is guided by
    the z_prime latents. This batch sampler assumes that the number of steps
    is just the length of z_prime, so there is no steps parameter. The parameter
    latent_image_batch should come from the Batch Unsampler node.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'step_increment': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image_batch': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'alpha_1': ('FLOAT', {'default': 3.0, 'min': 0.1, 'max': 10.0}), 'reverse_batch': ('BOOLEAN', {'default': True})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'test'

    def sample(self, model, seed, cfg, sampler_name, scheduler, step_increment, positive, negative, latent_image_batch, denoise=1.0, alpha_1=3.0, reverse_batch=True):
        if reverse_batch:
            latent_image_batch['samples'] = torch.flip(latent_image_batch['samples'], [0])
        return batched_ksampler(model, seed, cfg, sampler_name, scheduler, step_increment, positive, negative, latent_image_batch, denoise=denoise, alpha_1=alpha_1)
```