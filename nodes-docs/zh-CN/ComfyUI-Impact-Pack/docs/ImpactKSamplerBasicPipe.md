# Documentation
- Class name: KSamplerBasicPipe
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

KSamplerBasicPipe节点旨在使用指定的采样器和调度器执行采样操作。它在从初始图像生成新的潜在表示方面发挥着关键作用，这些潜在表示可以进一步处理或用于创建新图像。该节点封装了采样的复杂性，为用户提供了一个简单直观的接口，以获取高质量的潜在样本。

# Input types
## Required
- basic_pipe
    - basic_pipe参数是一个复合结构，包含了采样所需的基本组件，包括模型、clip、vae以及正/负样本。它在采样过程中起着关键作用，为生成潜在图像提供了上下文。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, torch.nn.Module, Any, Any]
- seed
    - seed参数初始化随机数生成器，确保采样过程的可重复性。它对于在不同运行中获得一致的结果至关重要，这在实验和比较研究中尤其重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数决定了采样过程将进行的迭代次数。增加步骤的数量可以导致更精细的潜在表示，但同时也增加了计算成本。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，表示配置，用于控制采样过程。它可以影响收敛和生成的潜在图像的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定了采样过程中要使用的采样器类型。不同的采样器可能会产生不同的结果，选择可以基于期望的结果或数据的特定特征。
    - Comfy dtype: KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数定义了采样过程的调度策略。它对于管理采样步骤的进展至关重要，可以影响采样的效率和效果。
    - Comfy dtype: KSampler.SCHEDULERS
    - Python dtype: str
- latent_image
    - latent_image参数是采样过程将作用的初始潜在表示。它作为生成新潜在图像的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- denoise
    - denoise参数控制应用于生成的潜在图像的去噪水平。调整此值可以帮助提高最终输出的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- basic_pipe
    - basic_pipe输出包含用于采样的原始组件，可以用于进一步处理或分析。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, torch.nn.Module, Any, Any]
- latent
    - latent输出代表从采样过程中新生成的潜在图像，可以用于各种下游任务。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - vae输出提供了采样过程中使用的变分自编码器模型，可以用于额外的操作或洞察。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class KSamplerBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('BASIC_PIPE', 'LATENT', 'VAE')
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, basic_pipe, seed, steps, cfg, sampler_name, scheduler, latent_image, denoise=1.0):
        (model, clip, vae, positive, negative) = basic_pipe
        latent = nodes.KSampler().sample(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise)[0]
        return (basic_pipe, latent, vae)
```