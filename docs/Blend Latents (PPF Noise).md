# Documentation
- Class name: PPFNBlendLatents
- Category: Power Noise Suite/Latent/Adjustements
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点旨在通过指定的混合操作和比例调整两组潜在表示的视觉特征，通过允许对最终输出外观进行细微控制，增强生成过程。

# Input types
## Required
- latent_a
    - 第一个输入的潜在表示，它构成了混合过程的基础，并显著影响生成输出的初始视觉特征。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- latent_b
    - 第二个输入的潜在表示，它通过引入变化和细微差别，丰富了最终视觉结果，对混合过程做出贡献。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- operation
    - 混合模式决定了用于组合潜在表示的算法方法，从根本上影响了生成图像的风格和一致性。
    - Comfy dtype: COMBO
    - Python dtype: str
- blend_ratio
    - 比例决定了两个潜在表示之间的平衡，赋予其中一个更大的影响力，会导致输出中更明显的视觉变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blend_strength
    - Strength调节混合操作的强度，对最终图像的细节和清晰度产生重要影响，较高的值可能导致更显著的特征变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- mask
    - 可以应用掩码来选择性地混合潜在表示的某些区域，允许有针对性的调整和对特定视觉元素的更大控制。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- set_noise_mask
    - 启用此选项时，将向掩码中添加噪声，为混合过程引入随机性，并可能为输出增加多样性。
    - Comfy dtype: COMBO
    - Python dtype: str
- normalize
    - 规范化调整潜在表示内的值范围，确保混合过程是一致的，并且最终输出在一个可预测的视觉范围内。
    - Comfy dtype: COMBO
    - Python dtype: str
- clamp_min
    - 该参数设置了混合后潜在表示的最小值，防止任何值低于某个阈值，并保持所需的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_max
    - 与clamp_min类似，该参数限制了潜在表示的最大值，确保混合输出不超过指定的限制，避免过度的视觉伪影。
    - Comfy dtype: FLOAT
    - Python dtype: float
- latent2rgb_preview
    - 启用此选项时，将生成潜在表示作为RGB图像的实时预览，为混合过程提供即时的视觉反馈。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- latents
    - 输出的潜在表示已经根据指定的参数进行了混合，代表了调整和精炼后的视觉信息，准备进行进一步的处理或生成。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- previews
    - 如果启用，此输出提供混合潜在表示的RGB图像的视觉预览，为混合操作的有效性提供了有形的参考。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNBlendLatents:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latent_a': ('LATENT',), 'latent_b': ('LATENT',), 'operation': (sorted(list(blending_modes.keys())),), 'blend_ratio': ('FLOAT', {'default': 0.5, 'min': 0.01, 'max': 1.0, 'step': 0.01}), 'blend_strength': ('FLOAT', {'default': 1.0, 'min': -100.0, 'max': 100.0, 'step': 0.01})}, 'optional': {'mask': ('MASK',), 'set_noise_mask': (['false', 'true'],), 'normalize': (['false', 'true'],), 'clamp_min': ('FLOAT', {'default': 0.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'clamp_max': ('FLOAT', {'default': 1.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'latent2rgb_preview': (['false', 'true'],)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'previews')
    FUNCTION = 'latent_blend'
    CATEGORY = 'Power Noise Suite/Latent/Adjustements'

    def latent_blend(self, latent_a, latent_b, operation, blend_ratio, blend_strength, mask=None, set_noise_mask=None, normalize=None, clamp_min=None, clamp_max=None, latent2rgb_preview=None):
        latent_a = latent_a['samples'][:, :-1]
        latent_b = latent_b['samples'][:, :-1]
        assert latent_a.shape == latent_b.shape, f'Input latents must have the same shape, but got: a {latent_a.shape}, b {latent_b.shape}'
        alpha_a = latent_a[:, -1:]
        alpha_b = latent_b[:, -1:]
        blended_rgb = self.blend_latents(latent_a, latent_b, operation, blend_ratio, blend_strength, clamp_min, clamp_max)
        blended_alpha = torch.ones_like(blended_rgb[:, :1])
        blended_latent = torch.cat((blended_rgb, blended_alpha), dim=1)
        tensors = latents_to_images(blended_latent, True if latent2rgb_preview and latent2rgb_preview == 'true' else False)
        if mask is not None:
            blend_mask = self.transform_mask(mask, latent_a['samples'].shape)
            blended_latent = blend_mask * blended_latent + (1 - blend_mask) * latent_a['samples']
            if set_noise_mask == 'true':
                return ({'samples': blended_latent, 'noise_mask': mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1]))}, tensors)
            else:
                return ({'samples': blended_latent}, tensors)
        else:
            return ({'samples': blended_latent}, tensors)

    def blend_latents(self, latent1, latent2, mode='add', blend_percentage=0.5, blend_strength=0.5, mask=None, clamp_min=0.0, clamp_max=1.0):
        blend_func = blending_modes.get(mode)
        if blend_func is None:
            raise ValueError(f"Unsupported blending mode. Please choose from the supported modes: {', '.join(list(blending_modes.keys()))}")
        blend_factor1 = blend_percentage
        blend_factor2 = 1 - blend_percentage
        blended_latent = blend_func(latent1, latent2, blend_strength * blend_factor1)
        if normalize and normalize == 'true':
            blended_latent = normalize(blended_latent, clamp_min, clamp_max)
        return blended_latent

    def transform_mask(self, mask, shape):
        mask = mask.view(-1, 1, mask.shape[-2], mask.shape[-1])
        resized_mask = torch.nn.functional.interpolate(mask, size=(shape[2], shape[3]), mode='bilinear')
        expanded_mask = resized_mask.expand(-1, shape[1], -1, -1)
        if expanded_mask.shape[0] < shape[0]:
            expanded_mask = expanded_mask.repeat((shape[0] - 1) // expanded_mask.shape[0] + 1, 1, 1, 1)[:shape[0]]
        del mask, resized_mask
        return expanded_mask
```