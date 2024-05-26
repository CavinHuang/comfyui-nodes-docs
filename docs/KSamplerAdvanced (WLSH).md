# Documentation
- Class name: WLSH_KSamplerAdvanced
- Category: WLSH Nodes/sampling
- Output node: False
- Repo Ref: https://github.com/wallish77/wlsh_nodes

WLSH_KSamplerAdvanced节点旨在使用指定模型执行高级采样操作。它允许通过诸如添加噪声、随机种子和采样步骤等参数来定制采样过程。该节点能够通过微调去噪过程并利用各种采样策略和调度器来生成高质量的样本。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了用于生成样本的生成模型。模型的选择显著影响生成样本的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- sampler_name
    - sampler_name参数选择要使用的特定采样方法。不同的采样方法可能导致不同的样本质量和特性，使这个参数对于实现期望的结果至关重要。
    - Comfy dtype: comfy.samplers.KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数定义了在采样过程中将应用的调度策略。它对于控制采样步骤执行的速度很重要。
    - Comfy dtype: comfy.samplers.KSampler.SCHEDULERS
    - Python dtype: str
- positive
    - positive参数提供指导采样过程的条件信息，以生成具有期望属性的样本。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - negative参数提供额外的条件信息，有助于避免生成具有不希望的特性的样本。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - latent_image参数是采样过程的关键输入，代表采样开始的初始潜在状态。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- add_noise
    - add_noise参数决定是否在采样过程中添加噪声。这会影响生成样本的多样性，并且是控制样本质量和噪声之间权衡的重要因素。
    - Comfy dtype: COMBO['enable', 'disable']
    - Python dtype: str
- seed
    - seed参数用于在采样过程中引入随机性。它确保采样结果是可复现的，这对于调试和比较不同的采样配置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数指定了采样过程中的迭代次数。步数越多，通常会导致更高质量的样本，但会增加计算成本。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数，代表采样过程的控制因子，允许在采样策略中微调探索和利用之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at_step
    - start_at_step参数确定采样过程开始的步骤。它允许对采样程序进行细粒度控制。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数指定采样过程的最终步骤。它用于定义执行采样的步骤范围。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - return_with_leftover_noise参数控制采样图像是否包含采样过程中剩余的噪声。这对于进一步处理或分析非常有用。
    - Comfy dtype: COMBO['disable', 'enable']
    - Python dtype: str
- denoise
    - denoise参数调整采样过程中应用的去噪强度。它是确定最终样本清晰度和质量的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - latent输出代表采样过程的最终潜在状态，可以用于进一步分析或作为后续处理步骤的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- info
    - info输出提供了采样过程的摘要，包括使用的种子、步数和应用的去噪强度等细节。
    - Comfy dtype: INFO
    - Python dtype: Dict[str, Union[int, float, str]]

# Usage tips
- Infra type: GPU

# Source code
```
class WLSH_KSamplerAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'add_noise': (['enable', 'disable'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'return_with_leftover_noise': (['disable', 'enable'],), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT', 'INFO')
    FUNCTION = 'sample'
    CATEGORY = 'WLSH Nodes/sampling'

    def sample(self, model, add_noise, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise):
        force_full_denoise = False
        if return_with_leftover_noise == 'enable':
            force_full_denoise = False
        disable_noise = False
        if add_noise == 'disable':
            disable_noise = True
        info = {'Seed: ': seed, 'Steps: ': steps, 'CFG scale: ': cfg, 'Sampler: ': sampler_name, 'Scheduler: ': scheduler, 'Start at step: ': start_at_step, 'End at step: ': end_at_step, 'Denoising strength: ': denoise}
        samples = common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)
        return (samples[0], info)
```