# Documentation
- Class name: WAS_Blend_Latents
- Category: WAS Suite/Latent
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Blend_Latents 类的 `latent_blend` 方法旨在使用多种混合操作来组合两个潜在表示。此方法对于从单独的潜在输入生成复合输出至关重要，它可以在图像合成和风格迁移等不同应用中非常有用。它强调了节点在创建两个潜在空间的无缝混合中的作用，突出了其灵活性和适应不同混合模式的能力。

# Input types
## Required
- latent_a
    - 参数 `latent_a` 表示要混合的第一个潜在向量。它在混合过程中起着关键作用，因为它构成了复合潜在输出的基础。这个参数的重要性在于它对混合的初始状态的贡献，这对最终结果有显著影响。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- latent_b
    - 参数 `latent_b` 是要与 `latent_a` 混合的第二个潜在向量。它在混合过程中同样重要，因为它为最终混合的潜在表示引入了变化和额外的特征。`latent_a` 和 `latent_b` 之间的相互作用最终决定了混合的结果。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- operation
    - 参数 `operation` 确定在组合 `latent_a` 和 `latent_b` 时应用的混合模式。它是节点功能的关键方面，因为它决定了两个潜在向量如何相互作用。操作的选择可以极大地改变混合输出的性质，使这个参数在节点的整体执行中具有很高的影响力。
    - Comfy dtype: COMBO['add', 'multiply', 'divide', 'subtract', 'overlay', 'hard_light', 'soft_light', 'screen', 'linear_dodge', 'difference', 'exclusion', 'random']
    - Python dtype: str
## Optional
- blend
    - 参数 `blend` 控制两个潜在向量之间的混合程度。它是一个可选参数，允许微调 `latent_a` 和 `latent_b` 之间的平衡。`blend` 参数很重要，因为它提供了调整混合强度的手段，对最终输出提供了一定程度的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- samples
    - 输出参数 `samples` 表示应用所选混合操作后得到的混合潜在表示。它包含了输入潜在向量的组合特征，提供了一个单一的输出，反映了两个输入的本质。这个输出很重要，因为它是节点混合过程的顶点，用于进一步的处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Blend_Latents:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latent_a': ('LATENT',), 'latent_b': ('LATENT',), 'operation': (['add', 'multiply', 'divide', 'subtract', 'overlay', 'hard_light', 'soft_light', 'screen', 'linear_dodge', 'difference', 'exclusion', 'random'],), 'blend': ('FLOAT', {'default': 0.5, 'min': 0.01, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'latent_blend'
    CATEGORY = 'WAS Suite/Latent'

    def latent_blend(self, latent_a, latent_b, operation, blend):
        return ({'samples': self.blend_latents(latent_a['samples'], latent_b['samples'], operation, blend)},)

    def blend_latents(self, latent1, latent2, mode='add', blend_percentage=0.5):

        def overlay_blend(latent1, latent2, blend_factor):
            low = 2 * latent1 * latent2
            high = 1 - 2 * (1 - latent1) * (1 - latent2)
            blended_latent = latent1 * blend_factor * low + latent2 * blend_factor * high
            return blended_latent

        def screen_blend(latent1, latent2, blend_factor):
            inverted_latent1 = 1 - latent1
            inverted_latent2 = 1 - latent2
            blended_latent = 1 - inverted_latent1 * inverted_latent2 * (1 - blend_factor)
            return blended_latent

        def difference_blend(latent1, latent2, blend_factor):
            blended_latent = abs(latent1 - latent2) * blend_factor
            return blended_latent

        def exclusion_blend(latent1, latent2, blend_factor):
            blended_latent = (latent1 + latent2 - 2 * latent1 * latent2) * blend_factor
            return blended_latent

        def hard_light_blend(latent1, latent2, blend_factor):
            blended_latent = torch.where(latent2 < 0.5, 2 * latent1 * latent2, 1 - 2 * (1 - latent1) * (1 - latent2)) * blend_factor
            return blended_latent

        def linear_dodge_blend(latent1, latent2, blend_factor):
            blended_latent = torch.clamp(latent1 + latent2, 0, 1) * blend_factor
            return blended_latent

        def soft_light_blend(latent1, latent2, blend_factor):
            low = 2 * latent1 * latent2 + latent1 ** 2 - 2 * latent1 * latent2 * latent1
            high = 2 * latent1 * (1 - latent2) + torch.sqrt(latent1) * (2 * latent2 - 1)
            blended_latent = latent1 * blend_factor * low + latent2 * blend_factor * high
            return blended_latent

        def random_noise(latent1, latent2, blend_factor):
            noise1 = torch.randn_like(latent1)
            noise2 = torch.randn_like(latent2)
            noise1 = (noise1 - noise1.min()) / (noise1.max() - noise1.min())
            noise2 = (noise2 - noise2.min()) / (noise2.max() - noise2.min())
            blended_noise = latent1 * blend_factor * noise1 + latent2 * blend_factor * noise2
            blended_noise = torch.clamp(blended_noise, 0, 1)
            return blended_noise
        blend_factor1 = blend_percentage
        blend_factor2 = 1 - blend_percentage
        if mode == 'add':
            blended_latent = latent1 * blend_factor1 + latent2 * blend_factor2
        elif mode == 'multiply':
            blended_latent = latent1 * blend_factor1 * (latent2 * blend_factor2)
        elif mode == 'divide':
            blended_latent = latent1 * blend_factor1 / (latent2 * blend_factor2)
        elif mode == 'subtract':
            blended_latent = latent1 * blend_factor1 - latent2 * blend_factor2
        elif mode == 'overlay':
            blended_latent = overlay_blend(latent1, latent2, blend_factor1)
        elif mode == 'screen':
            blended_latent = screen_blend(latent1, latent2, blend_factor1)
        elif mode == 'difference':
            blended_latent = difference_blend(latent1, latent2, blend_factor1)
        elif mode == 'exclusion':
            blended_latent = exclusion_blend(latent1, latent2, blend_factor1)
        elif mode == 'hard_light':
            blended_latent = hard_light_blend(latent1, latent2, blend_factor1)
        elif mode == 'linear_dodge':
            blended_latent = linear_dodge_blend(latent1, latent2, blend_factor1)
        elif mode == 'soft_light':
            blended_latent = soft_light_blend(latent1, latent2, blend_factor1)
        elif mode == 'random':
            blended_latent = random_noise(latent1, latent2, blend_factor1)
        else:
            raise ValueError("Unsupported blending mode. Please choose from 'add', 'multiply', 'divide', 'subtract', 'overlay', 'screen', 'difference', 'exclusion', 'hard_light', 'linear_dodge', 'soft_light', 'custom_noise'.")
        blended_latent = self.normalize(blended_latent)
        return blended_latent

    def normalize(self, latent):
        return (latent - latent.min()) / (latent.max() - latent.min())
```