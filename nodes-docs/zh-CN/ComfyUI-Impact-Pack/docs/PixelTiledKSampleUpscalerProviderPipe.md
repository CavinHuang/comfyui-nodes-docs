# Documentation
- Class name: PixelTiledKSampleUpscalerProviderPipe
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PixelTiledKSampleUpscalerProviderPipe 是一个用于提供基于平铺采样方法的放大器的节点。它利用 ComfyUI_TiledKSampler 扩展，通过将较大的图像分割成较小的平铺，对图像进行去噪，提高了图像质量而不引入可见的接缝。这个节点特别适用于需要最小化人工制品进行高分辨率图像处理的任务。

# Input types
## Required
- scale_method
    - 缩放方法决定了图像如何放大。这是一个关键参数，因为它影响放大图像的质量和风格。
    - Comfy dtype: COMBO['nearest-exact', 'bilinear', 'lanczos', 'area']
    - Python dtype: str
- seed
    - 种子用于随机数生成过程，确保去噪结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数决定了去噪过程的彻底性，通常更多的步数会导致更好的图像质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置值 'cfg' 是影响去噪过程的参数，它在降低噪声和保留细节之间进行平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称定义了去噪过程中使用的采样策略，这可以显著影响最终图像的外观。
    - Comfy dtype: comfy.samplers.KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - 调度器决定了噪过程中参数更新的速率，影响效率和结果。
    - Comfy dtype: comfy.samplers.KSampler.SCHEDULERS
    - Python dtype: str
- denoise
    - 去噪参数控制去噪效果的强度，较高的值会导致图像更清晰，但可能会丢失细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_width
    - 平铺宽度指定了平铺采样过程中每个平铺的宽度，这对于管理内存使用和处理时间很重要。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - 平铺高度指定了每个平铺的高度，与平铺宽度一起工作，控制平铺网格的尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- tiling_strategy
    - 平铺策略决定了如何将图像划分为平铺，不同的策略针对不同的结果进行优化，例如减少接缝或与某些采样器的兼容性。
    - Comfy dtype: COMBO['random', 'padded', 'simple']
    - Python dtype: str
- basic_pipe
    - 基础管道提供了放大器运行所需的基础组件，如模型和 VAE。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Any
## Optional
- upscale_model_opt
    - 一个可选参数，允许在过程中指定一个自定义的放大模型。
    - Comfy dtype: UPSCALE_MODEL
    - Python dtype: Optional[Any]
- pk_hook_opt
    - 一个可选的钩子，可以在放大过程中用来修改放大器的行为。
    - Comfy dtype: PK_HOOK
    - Python dtype: Optional[Any]

# Output types
- upscaler
    - 节点的输出是一个放大器对象，它能够对图像执行放大操作。
    - Comfy dtype: UPSCALER
    - Python dtype: core.PixelTiledKSampleUpscaler

# Usage tips
- Infra type: GPU

# Source code
```
class PixelTiledKSampleUpscalerProviderPipe:
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'scale_method': (s.upscale_methods,), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'tile_width': ('INT', {'default': 512, 'min': 320, 'max': MAX_RESOLUTION, 'step': 64}), 'tile_height': ('INT', {'default': 512, 'min': 320, 'max': MAX_RESOLUTION, 'step': 64}), 'tiling_strategy': (['random', 'padded', 'simple'],), 'basic_pipe': ('BASIC_PIPE',)}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',), 'pk_hook_opt': ('PK_HOOK',)}}
    RETURN_TYPES = ('UPSCALER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, scale_method, seed, steps, cfg, sampler_name, scheduler, denoise, tile_width, tile_height, tiling_strategy, basic_pipe, upscale_model_opt=None, pk_hook_opt=None):
        if 'BNK_TiledKSampler' in nodes.NODE_CLASS_MAPPINGS:
            (model, _, vae, positive, negative) = basic_pipe
            upscaler = core.PixelTiledKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy, upscale_model_opt, pk_hook_opt, tile_size=max(tile_width, tile_height))
            return (upscaler,)
        else:
            print("[ERROR] PixelTiledKSampleUpscalerProviderPipe: ComfyUI_TiledKSampler custom node isn't installed. You must install BlenderNeko/ComfyUI_TiledKSampler extension to use this node.")
```