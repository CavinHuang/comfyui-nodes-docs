# Documentation
- Class name: PixelKSampleUpscalerProviderPipe
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PixelKSampleUpscalerProviderPipe 是一个用于提高图像分辨率的节点，它使用各种上采样方法。它提供了一个强大的框架来选择和应用不同的缩放技术，确保高质量的结果。这个节点在图像上采样过程中至关重要，提供了与系统其他组件的无缝集成。

# Input types
## Required
- scale_method
    - 缩放方法参数对于确定要使用的上采样技术至关重要。它决定了增强图像分辨率的算法方法，这显著影响最终输出的质量。
    - Comfy dtype: str
    - Python dtype: str
- seed
    - 种子参数在初始化随机数生成器中起着重要作用，确保了上采样过程的可重复性。这对于在节点的多次运行中保持一致性至关重要。
    - Comfy dtype: int
    - Python dtype: int
- steps
    - 步骤参数定义了在上采样过程中要执行的迭代次数。它直接影响操作的细节水平和计算复杂性。
    - Comfy dtype: int
    - Python dtype: int
- cfg
    - cfg 参数用于控制上采样模型的配置，允许微调缩放过程以实现期望的结果。
    - Comfy dtype: float
    - Python dtype: float
- sampler_name
    - sampler_name 参数指定了在上采样期间要采用的采样策略。它是采样过程效率和有效性的关键决定因素。
    - Comfy dtype: str
    - Python dtype: str
- scheduler
    - 调度器参数对于管理上采样步骤的节奏和顺序至关重要。它有助于优化上采样过程，以提高速度和质量。
    - Comfy dtype: str
    - Python dtype: str
- denoise
    - 去噪参数在上采样过程中启用了噪声减少的控制。这对于实现更清洁、更精细的图像输出至关重要。
    - Comfy dtype: float
    - Python dtype: float
- use_tiled_vae
    - use_tiled_vae 参数决定是否为变分自编码器（VAE）使用分块方法。这可以提高上采样过程的效率，特别是对于较大的图像。
    - Comfy dtype: bool
    - Python dtype: bool
- basic_pipe
    - basic_pipe 参数封装了上采样过程所需的基础组件。它对节点的操作不可或缺，为图像增强提供了必要的基础设施。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: BASIC_PIPE
## Optional
- tile_size
    - tile_size 参数指定了上采样过程中用于分块方法的瓦片尺寸。当处理大型图像以优化内存使用和处理时间时，它特别相关。
    - Comfy dtype: int
    - Python dtype: int

# Output types
- upscaler
    - upscaler 输出提供了最终的上采样模型，这是节点操作的核心结果。它代表了上采样过程的顶点，提供了一个经过提炼和增强的图像。
    - Comfy dtype: UPSCALER
    - Python dtype: PixelKSampleUpscaler

# Usage tips
- Infra type: GPU

# Source code
```
class PixelKSampleUpscalerProviderPipe(PixelKSampleUpscalerProvider):
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'scale_method': (s.upscale_methods,), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'use_tiled_vae': ('BOOLEAN', {'default': False, 'label_on': 'enabled', 'label_off': 'disabled'}), 'basic_pipe': ('BASIC_PIPE',), 'tile_size': ('INT', {'default': 512, 'min': 320, 'max': 4096, 'step': 64})}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',), 'pk_hook_opt': ('PK_HOOK',)}}
    RETURN_TYPES = ('UPSCALER',)
    FUNCTION = 'doit_pipe'
    CATEGORY = 'ImpactPack/Upscale'

    def doit_pipe(self, scale_method, seed, steps, cfg, sampler_name, scheduler, denoise, use_tiled_vae, basic_pipe, upscale_model_opt=None, pk_hook_opt=None, tile_size=512):
        (model, _, vae, positive, negative) = basic_pipe
        upscaler = core.PixelKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, use_tiled_vae, upscale_model_opt, pk_hook_opt, tile_size=tile_size)
        return (upscaler,)
```