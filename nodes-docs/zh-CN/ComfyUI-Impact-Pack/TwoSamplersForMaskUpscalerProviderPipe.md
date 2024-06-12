# Documentation
- Class name: TwoSamplersForMaskUpscalerProviderPipe
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

TwoSamplersForMaskUpscalerProviderPipe节点旨在高效地使用两种不同的采样方法对图像进行放大。它利用基础采样器和掩码采样器的组合，以及掩码和变分自编码器（VAE），执行放大过程。该节点能够处理不同的放大方法和计划，并且可以选择性地使用分块VAE以提高性能。它特别适用于需要高质量图像放大的应用。

# Input types
## Required
- scale_method
    - scale_method参数决定了用于图像放大的算法。这是一个关键组件，因为它直接影响放大过程的质量和效率。
    - Comfy dtype: str
    - Python dtype: str
- full_sample_schedule
    - full_sample_schedule参数决定了在放大过程中何时进行完整采样。这个参数对于控制采样频率，从而在速度和质量之间进行权衡至关重要。
    - Comfy dtype: str
    - Python dtype: str
- use_tiled_vae
    - 使用分块变分自编码器（VAE）可以通过允许更高效地处理大图像来增强放大过程。这个参数对于在GPU架构上优化性能具有重要意义。
    - Comfy dtype: bool
    - Python dtype: bool
- base_sampler
    - 基础采样器是放大过程中的一个基本组件，负责生成初始样本。其选择可以极大地影响放大的整体结果。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSampler
- mask_sampler
    - 掩码采样器与基础采样器一起使用，用于对图像的掩蔽区域应用特定的采样技术。它在实现目标放大效果中起着关键作用。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSampler
- mask
    - 掩码参数定义了将被掩码采样器处理的图像区域。它在选定区域的图像选择性放大中起着至关重要的作用。
    - Comfy dtype: MASK
    - Python dtype: Mask
- basic_pipe
    - 基本管道封装了放大过程所需的基本元素，包括变分自编码器（VAE）。它对节点的功能至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: BasicPipe
## Optional
- tile_size
    - tile_size参数指定了在使用分块VAE处理图像时使用的瓦片的尺寸。它对管理内存使用和处理时间很重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- upscaler
    - 节点的输出是一个包含放大过程结果的放大器对象。它很重要，因为它代表了用于进一步使用或分析的最终输出。
    - Comfy dtype: UPSCALER
    - Python dtype: Upscaler

# Usage tips
- Infra type: GPU

# Source code
```
class TwoSamplersForMaskUpscalerProviderPipe:
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'scale_method': (s.upscale_methods,), 'full_sample_schedule': (['none', 'interleave1', 'interleave2', 'interleave3', 'last1', 'last2', 'interleave1+last1', 'interleave2+last1', 'interleave3+last1'],), 'use_tiled_vae': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'base_sampler': ('KSAMPLER',), 'mask_sampler': ('KSAMPLER',), 'mask': ('MASK',), 'basic_pipe': ('BASIC_PIPE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}, 'optional': {'full_sampler_opt': ('KSAMPLER',), 'upscale_model_opt': ('UPSCALE_MODEL',), 'pk_hook_base_opt': ('PK_HOOK',), 'pk_hook_mask_opt': ('PK_HOOK',), 'pk_hook_full_opt': ('PK_HOOK',)}}
    RETURN_TYPES = ('UPSCALER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, scale_method, full_sample_schedule, use_tiled_vae, base_sampler, mask_sampler, mask, basic_pipe, full_sampler_opt=None, upscale_model_opt=None, pk_hook_base_opt=None, pk_hook_mask_opt=None, pk_hook_full_opt=None, tile_size=512):
        mask = make_2d_mask(mask)
        (_, _, vae, _, _) = basic_pipe
        upscaler = core.TwoSamplersForMaskUpscaler(scale_method, full_sample_schedule, use_tiled_vae, base_sampler, mask_sampler, mask, vae, full_sampler_opt, upscale_model_opt, pk_hook_base_opt, pk_hook_mask_opt, pk_hook_full_opt, tile_size=tile_size)
        return (upscaler,)
```