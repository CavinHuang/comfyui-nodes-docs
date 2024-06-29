# Documentation
- Class name: StyleAlignedReferenceSampler
- Category: style_aligned
- Output node: False
- Repo Ref: https://github.com/brianfitzgerald/style_aligned_comfy

StyleAlignedReferenceSampler类旨在促进风格对齐的潜在空间采样，确保生成的内容遵循特定的风格参考。它整合了注意力机制和规范化技术来精炼输出，为生成模型中的风格对齐提供了细致的方法。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于风格对齐采样的生成模型的基础架构和参数。它是风格对齐和采样过程构建的基础。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- share_norm
    - share_norm参数决定模型中不同层或组之间的规范化层如何共享，这通过控制信息流对风格对齐过程产生重大影响。
    - Comfy dtype: SHARE_NORM_OPTIONS
    - Python dtype: str
- share_attn
    - share_attn参数决定了模型中注意力机制的共享策略，这对于通过影响注意力权重使生成内容与期望风格对齐至关重要。
    - Comfy dtype: SHARE_ATTN_OPTIONS
    - Python dtype: str
- scale
    - scale参数调整风格参考对生成样本的影响，允许微调风格对齐以实现期望的审美结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- batch_size
    - batch_size决定了同时处理的样本数量，这影响了风格对齐采样过程的效率和速度。
    - Comfy dtype: INT
    - Python dtype: int
- noise_seed
    - noise_seed用于生成采样过程中的噪声向量，确保风格对齐的样本可以一致地复现。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数影响采样过程的配置，特别是模型如何响应条件输入，这对于实现准确风格对齐至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- positive
    - 正面条件输入对于引导模型朝向期望的风格特征至关重要，作为风格对齐过程的参考。
    - Comfy dtype: CONDITIONING
    - Python dtype: T
- negative
    - 负面条件输入通过指定要避免的不期望特征来帮助完善模型的输出，提高了风格对齐的精确度。
    - Comfy dtype: CONDITIONING
    - Python dtype: T
- ref_positive
    - ref_positive条件输入提供了额外的风格参考层，进一步确保生成的样本与目标风格紧密匹配。
    - Comfy dtype: CONDITIONING
    - Python dtype: T
- sampler
    - sampler参数定义了采样策略，这对于风格对齐输出的多样性和质量至关重要。
    - Comfy dtype: SAMPLER
    - Python dtype: T
- sigmas
    - sigmas参数用于控制在采样过程中应用的噪声水平，直接影响风格对齐样本的平滑度和连贯性。
    - Comfy dtype: SIGMAS
    - Python dtype: T
- ref_latents
    - ref_latents提供了一组作为风格对齐参考的潜在表示，确保输出样本遵循期望的风格细节。
    - Comfy dtype: STEP_LATENTS
    - Python dtype: T

# Output types
- output
    - 输出参数包含模型生成的风格对齐潜在样本，这是采样过程的主要结果，可以进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: dict
- denoised_output
    - denoised_output参数提供了经过处理以减少噪声和增强清晰度的精炼潜在样本，提供了目标风格的更清晰表示。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Usage tips
- Infra type: GPU

# Source code
```
class StyleAlignedReferenceSampler:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'model': ('MODEL',), 'share_norm': (SHARE_NORM_OPTIONS,), 'share_attn': (SHARE_ATTN_OPTIONS,), 'scale': ('FLOAT', {'default': 1, 'min': 0, 'max': 2.0, 'step': 0.01}), 'batch_size': ('INT', {'default': 2, 'min': 1, 'max': 8, 'step': 1}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'ref_positive': ('CONDITIONING',), 'sampler': ('SAMPLER',), 'sigmas': ('SIGMAS',), 'ref_latents': ('STEP_LATENTS',)}}
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('output', 'denoised_output')
    FUNCTION = 'patch'
    CATEGORY = 'style_aligned'

    def patch(self, model: ModelPatcher, share_norm: str, share_attn: str, scale: float, batch_size: int, noise_seed: int, cfg: float, positive: T, negative: T, ref_positive: T, sampler: T, sigmas: T, ref_latents: T) -> 'tuple[dict, dict]':
        m = model.clone()
        args = StyleAlignedArgs(share_attn)
        style_latent_tensor = ref_latents[0].unsqueeze(0)
        (height, width) = style_latent_tensor.shape[-2:]
        latent_t = torch.zeros([batch_size, 4, height, width], device=ref_latents.device)
        latent = {'samples': latent_t}
        noise = comfy.sample.prepare_noise(latent_t, noise_seed)
        latent_t = torch.cat((style_latent_tensor, latent_t), dim=0)
        ref_noise = torch.zeros_like(noise[0]).unsqueeze(0)
        noise = torch.cat((ref_noise, noise), dim=0)
        x0_output = {}
        preview_callback = latent_preview.prepare_callback(m, sigmas.shape[-1] - 1, x0_output)

        def callback(step: int, x0: T, x: T, steps: int):
            preview_callback(step, x0, x, steps)
            if step + 1 < steps:
                x[0] = ref_latents[step + 1]
                x0[0] = ref_latents[step + 1]
        share_group_norm = share_norm in ['group', 'both']
        share_layer_norm = share_norm in ['layer', 'both']
        register_shared_norm(m, share_group_norm, share_layer_norm)
        m.set_model_attn1_patch(SharedAttentionProcessor(args, scale))
        batched_condition = []
        for (i, condition) in enumerate(positive):
            additional = condition[1].copy()
            batch_with_reference = torch.cat([ref_positive[i][0], condition[0].repeat([batch_size] + [1] * len(condition[0].shape[1:]))], dim=0)
            if 'pooled_output' in additional and 'pooled_output' in ref_positive[i][1]:
                pooled_output = torch.cat([ref_positive[i][1]['pooled_output'], additional['pooled_output'].repeat([batch_size] + [1] * len(additional['pooled_output'].shape[1:]))], dim=0)
                additional['pooled_output'] = pooled_output
            if 'control' in additional:
                if 'control' in ref_positive[i][1]:
                    control_hint = torch.cat([ref_positive[i][1]['control'].cond_hint_original, additional['control'].cond_hint_original.repeat([batch_size] + [1] * len(additional['control'].cond_hint_original.shape[1:]))], dim=0)
                    cloned_controlnet = additional['control'].copy()
                    cloned_controlnet.set_cond_hint(control_hint, strength=additional['control'].strength, timestep_percent_range=additional['control'].timestep_percent_range)
                    additional['control'] = cloned_controlnet
                else:
                    control_hint = torch.cat([torch.zeros_like(additional['control'].cond_hint_original), additional['control'].cond_hint_original.repeat([batch_size] + [1] * len(additional['control'].cond_hint_original.shape[1:]))], dim=0)
                    cloned_controlnet = additional['control'].copy()
                    cloned_controlnet.set_cond_hint(control_hint, strength=additional['control'].strength, timestep_percent_range=additional['control'].timestep_percent_range)
                    additional['control'] = cloned_controlnet
            batched_condition.append([batch_with_reference, additional])
        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = comfy.sample.sample_custom(m, noise, cfg, sampler, sigmas, batched_condition, negative, latent_t, callback=callback, disable_pbar=disable_pbar, seed=noise_seed)
        samples = samples[1:]
        out = latent.copy()
        out['samples'] = samples
        if 'x0' in x0_output:
            out_denoised = latent.copy()
            x0 = x0_output['x0'][1:]
            out_denoised['samples'] = m.model.process_latent_out(x0.cpu())
        else:
            out_denoised = out
        return (out, out_denoised)
```