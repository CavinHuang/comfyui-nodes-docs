# Documentation
- Class name: SeargeSDXLSampler2
- Category: Searge/_deprecated_/Sampling
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeSDXLSampler2类通过一系列模型迭代细化一个潜在图像，增强生成输出的质量和细节。它利用基础模型和细化模型的组合来逐步改进表示形式，调整各种参数来控制细化过程并实现所需的细节水平和降噪效果。

# Input types
## Required
- base_model
    - 基础模型是用于初始采样的基础神经网络。它对于建立潜在图像的一般结构和质量至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- base_positive
    - 基础正向调节为基地模型提供了生成准确和相关潜在图像所需的重要上下文。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- base_negative
    - 基础负面调节通过排除不需要的特征或特征来帮助细化采样过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- refiner_model
    - 细化模型通过应用高级技术和微调输出来提高潜在图像的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- refiner_positive
    - 细化正向调节通过专注于最终输出中所需的特定细节和特征来进一步细化图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- refiner_negative
    - 细化负面调节确保最终图像不包含不需要的元素，保持细化过程的完整性和质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image
    - 潜在图像是初始表示，将通过采样过程迭代改进。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noise_seed
    - 噪声种子在控制采样过程中引入的噪声的随机性和可变性方面起着重要作用，这会影响结果的多样性和质量。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 采样过程中的步骤数量决定了最终图像实现的细节和细化程度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数是一个关键值，它影响采样过程的整体行为和性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称标识用于采样过程的特定算法，这可以显著影响采样的效率和效果。
    - Comfy dtype: SAMPLER_NAME
    - Python dtype: str
- scheduler
    - 调度器决定了采样过程的节奏和进展，确保了一个平衡和受控的细化。
    - Comfy dtype: SCHEDULER_NAME
    - Python dtype: str
- base_ratio
    - 基础比例参数调整基础模型和细化模型之间的平衡，影响采样过程不同阶段的重点和强调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数控制采样过程中应用的降噪水平，直接影响最终图像的清晰度和锐度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- refiner_prep_steps
    - 细化准备步骤用于在主要采样过程之前预处理潜在图像，可能提高输出的质量和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- noise_offset
    - 噪声偏移参数为细化模型引入噪声种子的变异性，有助于最终输出的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- refiner_strength
    - 细化强度参数调节细化过程的强度，较高的值导致最终图像中更明显的变化。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent_image
    - 输出潜在图像是采样过程的结果，展示了增强的细节和降低的噪声。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class SeargeSDXLSampler2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'base_positive': ('CONDITIONING',), 'base_negative': ('CONDITIONING',), 'refiner_model': ('MODEL',), 'refiner_positive': ('CONDITIONING',), 'refiner_negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551600}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 200}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 30.0, 'step': 0.5}), 'sampler_name': ('SAMPLER_NAME', {'default': 'ddim'}), 'scheduler': ('SCHEDULER_NAME', {'default': 'ddim_uniform'}), 'base_ratio': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'refiner_prep_steps': ('INT', {'default': 0, 'min': 0, 'max': 10}), 'noise_offset': ('INT', {'default': 1, 'min': 0, 'max': 1}), 'refiner_strength': ('FLOAT', {'default': 1.0, 'min': 0.01, 'max': 1.0, 'step': 0.05})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'Searge/_deprecated_/Sampling'

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative, latent_image, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise, refiner_prep_steps=None, noise_offset=None, refiner_strength=None):
        base_steps = int(steps * (base_ratio + 0.0001))
        if noise_offset is None:
            noise_offset = 1
        if refiner_strength is None:
            refiner_strength = 1.0
        if refiner_strength < 0.01:
            refiner_strength = 0.01
        if denoise < 0.01:
            return (latent_image,)
        start_at_step = 0
        input_latent = latent_image
        if refiner_prep_steps is not None:
            if refiner_prep_steps >= base_steps:
                refiner_prep_steps = base_steps - 1
            if refiner_prep_steps > 0:
                start_at_step = refiner_prep_steps
                precondition_result = nodes.common_ksampler(refiner_model, noise_seed + 2, steps, cfg, sampler_name, scheduler, refiner_positive, refiner_negative, latent_image, denoise=denoise, disable_noise=False, start_step=steps - refiner_prep_steps, last_step=steps, force_full_denoise=False)
                input_latent = precondition_result[0]
        if base_steps >= steps:
            return nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive, base_negative, input_latent, denoise=denoise, disable_noise=False, start_step=start_at_step, last_step=steps, force_full_denoise=True)
        base_result = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive, base_negative, input_latent, denoise=denoise, disable_noise=False, start_step=start_at_step, last_step=base_steps, force_full_denoise=True)
        return nodes.common_ksampler(refiner_model, noise_seed + noise_offset, steps, cfg, sampler_name, scheduler, refiner_positive, refiner_negative, base_result[0], denoise=denoise * refiner_strength, disable_noise=False, start_step=base_steps, last_step=steps, force_full_denoise=True)
```