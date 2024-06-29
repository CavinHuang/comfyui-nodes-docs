# Documentation
- Class name: SamplerCustom
- Category: sampling/custom_sampling
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SamplerCustom节点旨在促进生成模型中的采样过程。它整合了诸如噪声添加、模型处理和潜在图像操作等多种组件，以产生高质量的输出。该节点旨在提供一种可定制和高效的采样方法，允许对生成过程进行微调和控制。

# Input types
## Required
- model
    - 模型参数对节点至关重要，因为它定义了用于采样的生成模型。它直接影响生成输出的质量和类型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - positive参数提供正向条件信息，引导采样过程朝着期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - negative参数提供负向条件信息，以避免在生成的样本中出现不希望的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- sampler
    - sampler参数指定要使用的采样方法，这可以显著影响采样过程的效率和效果。
    - Comfy dtype: SAMPLER
    - Python dtype: str
- sigmas
    - sigmas参数定义了采样过程中每个步骤要使用的噪声水平，影响噪声减少和图像清晰度。
    - Comfy dtype: SIGMAS
    - Python dtype: List[float]
- latent_image
    - latent_image参数是必不可少的，因为它代表了采样过程开始的输入潜在空间。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- add_noise
    - add_noise参数决定在采样期间是否应将噪声添加到潜在图像中。这会影响生成样本的多样性和随机性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - noise_seed参数用于初始化噪声生成过程，确保采样结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样过程的配置，允许用户控制生成图像的保真度和细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - output参数代表采样过程的主要结果，包含生成的潜在样本。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- denoised_output
    - denoised_output参数提供生成样本的去噪版本，可能会提供更清晰、更精细的结果。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class SamplerCustom:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'add_noise': ('BOOLEAN', {'default': True}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'sampler': ('SAMPLER',), 'sigmas': ('SIGMAS',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('output', 'denoised_output')
    FUNCTION = 'sample'
    CATEGORY = 'sampling/custom_sampling'

    def sample(self, model, add_noise, noise_seed, cfg, positive, negative, sampler, sigmas, latent_image):
        latent = latent_image
        latent_image = latent['samples']
        if not add_noise:
            noise = Noise_EmptyNoise().generate_noise(latent)
        else:
            noise = Noise_RandomNoise(noise_seed).generate_noise(latent)
        noise_mask = None
        if 'noise_mask' in latent:
            noise_mask = latent['noise_mask']
        x0_output = {}
        callback = latent_preview.prepare_callback(model, sigmas.shape[-1] - 1, x0_output)
        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = comfy.sample.sample_custom(model, noise, cfg, sampler, sigmas, positive, negative, latent_image, noise_mask=noise_mask, callback=callback, disable_pbar=disable_pbar, seed=noise_seed)
        out = latent.copy()
        out['samples'] = samples
        if 'x0' in x0_output:
            out_denoised = latent.copy()
            out_denoised['samples'] = model.model.process_latent_out(x0_output['x0'].cpu())
        else:
            out_denoised = out
        return (out, out_denoised)
```