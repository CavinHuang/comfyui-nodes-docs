# Documentation
- Class name: Gradually_More_Denoise_KSampler
- Category: ComfyUI-Frame-Interpolation/others
- Output node: True
- Repo Ref: https://github.com/Fannovel16/ComfyUI-Frame-Interpolation

Gradually_More_Denoise_KSampler 节点旨在逐步精细化潜在图像的去噪过程。它通过应用一系列去噪步骤，逐增加去噪强度，以实现更清晰的输出。此节点在需要逐步增强图像质量的场景中至关重要，例如在生成动画的平滑过渡或以逐步方式提高图像清晰度时。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了用于生成潜在样本的生成模型。它直接影响生成图像的质量和类型，是整个过程中的关键组成部分。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正向条件参数用于引导生成过程朝着期望的结果发展。它在引导模型输出朝向更有利或特定的结果中扮演着重要角色。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负向条件参数用于抑制生成过程中的某些结果。它对于微调模型的输出以避免不希望的特征或特性很重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 潜在图像参数是包含用于生成去噪输出的初始潜在表示的关键输入。它是节点功能的基础，因为最终图像的质量在很大程度上依赖于初始潜在状态。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- seed
    - 种子参数用于初始化随机数生成器，确保采样过程中的可重复性。虽然它是可选的，但当重新运行节点时，它对于获得一致的结果很重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数决定了采样过程中的迭代次数。它影响节点的执行时间，并且可能影响生成样本向期望结果的收敛。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数，代表无分类器指导比例，是控制模型潜在空间探索与遵循所提供条件之间平衡的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name 参数指定节点要使用的采样方法。它很重要，因为它可以改变生成样本的特性，可能导致不同的视觉结果。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler 参数定义了在采样过程中要应用的学习率调度器。它在优化生成样本中发挥作用，可能影响它们的质量。
    - Comfy dtype: STRING
    - Python dtype: str
- start_denoise
    - start_denoise 参数设置初始去噪强度，对于生成图像的初始清晰度至关重要。它是节点能够产生高质量去噪输出的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise_increment
    - denoise_increment 参数指示每个后续步骤中去噪强度的增加量。它对于控制图像清晰度提高的速度很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- denoise_increment_steps
    - denoise_increment_steps 参数指定去噪强度将增加的步数。它对于确定去噪过程的总持续时间很重要。
    - Comfy dtype: INT
    - Python dtype: int
- optional_vae
    - optional_vae 参数允许提供可选的变分自编码器，它可以用于对潜在表示进行额外的处理或操作。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Output types
- model
    - 模型输出参数代表了采样过程中使用的生成模型。它很重要，因为它是生成潜在样本的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正向条件输出参数提供了引导生成过程朝向有利结果的条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负向条件输出参数代表了在生成过程中用来抑制某些结果的条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 潜在输出参数包含通过采样过程精炼的图像的潜在表示。这些经过精炼的潜在状态对于生成高质量图像至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- vae
    - 如果作为输入提供，vae 输出参数代表了用于潜在表示的额外处理的变分自编码器。它标志着采用先进技术以获得改进的结果。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class Gradually_More_Denoise_KSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'start_denoise': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'denoise_increment': ('FLOAT', {'default': 0.1, 'min': 0.0, 'max': 1.0, 'step': 0.1}), 'denoise_increment_steps': ('INT', {'default': 20, 'min': 1, 'max': 10000})}, 'optional': {'optional_vae': ('VAE',)}}
    RETURN_TYPES = ('MODEL', 'CONDITIONING', 'CONDITIONING', 'LATENT', 'VAE')
    RETURN_NAMES = ('MODEL', 'CONDITIONING+', 'CONDITIONING-', 'LATENT', 'VAE')
    OUTPUT_NODE = True
    FUNCTION = 'sample'
    CATEGORY = 'ComfyUI-Frame-Interpolation/others'

    def sample(self, model, positive, negative, latent_image, optional_vae, seed, steps, cfg, sampler_name, scheduler, start_denoise, denoise_increment, denoise_increment_steps):
        if start_denoise + denoise_increment * denoise_increment_steps > 1.0:
            raise Exception(f"Max denoise strength can't over 1.0 (start_denoise={start_denoise}, denoise_increment={denoise_increment}, denoise_increment_steps={denoise_increment_steps}")
        copied_latent = latent_image.copy()
        out_samples = []
        for latent_sample in copied_latent['samples']:
            latent = {'samples': einops.rearrange(latent_sample, 'c h w -> 1 c h w')}
            gradually_denoising_samples = [common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent, denoise=start_denoise + denoise_increment * i)[0]['samples'] for i in range(denoise_increment_steps)]
            out_samples.extend(gradually_denoising_samples)
        copied_latent['samples'] = torch.cat(out_samples, dim=0)
        return (model, positive, negative, copied_latent, optional_vae)
```