# Documentation
- Class name: TiledKSamplerProvider
- Category: ImpactPack/Sampler
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

TiledKSamplerProvider 节点旨在通过利用平铺策略来促进图像去噪的采样过程。它智能地管理图像的划分为平铺，允许进行高效和无缝的去噪。该节点通过减少平铺之间接缝的可见性来增强去噪过程，从而有助于获得更连贯和更高质量的输出图像。

# Input types
## Required
- seed
    - seed 参数在采样算法中的随机数生成过程中至关重要，确保了结果的可复现性。它影响随机数生成器的初始状态，进而影响去噪结果。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps 参数定义了去噪过程将进行的迭代次数。它是确定最终去噪图像质量的关键因素，更多的步骤通常会导致更好的去噪结果。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数调整采样过程的配置，允许对去噪算法的性能进行微调。它在平衡去噪结果的速度和质量方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name 参数指定了去噪过程中要使用的采样器类型。它对于确定采样策略和直接影响去噪的有效性至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- scheduler
    - scheduler 参数决定了去噪步骤的调度策略，这对于控制去噪进展的速度很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- denoise
    - denoise 参数控制应用于每个平铺的去噪强度。它是去噪图像最终外观的关键因素，更高的值会导致更激进的去噪。
    - Comfy dtype: FLOAT
    - Python dtype: float
- tile_width
    - tile_width 参数设置了平铺策略中每个平铺的宽度。它对于确定去噪过程的粒度很重要，并且可能影响最终图像中接缝的可见性。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - tile_height 参数设置了平铺策略中每个平铺的高度。它与 tile_width 一起工作，定义了平铺的整体结构，并影响去噪结果。
    - Comfy dtype: INT
    - Python dtype: int
- tiling_strategy
    - tiling_strategy 参数决定了如何将图像划分为平铺。它是减少接缝效果和去噪图像整体质量的关键因素。
    - Comfy dtype: STRING
    - Python dtype: str
- basic_pipe
    - basic_pipe 参数封装了去噪过程所需的基本组件，包括模型和额外的设置。它对于执行去噪算法是不可或缺的。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: comfy_extras.nodes_upscale_model.BasicPipe

# Output types
- KSAMPLER
    - TiledKSamplerProvider 节点的输出是一个 KSampler 对象，它代表了配置好的去噪采样器。它对于后续需要去噪能力的图像处理任务很重要。
    - Comfy dtype: KSAMPLER
    - Python dtype: KSamplerWrapper

# Usage tips
- Infra type: GPU

# Source code
```
class TiledKSamplerProvider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'tile_width': ('INT', {'default': 512, 'min': 320, 'max': MAX_RESOLUTION, 'step': 64}), 'tile_height': ('INT', {'default': 512, 'min': 320, 'max': MAX_RESOLUTION, 'step': 64}), 'tiling_strategy': (['random', 'padded', 'simple'],), 'basic_pipe': ('BASIC_PIPE',)}}
    RETURN_TYPES = ('KSAMPLER',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Sampler'

    def doit(self, seed, steps, cfg, sampler_name, scheduler, denoise, tile_width, tile_height, tiling_strategy, basic_pipe):
        (model, _, _, positive, negative) = basic_pipe
        sampler = core.TiledKSamplerWrapper(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise, tile_width, tile_height, tiling_strategy)
        return (sampler,)
```