# Documentation
- Class name: TwoSamplersForMaskUpscalerProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

TwoSamplersForMaskUpscalerProvider节点旨在使用两种不同的采样方法来促进图像的放大。它允许选择上采样方法和调度采样过程。该节点在通过复杂的采样技术和上采样算法组合来增强图像质量方面起着关键作用。

# Input types
## Required
- scale_method
    - scale_method参数决定了用于图像上采样的算法。它对上采样过程的整体性能和质量至关重要，因为它直接影响输出的分辨率和清晰度。
    - Comfy dtype: str
    - Python dtype: str
- full_sample_schedule
    - full_sample_schedule参数在上采样过程中决定何时执行完整采样。它对于控制采样的时机和频率具有重要意义，这反过来又影响最终输出的细节和纹理。
    - Comfy dtype: str
    - Python dtype: str
- use_tiled_vae
    - use_tiled_vae参数指示是否对变分自编码器（VAE）采用分块方法。这可以提高上采样过程的效率，特别是对于较大的图像。
    - Comfy dtype: bool
    - Python dtype: bool
- base_sampler
    - base_sampler参数指定用于生成初始样本集的主要采样方法。它在上采样过程中起着基础性作用，影响输出的初始质量和特性。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSampler
- mask_sampler
    - mask_sampler参数定义了应用于掩码的采样方法。它对于确定掩码如何影响最终上采样结果至关重要，特别是在应用掩码的区域。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSampler
- mask
    - mask参数提供了用于指导上采样过程的掩码。它对于定义图像中在上采样期间需要特别关注或处理的区域很重要。
    - Comfy dtype: MASK
    - Python dtype: np.ndarray
- vae
    - vae参数表示上采样过程中使用的变分自编码器模型。它是生成输入图像的高质量潜在表示的关键组件。
    - Comfy dtype: VAE
    - Python dtype: VAE
## Optional
- tile_size
    - tile_size参数设置了在使用分块方法时用于处理图像的分块大小。它对于优化内存使用和处理时间具有重要意义，尤其是对于高分辨率图像。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- upscaler
    - upscaler输出提供了最终的上样图像或潜在表示。它是上采样过程的最终成果，代表了通过节点的复杂采样和上采样方法实现的增强图像质量和分辨率。
    - Comfy dtype: UPSCALER
    - Python dtype: TwoSamplersForMaskUpscaler

# Usage tips
- Infra type: CPU

# Source code
```
class TwoSamplersForMaskUpscalerProvider:
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'scale_method': (s.upscale_methods,), 'full_sample_schedule': (['none', 'interleave1', 'interleave2', 'interleave3', 'last1', 'last2', 'interleave1+last1', 'interleave2+last1', 'interleave3+last1'],), 'use_tiled_vae': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'base_sampler': ('KSAMPLER',), 'mask_sampler': ('KSAMPLER',), 'mask': ('MASK',), 'vae': ('VAE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}, 'optional': {'full_sampler_opt': ('KSAMPLER',), 'upscale_model_opt': ('UPSCALE_MODEL',), 'pk_hook_base_opt': ('PK_HOOK',), 'pk_hook_mask_opt': ('PK_HOOK',), 'pk_hook_full_opt': ('PK_HOOK',)}}
    RETURN_TYPES = ('UPSCALER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, scale_method, full_sample_schedule, use_tiled_vae, base_sampler, mask_sampler, mask, vae, full_sampler_opt=None, upscale_model_opt=None, pk_hook_base_opt=None, pk_hook_mask_opt=None, pk_hook_full_opt=None, tile_size=512):
        upscaler = core.TwoSamplersForMaskUpscaler(scale_method, full_sample_schedule, use_tiled_vae, base_sampler, mask_sampler, mask, vae, full_sampler_opt, upscale_model_opt, pk_hook_base_opt, pk_hook_mask_opt, pk_hook_full_opt, tile_size=tile_size)
        return (upscaler,)
```