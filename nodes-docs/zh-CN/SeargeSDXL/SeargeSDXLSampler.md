# Documentation
- Class name: SeargeSDXLSampler
- Category: Searge/_deprecated_/Sampling
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeSDXLSampler节点旨在促进深度学习框架内的采样过程，特别适用于风格迁移任务。它结合了基础模型和细化模型，以逐步提高生成输出的质量，从潜在图像开始，并应用降噪技术。

# Input types
## Required
- base_model
    - 基础模型对于采样过程至关重要，它构成了输出的基础。这是用于生成输出基础层的初始神经网络。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- base_positive
    - 基础正向调节对于引导生成图像的风格和内容朝着期望的结果至关重要，确保图像与目标领域保持一致。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- base_negative
    - 基础负面调节有助于避免生成图像中不需要的特征或风格，使输出更加符合预期结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_model
    - 细化模型通过应用额外的层和微调最终结果，在提高基础输出质量方面发挥着关键作用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_positive
    - 细化正向调节进一步细化图像，以强调特定特征或风格，确保最终输出具有更高的细节和保真度。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_negative
    - 细化负面调节用于抑制可能不符合预期结果的某些特征或风格，确保最终图像符合质量标准。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent_image
    - 潜在图像是采样过程的起点，代表了生成和发展最终图像的初始状态。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noise_seed
    - 噪声种子在引入采样过程中的变异性和随机性方面起着重要作用，确保生成输出的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤定义了采样过程将要经历的迭代次数，直接影响最终图像的细节和细化程度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数对于调整生成图像中风格和内容的平衡至关重要，确保两者的和谐融合。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称决定了要使用的特定采样策略，这显著影响了采样过程的效率和质量。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: str
- scheduler
    - 调度器决定了采样过程的节奏和进展，确保从初始状态到最终状态的平稳过渡。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: str
- base_ratio
    - 基础比例参数调整了总步骤中专门用于基础采样阶段的比例，影响了输出的初始质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数控制了采样过程中应用的降噪水平，直接影响最终图像的清晰度和锐度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- 
    - 输出是图像的潜在表示，它包含了采样过程完成后的最终状态，代表了各种输入和参数的结合。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SeargeSDXLSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'base_positive': ('CONDITIONING',), 'base_negative': ('CONDITIONING',), 'refiner_model': ('MODEL',), 'refiner_positive': ('CONDITIONING',), 'refiner_negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 30, 'min': 1, 'max': 1000}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 100.0, 'step': 0.5}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'dpmpp_2m'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'karras'}), 'base_ratio': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('',)
    FUNCTION = 'sample'
    CATEGORY = 'Searge/_deprecated_/Sampling'

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative, latent_image, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise):
        base_steps = int(steps * base_ratio)
        if denoise < 0.01:
            return (latent_image,)
        if base_steps >= steps:
            return nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive, base_negative, latent_image, denoise=denoise, disable_noise=False, start_step=0, last_step=steps, force_full_denoise=True)
        base_result = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive, base_negative, latent_image, denoise=denoise, disable_noise=False, start_step=0, last_step=base_steps, force_full_denoise=False)
        return nodes.common_ksampler(refiner_model, noise_seed, steps, cfg, sampler_name, scheduler, refiner_positive, refiner_negative, base_result[0], denoise=1.0, disable_noise=True, start_step=base_steps, last_step=steps, force_full_denoise=True)
```