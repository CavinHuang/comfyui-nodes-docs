# Documentation
- Class name: KSamplerAdvanced
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

KSamplerAdvanced节点旨在通过各种噪声配置和调度选项，从模型中进行高级采样。它通过控制添加噪声来生成高质量的潜在表示，这可以增强输出的多样性和质量。该节点的灵活性在于其能够适应不同的采样策略，使其成为探索生成模型潜在空间的多功能工具。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了节点将从中采样的生成模型。它是所有采样操作的基础，其属性直接影响生成的潜在表示的性质。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- add_noise
    - add_noise参数控制是否在采样过程中引入额外的噪声。这在实现所需多样性和复杂性方面的潜在样本中至关重要。
    - Comfy dtype: COMBO[enable, disable]
    - Python dtype: str
- steps
    - 步骤参数规定了采样过程将经历的迭代次数。它是决定最终潜在样本的收敛性和质量的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样过程的配置，影响潜在空间中探索和利用的平衡。它是实现最佳采样效率和样本质量的关键设置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定要使用的采样方法，这对节点的整体性能和效果至关重要。不同的采样器可以显著改变生成样本的特性。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: str
- scheduler
    - 调度器参数定义了噪声应用的调度策略，这对于管理样本质量和计算效率之间的权衡至关重要。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: str
- positive
    - positive参数提供条件数据，引导采样过程生成符合特定期望特征的样本。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - negative参数提供条件数据，帮助采样过程避免生成具有不良特征的样本。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image
    - latent_image参数是采样过程的初始点。它设置了影响采样轨迹和结果的起始条件。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
## Optional
- noise_seed
    - noise_seed参数对于控制噪声生成过程中的随机性至关重要。它确保噪声模式是可复现的，这对于一致和可靠的采样结果非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - start_at_step参数决定了采样过程的起始步骤，允许用户控制从哪个点开始采样。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数指定了采样过程的最后步骤，定义了样本生成的终点。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - return_with_leftover_noise参数决定是否在返回的样本中包含剩余噪声，这对于进一步的分析或后处理可能是有用的。
    - Comfy dtype: COMBO[disable, enable]
    - Python dtype: str

# Output types
- latent
    - 潜在输出包含生成的潜在样本，这是采样过程的核心结果。这些样本代表了学习到的特征，并且可以用于各种下游任务。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'add_noise': (['enable', 'disable'],), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'return_with_leftover_noise': (['disable', 'enable'],)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise=1.0):
        force_full_denoise = True
        if return_with_leftover_noise == 'enable':
            force_full_denoise = False
        disable_noise = False
        if add_noise == 'disable':
            disable_noise = True
        return common_ksampler(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)
```