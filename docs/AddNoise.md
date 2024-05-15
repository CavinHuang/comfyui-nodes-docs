# Documentation
- Class name: AddNoise
- Category: _for_testing/custom_sampling/noise
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AddNoise节点旨在向潜在图像引入随机噪声，这是生成合成图像过程中的关键步骤。它通过根据指定的sigmas对噪声进行缩放，然后将噪声与潜在图像结合，以产生带噪声的输出。该节点对于模拟图像数据中固有的噪声特性至关重要，从而增强了生成图像的多样性和逼真度。

# Input types
## Required
- model
    - 模型参数对于AddNoise节点至关重要，因为它决定了用于采样和处理潜在图像的模型。它是节点执行的基础，直接影响生成的带噪声图像的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- noise
    - 噪声参数对于AddNoise节点至关重要，因为它提供了将被整合到潜在图像中的随机性来源。噪声的类型和属性可以显著影响输出图像的多样性和不可预测性。
    - Comfy dtype: NOISE
    - Python dtype: Callable[..., torch.Tensor]
- sigmas
    - sigmas参数决定了要添加到潜在图像中的噪声的规模。它在控制噪声水平以及合成图像的视觉外观中起着关键作用。
    - Comfy dtype: SIGMAS
    - Python dtype: List[float]
- latent_image
    - latent_image参数是AddNoise节点的核心输入，代表将通过添加噪声进行修改的图像数据。其结构和内容对节点的功能以及图像合成过程的最终结果至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Output types
- latent
    - 输出的latent参数代表应用AddNoise节点后得到的带噪声图像。它封装了携带所需噪声特性的合成数据，可供进一步处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class AddNoise:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'noise': ('NOISE',), 'sigmas': ('SIGMAS',), 'latent_image': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'add_noise'
    CATEGORY = '_for_testing/custom_sampling/noise'

    def add_noise(self, model, noise, sigmas, latent_image):
        if len(sigmas) == 0:
            return latent_image
        latent = latent_image
        latent_image = latent['samples']
        noisy = noise.generate_noise(latent)
        model_sampling = model.get_model_object('model_sampling')
        process_latent_out = model.get_model_object('process_latent_out')
        process_latent_in = model.get_model_object('process_latent_in')
        if len(sigmas) > 1:
            scale = torch.abs(sigmas[0] - sigmas[-1])
        else:
            scale = sigmas[0]
        if torch.count_nonzero(latent_image) > 0:
            latent_image = process_latent_in(latent_image)
        noisy = model_sampling.noise_scaling(scale, noisy, latent_image)
        noisy = process_latent_out(noisy)
        noisy = torch.nan_to_num(noisy, nan=0.0, posinf=0.0, neginf=0.0)
        out = latent.copy()
        out['samples'] = noisy
        return (out,)
```