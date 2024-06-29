# Documentation
- Class name: StyleAlignedSampleReferenceLatents
- Category: style_aligned
- Output node: False
- Repo Ref: https://github.com/brianfitzgerald/style_aligned_comfy

StyleAlignedSampleReferenceLatents节点的'sample'方法旨在生成与给定潜在图像风格一致的参考潜在序列。它利用模型采样一个风格上与输入条件一致的噪声输出。此节点在需要一系列生成图像保持风格一致性的应用中至关重要。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它提供了用于采样的底层神经网络架构。它直接影响生成潜在的质量与风格。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - positive参数定义了引导采样朝向特定风格的正向条件因素。它在塑造输出的风格特征中扮演重要角色。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, torch.Tensor]
- negative
    - negative参数指定了采样过程中要避免的条件因素，确保生成的潜在不展示不希望的风格特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: Union[str, torch.Tensor]
- sampler
    - sampler参数决定了节点使用的采样策略。它对于控制生成潜在的随机性和多样性至关重要。
    - Comfy dtype: SAMPLER
    - Python dtype: Callable
- sigmas
    - sigmas参数表示采样过程中使用的方差，用于控制噪声的传播。它是微调潜在风格细节的关键因素。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor
- latent_image
    - latent_image参数是一个关键输入，它提供了采样过程开始的初始潜在状态。它为生成的参考潜在设置了基础风格。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- noise_seed
    - noise_seed参数用于初始化采样过程中应用的随机噪声。当需要特定噪声模式时，它确保结果的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数控制采样过程的配置，影响生成潜在的规模和细节。它是实现所需风格结果的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- ref_latents
    - ref_latents输出是由节点生成的一系列参考潜在。这些潜在与输入潜在图像的风格一致，并用于进一步的处理或分析。
    - Comfy dtype: STEP_LATENTS
    - Python dtype: torch.Tensor
- noised_output
    - noised_output参数代表采样过程的最终输出，这是输入潜在图像的噪声版本。它封装了输入的风格精髓，同时引入了变化性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class StyleAlignedSampleReferenceLatents:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'sampler': ('SAMPLER',), 'sigmas': ('SIGMAS',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('STEP_LATENTS', 'LATENT')
    RETURN_NAMES = ('ref_latents', 'noised_output')
    FUNCTION = 'sample'
    CATEGORY = 'style_aligned'

    def sample(self, model, noise_seed, cfg, positive, negative, sampler, sigmas, latent_image):
        sigmas = sigmas.flip(0)
        if sigmas[0] == 0:
            sigmas[0] = 0.0001
        latent = latent_image
        latent_image = latent['samples']
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device='cpu')
        noise_mask = None
        if 'noise_mask' in latent:
            noise_mask = latent['noise_mask']
        ref_latents = []

        def callback(step: int, x0: T, x: T, steps: int):
            ref_latents.insert(0, x[0])
        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = comfy.sample.sample_custom(model, noise, cfg, sampler, sigmas, positive, negative, latent_image, noise_mask=noise_mask, callback=callback, disable_pbar=disable_pbar, seed=noise_seed)
        out = latent.copy()
        out['samples'] = samples
        out_noised = out
        ref_latents = torch.stack(ref_latents)
        return (ref_latents, out_noised)
```