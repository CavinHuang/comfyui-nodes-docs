# Documentation
- Class name: TwoSamplersForMask
- Category: ImpactPack/Sampler
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

该节点通过整合两种不同的采样机制来协调采样过程，允许生成符合特定遮罩标准的潜在表示。它增强了模型关注相关特征和抑制不需要的信息的能力，从而实现更受控和针对性的采样结果。

# Input types
## Required
- latent_image
    - 潜在图像是携带采样过程所需基础结构和特征的输入表示。它至关重要，因为它构成了节点操作的基础，影响最终输出的质量和特征。
    - Comfy dtype: LATENT
    - Python dtype: dict
- base_sampler
    - 基础采样器是提供基础采样能力的重要组件。它负责初步生成潜在图像，为掩码采样器进一步的细化和操作奠定基础。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSamplerWrapper or KSamplerAdvancedWrapper
- mask_sampler
    - 掩码采样器在应用特定遮罩标准到潜在图像中扮演关键角色。它通过专注于所需特征和抑制不相关特征来精炼采样过程，从而根据预定义的掩码塑造最终输出。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSamplerWrapper or KSamplerAdvancedWrapper
- mask
    - 掩码参数是一个二进制表示，它决定了应该保留或丢弃潜在图像的哪些区域。它是节点操作的一个组成部分，因为它指导掩码采样器确定应该关注哪些特征以及忽略哪些特征。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- latent_image
    - 输出潜在图像是结合了基础和掩码采样器结果的精炼表示。它根据掩码封装了所需的特征并抑制了不相关的特征，作为后续模型操作的最终输入。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Usage tips
- Infra type: GPU

# Source code
```
class TwoSamplersForMask:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent_image': ('LATENT',), 'base_sampler': ('KSAMPLER',), 'mask_sampler': ('KSAMPLER',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Sampler'

    def doit(self, latent_image, base_sampler, mask_sampler, mask):
        inv_mask = torch.where(mask != 1.0, torch.tensor(1.0), torch.tensor(0.0))
        latent_image['noise_mask'] = inv_mask
        new_latent_image = base_sampler.sample(latent_image)
        new_latent_image['noise_mask'] = mask
        new_latent_image = mask_sampler.sample(new_latent_image)
        del new_latent_image['noise_mask']
        return (new_latent_image,)
```