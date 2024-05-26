# Documentation
- Class name: KSampler
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KSampler节点旨在对给定模型执行采样操作。它利用各种参数控制采样过程，确保生成高质量的潜在表示。此节点对于需要创建或操作潜在空间的任务至关重要，例如图像合成或特征提取。

# Input types
## Required
- model
    - 模型参数对于KSampler节点至关重要，因为它定义了将用于采样的底层模型。模型的选择显著影响节点的执行和生成的潜在表示的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数对于确保采样过程的可重复性至关重要。它初始化随机数生成器，这影响采样中使用的噪声模式，从而影响结果的一致性和可靠性。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- steps
    - 步骤参数确定采样过程中的迭代次数。它直接影响生成的潜在表示的收敛和细节水平，更多的步骤通常会导致更高质量的输出。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，表示配置值，在采样过程中通过控制模型的超参数起着重要作用。它在微调节点性能以获得最佳结果方面起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定KSampler节点要使用的采样方法。不同的采样方法可能会产生不同的结果，因此这个参数对于在采样过程中实现期望的结果很重要。
    - Comfy dtype: comfy.samplers.KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数定义了在采样过程中要使用的学习能力调度器。它是一个关键组件，用于随时间调整学习能力，这可以极大地影响采样的效率和效果。
    - Comfy dtype: comfy.samplers.KSampler.SCHEDULERS
    - Python dtype: str
- positive
    - positive参数提供指导采样过程的条件信息，以生成更相关和准确的潜在表示。当目标是采样中的特定结果时，这是一个重要方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- negative
    - negative参数与positive参数类似，提供条件信息，但在这种情况下，它用于指导采样过程远离某些结果。它有助于完善采样过程，以避免不希望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- latent_image
    - latent_image参数表示采样过程的初始潜在状态，用作采样过程的起点。它是一个关键输入，直接影响节点的最终输出，决定采样的方向。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- denoise
    - denoise参数控制采样过程中应用的去噪水平。这是一个重要的调整参数，可以提高生成的潜在表示的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - latent参数代表采样过程的输出，包含生成的潜在表示。这是KSampler节点的一个重要结果，包含了采样过程的最终状态。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class KSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        return common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)
```