# Documentation
- Class name: PPFNLatentAdjustment
- Category: Power Noise Suite/Latent/Adjustements
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

这个节点类旨在调整和增强由潜在向量表示的图像的视觉特征。它操纵各种图像属性，如亮度、对比度、饱和度和锐度，以实现期望的视觉结果。该节点基于修改图像的潜在表示来运作，允许在不直接改变像素数据的情况下对图像进行广泛的创意控制。它特别适用于生成符合特定审美标准的形象或微调生成图像的质量。

# Input types
## Required
- latents
    - latents参数是表示图像潜在空间编码的输入张量。它至关重要，因为它构成了节点执行所有图像调整和增强的基础。这个参数的操纵直接影响最终的视觉输出，使得从微妙到剧烈的广泛修改成为可能。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- brightness
    - 亮度参数控制图像的整体亮度。通过调整此参数，用户可以使图像变亮或变暗，这可以显著改变视觉内容的情绪和外观。它在设定生成图像的基调和整体外观中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 对比度调整影响图像最亮和最暗部分之间的差异。它有助于增强视觉深度和细节，使图像更加生动和引人入胜。这个参数对于创建具有动态范围和现实感的图像至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- saturation
    - 饱和度参数调整图像中颜色的强度。增加饱和度会使颜色更加鲜艳，而减少饱和度会使颜色更加柔和。这个参数对于通过颜色的使用实现期望的审美和情感影响很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- exposure
    - 曝光控制影响图像的整体亮度，类似于调整相机上的ISO设置。它是一个重要的参数，用于模拟不同的光照条件并实现期望的视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- alpha_sharpen
    - alpha_sharpen参数用于对图像应用锐化效果。它增强了边缘和细节，使图像看起来更加清晰和鲜明。这个参数对于在最终输出中实现高度的细节和清晰度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_pass_radius
    - high_pass_radius参数对图像应用高通滤波器，强调高频细节，使图像更加清晰。它有助于增强局部对比度和改善图像的纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- high_pass_strength
    - high_pass_strength参数控制高通滤波器效果的强度。调整此参数允许微调滤波器对图像的影响，确保达到期望的细节和清晰度水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_min
    - clamp_min参数确保调整后的潜在值不会低于某个阈值，防止出现任何不期望的伪影或负值。这对于保持图像的完整性和质量很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_max
    - clamp_max参数将潜在的最大值限制在指定的范围内，确保值保持在期望的范围内且不会超过。这对于防止图像过度曝光或颜色饱和至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- latent2rgb_preview
    - latent2rgb_preview参数是一个可选的切换，启用后将生成调整后的潜在向量的RGB图像预览。这个特性有助于实时可视化调整的效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latents
    - 调整后的潜在向量是表示图像修改后的潜在空间编码的输出张量。这个参数包含了通过节点调整所做的所有更改，是生成最终图像的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- previews
    - 预览参数提供了调整后的潜在向量的可视化表示，作为RGB图像。这个输出对于立即反馈和评估节点的性能以及所做调整的有效性非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PPFNLatentAdjustment:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'latents': ('LATENT',), 'brightness': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': -1.0, 'step': 0.001}), 'contrast': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': -1.0, 'step': 0.001}), 'saturation': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': 0.0, 'step': 0.001}), 'exposure': ('FLOAT', {'default': 0.0, 'max': 2.0, 'min': -1.0, 'step': 0.001}), 'alpha_sharpen': ('FLOAT', {'default': 0.0, 'max': 10.0, 'min': 0.0, 'step': 0.01}), 'high_pass_radius': ('FLOAT', {'default': 0.0, 'max': 1024, 'min': 0.0, 'step': 0.01}), 'high_pass_strength': ('FLOAT', {'default': 1.0, 'max': 2.0, 'min': 0.0, 'step': 0.01}), 'clamp_min': ('FLOAT', {'default': 0.0, 'max': 10.0, 'min': -10.0, 'step': 0.01}), 'clamp_max': ('FLOAT', {'default': 1.0, 'max': 10.0, 'min': -10.0, 'step': 0.01})}, 'optional': {'latent2rgb_preview': (['false', 'true'],)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    RETURN_NAMES = ('latents', 'previews')
    FUNCTION = 'adjust_latent'
    CATEGORY = 'Power Noise Suite/Latent/Adjustements'

    def adjust_latent(self, latents, brightness, contrast, saturation, exposure, alpha_sharpen, high_pass_radius, high_pass_strength, clamp_min, clamp_max, latent2rgb_preview=False):
        original_latents = latents['samples']
        (r, g, b, a) = (original_latents[:, 0:1], original_latents[:, 1:2], original_latents[:, 2:3], original_latents[:, 3:4])
        r = (r - 0.5) * contrast + 0.5 + (brightness - 1.0)
        g = (g - 0.5) * contrast + 0.5 + (brightness - 1.0)
        b = (b - 0.5) * contrast + 0.5 + (brightness - 1.0)
        gray = 0.299 * r + 0.587 * g + 0.114 * b
        r = (r - gray) * saturation + gray
        g = (g - gray) * saturation + gray
        b = (b - gray) * saturation + gray
        r = r * 2 ** exposure
        g = g * 2 ** exposure
        b = b * 2 ** exposure
        latents = torch.cat((r, g, b, a), dim=1)
        if alpha_sharpen > 0:
            latents = sharpen_latents(latents, alpha_sharpen)
        if high_pass_radius > 0:
            latents = high_pass_latents(latents, high_pass_radius, high_pass_strength)
        if clamp_min != 0:
            latents = normalize(latents, target_min=clamp_min)
        if clamp_max != 1:
            latents = normalize(latents, target_max=clamp_max)
        if clamp_min != 0 and clamp_max != 1.0:
            latents = normalize(latents, target_min=clamp_min, target_max=clamp_max)
        tensors = latents_to_images(latents, True if latent2rgb_preview and latent2rgb_preview == 'true' else False)
        return ({'samples': latents}, tensors)
```