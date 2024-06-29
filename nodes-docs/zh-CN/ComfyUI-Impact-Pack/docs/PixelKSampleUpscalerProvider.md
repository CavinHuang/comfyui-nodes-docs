# Documentation
- Class name: PixelKSampleUpscalerProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PixelKSampleUpscalerProvider 是一个用于图像放大的节点，它支持多种放大方法。该节点封装了选择放大技术和将其应用于输入图像所需的逻辑，提供了一个用于增强图像质量的无缝接口。

# Input types
## Required
- scale_method
    - 缩放方法决定了用于图像放大的算法。这是一个关键参数，因为它直接影响放大输出的质量和风格。
    - Comfy dtype: str
    - Python dtype: str
- model
    - 模型参数至关重要，因为它定义了用于放大过程的机器学习模型。模型的选择可以显著影响最终结果。
    - Comfy dtype: MODEL
    - Python dtype: Any
- vae
    - VAE（变分自编码器）用于放大过程中的特征提取或潜在空间操作。其配置可以增强放大图像的细节和质量。
    - Comfy dtype: VAE
    - Python dtype: Any
- seed
    - 种子通过为随机数生成提供已知的起始点来确保放大过程的可重复性，这对于一致的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数决定了放大期间的迭代过程，这可能会影响收敛和最终输出质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置值 'cfg' 是一个调整放大图像中细节和伪影平衡的参数，在最终外观中扮演重要角色。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称选择放大过程中使用的采样策略，这可以极大地影响操作的效率和结果。
    - Comfy dtype: str
    - Python dtype: str
- scheduler
    - 调度器决定了放大过程中参数更新的速率，影响放大输出的稳定性和性能。
    - Comfy dtype: str
    - Python dtype: str
- positive
    - 正向调节在放大期间为模型提供指导，专注于增强图像的特定特征或方面。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 负向调节有助于通过指导模型抑制某些伪影或特征，在放大期间避免不希望的效果。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- denoise
    - 去噪参数控制应用于放大图像的噪声减少级别，这可以提高最终输出的清晰度和清洁度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- use_tiled_vae
    - 使用平铺的VAE允许通过将较大的图像分解为更小、更易管理的平铺来处理，这对于内存效率是有益的。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tile_size
    - 当使用平铺的VAE时，平铺尺寸指定了用于平铺图像的平铺的尺寸，影响放大过程的粒度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- upscaler
    - 放大器是节点的主要输出，代表放大的图像或可用于放大图像的模型。它封装了放大过程的结果。
    - Comfy dtype: UPSCALER
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class PixelKSampleUpscalerProvider:
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'scale_method': (s.upscale_methods,), 'model': ('MODEL',), 'vae': ('VAE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'use_tiled_vae': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',), 'pk_hook_opt': ('PK_HOOK',)}}
    RETURN_TYPES = ('UPSCALER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, use_tiled_vae, upscale_model_opt=None, pk_hook_opt=None, tile_size=512):
        upscaler = core.PixelKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, use_tiled_vae, upscale_model_opt, pk_hook_opt, tile_size=tile_size)
        return (upscaler,)
```