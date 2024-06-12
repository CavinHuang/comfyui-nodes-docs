# Documentation
- Class name: PixelTiledKSampleUpscalerProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

PixelTiledKSampleUpscalerProvider 是一个旨在通过复杂的放大过程提高图像质量的节点。它利用各种缩放方法，并与高级模型集成，以对图像平铺进行去噪，优化最终输出的清晰度和细节。

# Input types
## Required
- scale_method
    - 缩放方法定义了用于放大图像的算法。它对于确定放大过程的质量和样式至关重要，影响图像的最终外观。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- model
    - 模型参数至关重要，因为它指定了将用于放大任务的机器学习模型。模型的选择对节点的性能和生成的图像质量有显著影响。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- vae
    - VAE（变分自编码器）是放大过程中的关键组件，因为它对图像数据进行编码和解码。它在去噪输出的质量中起着关键作用。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- seed
    - 种子通过为随机数生成提供一致的起点，确保了放大过程的可重复性，这对于在不同运行中保持结果的完整性至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数决定了放大过程的范围。更多的步骤允许得到更精细的结果，但也增加了计算复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数，通常表示为 'cfg'，用于控制放大过程中细节和噪声之间的平衡，影响放大图像的整体清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称决定了去噪步骤中使用的采样策略。它是形成最终图像噪声特性的关键因素。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- scheduler
    - 调度器定义了放大过程中参数更新的速度，这可能会影响放大图像的效率和最终质量。
    - Comfy dtype: COMBO[str]
    - Python dtype: str
- positive
    - 正向条件为模型提供了在放大期间增强或保留哪些特征的指导，这对于实现期望的结果至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 负向条件指导模型在放大期间避免某些特征或伪影，确保最终图像符合指定的质量标准。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- denoise
    - 去噪参数控制应用于每个平铺的去噪强度。它是平衡图像细节与去除不需要的噪声的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_width
    - 平铺宽度指定了放大过程中使用的每个平铺的水平尺寸。它影响平铺策略，并可能影响最终图像的分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - 平铺高度指定了放大过程中使用的每个平铺的垂直尺寸。它与平铺宽度一起工作，以确定平铺模式。
    - Comfy dtype: INT
    - Python dtype: int
- tiling_strategy
    - 平铺策略决定了如何将图像划分为平铺进行处理。它对于管理接缝并确保整个图像的一致放大结果至关重要。
    - Comfy dtype: COMBO[str]
    - Python dtype: str

# Output types
- upscaler
    - 放大器输出提供了放大过程后的处理图像。它代表了节点功能的顶点，提供了具有改进分辨率和减少噪声的增强图像。
    - Comfy dtype: UPSCALER
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class PixelTiledKSampleUpscalerProvider:
    upscale_methods = ['nearest-exact', 'bilinear', 'lanczos', 'area']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'scale_method': (s.upscale_methods,), 'model': ('MODEL',), 'vae': ('VAE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'tile_width': ('INT', {'default': 512, 'min': 320, 'max': MAX_RESOLUTION, 'step': 64}), 'tile_height': ('INT', {'default': 512, 'min': 320, 'max': MAX_RESOLUTION, 'step': 64}), 'tiling_strategy': (['random', 'padded', 'simple'],)}, 'optional': {'upscale_model_opt': ('UPSCALE_MODEL',), 'pk_hook_opt': ('PK_HOOK',)}}
    RETURN_TYPES = ('UPSCALER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy, upscale_model_opt=None, pk_hook_opt=None):
        if 'BNK_TiledKSampler' in nodes.NODE_CLASS_MAPPINGS:
            upscaler = core.PixelTiledKSampleUpscaler(scale_method, model, vae, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy, upscale_model_opt, pk_hook_opt, tile_size=max(tile_width, tile_height))
            return (upscaler,)
        else:
            print("[ERROR] PixelTiledKSampleUpscalerProvider: ComfyUI_TiledKSampler custom node isn't installed. You must install BlenderNeko/ComfyUI_TiledKSampler extension to use this node.")
```