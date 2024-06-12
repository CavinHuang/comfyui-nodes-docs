# Documentation
- Class name: LatentPixelScale
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

LatentPixelScale节点旨在将图像的潜在表示上采样到更高分辨率。它通过应用各种缩放方法和因子来增强潜在图像的细节和清晰度。该节点在图像处理流程中扮演着关键角色，使得从低分辨率潜在状态创建高分辨率图像成为可能。

# Input types
## Required
- samples
    - 参数'samples'至关重要，因为它代表了要上采样的图像的潜在表示。它是影响节点操作和上采样输出质量的主要输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- scale_method
    - 参数'scale_method'决定了用于上采样潜在图像的算法。这是一个关键的选择，它影响着上采样图像的最终外观和性能。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'lanczos', 'area']
    - Python dtype: str
- scale_factor
    - 参数'scale_factor'定义了潜在图像上采样的程度。它是控制图像放大倍数和最终分辨率的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- vae
    - 参数'vae'是一个变分自编码器模型，用于解码和编码潜在表示。它对节点的功能至关重要，确保了上采样过程中图像的完整性。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
## Optional
- use_tiled_vae
    - 参数'use_tiled_vae'指示节点是否应该使用平铺方法来解码和编码潜在表示。这可以提高大图像的效率。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- upscale_model_opt
    - 可选参数'upscale_model_opt'允许指定在上采样过程中使用的自定义模型。它为希望应用特定上采样技术的高级用户提供了灵活性。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: torch.nn.Module

# Output types
- latent
    - 输出'latent'代表了输入图像的上采样潜在表示。它很重要，因为它保留了通过上采样过程实现的增强细节和分辨率。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- image
    - 输出'image'是上采样潜在图像的视觉表示。它是节点的最终产品，以人类可读的格式展示了上采样过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: CPU

# Source code
```
class LatentPixelScale:
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'scale_method': (s.upscale_methods,), 'scale_factor': ('FLOAT', {'default': 1.5, 'min': 0.1, 'max': 10000, 'step': 0.1}), 'vae': ('VAE',), 'use_tiled_vae': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'})}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',)}}
    RETURN_TYPES = ('LATENT', 'IMAGE')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, samples, scale_method, scale_factor, vae, use_tiled_vae, upscale_model_opt=None):
        if upscale_model_opt is None:
            latimg = core.latent_upscale_on_pixel_space2(samples, scale_method, scale_factor, vae, use_tile=use_tiled_vae)
        else:
            latimg = core.latent_upscale_on_pixel_space_with_model2(samples, scale_method, upscale_model_opt, scale_factor, vae, use_tile=use_tiled_vae)
        return latimg
```