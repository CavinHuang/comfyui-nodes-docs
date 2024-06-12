# Documentation
- Class name: SamplerCustomAdvanced
- Category: sampling/custom_sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerCustomAdvanced节点旨在对潜在图像执行高级采样操作。它利用各种组件，如噪声生成、引导和采样机制，以产生高质量的输出。此节点在自定义采样工作流程中至关重要，提供了一种复杂的生成和完善潜在表示的方法。

# Input types
## Required
- noise
    - 噪声参数对于采样过程至关重要，因为它在潜在空间中引入了随机性，使得能够生成多样化的输出。它在确定采样图像的质量和多样性方面起着重要作用。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor
- guider
    - 引导器参数对于将采样过程引导至期望结果至关重要。它通过基于特定标准或目标提供指导，有助于完善潜在表示。
    - Comfy dtype: GUIDER
    - Python dtype: torch.nn.Module
- sampler
    - 采样器参数决定了节点使用的采样策略。它是采样过程效率和有效性的关键决定因素，影响节点生成高保真潜在图像的能力。
    - Comfy dtype: SAMPLER
    - Python dtype: torch.nn.Module
- sigmas
    - sigmas参数表示采样过程中使用的噪声水平或尺度。它对于控制生成图像中的噪声量和细节很重要，因此影响输出的整体质量。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor
- latent_image
    - latent_image参数是采样过程的输入，代表潜在表示的初始状态。它是节点操作的基础，因为它是生成最终采样图像的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- output
    - SamplerCustomAdvanced节点的输出参数包含采样的潜在图像。它是节点操作的主要结果，对进一步处理或分析具有重要价值。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- denoised_output
    - denoised_output参数提供了经过去噪处理的采样潜在图像的版本。对于需要优先考虑噪声降低的应用，此输出特别有用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SamplerCustomAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'noise': ('NOISE',), 'guider': ('GUIDER',), 'sampler': ('SAMPLER',), 'sigmas': ('SIGMAS',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('output', 'denoised_output')
    FUNCTION = 'sample'
    CATEGORY = 'sampling/custom_sampling'

    def sample(self, noise, guider, sampler, sigmas, latent_image):
        latent = latent_image
        latent_image = latent['samples']
        noise_mask = None
        if 'noise_mask' in latent:
            noise_mask = latent['noise_mask']
        x0_output = {}
        callback = latent_preview.prepare_callback(guider.model_patcher, sigmas.shape[-1] - 1, x0_output)
        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = guider.sample(noise.generate_noise(latent), latent_image, sampler, sigmas, denoise_mask=noise_mask, callback=callback, disable_pbar=disable_pbar, seed=noise.seed)
        samples = samples.to(comfy.model_management.intermediate_device())
        out = latent.copy()
        out['samples'] = samples
        if 'x0' in x0_output:
            out_denoised = latent.copy()
            out_denoised['samples'] = guider.model_patcher.model.process_latent_out(x0_output['x0'].cpu())
        else:
            out_denoised = out
        return (out, out_denoised)
```