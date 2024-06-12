# Documentation
- Class name: SeargeSDXLSamplerV3
- Category: Searge/_deprecated_/Sampling
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点旨在使用基础模型和细化模型的组合来执行采样过程，以生成高质量的潜在图像。它整合了噪声和条件输入，以产生细化的输出，提高了整体采样效率和结果质量。

# Input types
## Required
- base_model
    - 基础模型对于建立采样过程的基础结构至关重要。它决定了生成潜在图像过程中的初始条件和可能的变化。
    - Comfy dtype: MODEL
    - Python dtype: UNetModel
- base_positive
    - 此参数作为正向条件数据，影响采样过程。它有助于将生成引向期望的特征，并提高输出质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- base_negative
    - 负向条件数据用于通过避免不希望的特征来约束采样过程。它在确保最终输出与预期方向一致方面起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_model
    - 细化模型对于采样过程的后处理阶段至关重要。它通过应用进一步的细化来提高生成的潜在图像的质量和细节。
    - Comfy dtype: MODEL
    - Python dtype: UNetModel
- refiner_positive
    - 细化正向条件数据通过强调某些特征来精炼输出。这在实现更细致和有针对性的最终结果方面至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- refiner_negative
    - 细化负向条件数据有助于防止最终输出中引入不希望的元素。它有助于提高采样过程的精确性和准确性。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent_image
    - 潜在图像是采样过程的初始输入，作为起点。其质量和特征显著影响最终输出。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- noise_seed
    - 噪声种子在控制采样过程中应用的噪声的随机性方面起着重要作用。它确保了结果的一致性和可复现性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤数量决定了采样过程的持续时间和复杂性。它直接影响最终潜在图像中实现的细节和细化程度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数对于调整采样过程的行为至关重要。它影响探索和利用之间的平衡，从而获得更优化的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称标识用于采样过程的特定算法。它对于在最终输出中实现期望的特征至关重要。
    - Comfy dtype: SAMPLER_NAME
    - Python dtype: str
- scheduler
    - 调度器在采样过程中控制超参数的进步和调整。它在优化采样效率和输出质量方面起着关键作用。
    - Comfy dtype: SCHEDULER_NAME
    - Python dtype: str
- base_ratio
    - 基础比例参数影响步骤在基础模型和细化模型之间的分布。它对于平衡最终潜在图像中的粗略和精细细节至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise
    - 去噪参数控制采样过程中应用的降噪水平。它在提高最终输出的清晰度和质量方面非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- refiner_prep_steps
    - 此可选参数指定细化模型的预备步骤数量。它可以从0到总步骤数的范围，允许定制预细化过程。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 输出潜在代表采样过程后最终生成的潜在图像。它包含了通过基础模型和细化模型的结合实现的精炼特征和细节。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SeargeSDXLSamplerV3:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'base_model': ('MODEL',), 'base_positive': ('CONDITIONING',), 'base_negative': ('CONDITIONING',), 'refiner_model': ('MODEL',), 'refiner_positive': ('CONDITIONING',), 'refiner_negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551600}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 200}), 'cfg': ('FLOAT', {'default': 7.0, 'min': 0.0, 'max': 30.0, 'step': 0.5}), 'sampler_name': ('SAMPLER_NAME', {'default': 'ddim'}), 'scheduler': ('SCHEDULER_NAME', {'default': 'ddim_uniform'}), 'base_ratio': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'refiner_prep_steps': ('INT', {'default': 0, 'min': 0, 'max': 10})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'Searge/_deprecated_/Sampling'

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative, latent_image, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise, refiner_prep_steps=None):
        base_steps = int(steps * (base_ratio + 0.0001))
        refiner_steps = max(0, steps - base_steps)
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
        return sdxl_ksampler(base_model, refiner_model, noise_seed, base_steps, refiner_steps, cfg, sampler_name, scheduler, base_positive, base_negative, refiner_positive, refiner_negative, input_latent, denoise=denoise, disable_noise=False, start_step=start_at_step, last_step=steps, force_full_denoise=True)
```