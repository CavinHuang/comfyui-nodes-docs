# Documentation
- Class name: TiledKSamplerAdvanced
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_TiledKSampler.git

TiledKSamplerAdvanced类通过将采样空间划分为独立的瓦片并单独处理它们，从而实现高级采样程序。这种方法提高了采样过程的效率和控制能力，允许对生成的样本进行精细的操作。它整合了噪声管理、瓦片策略和条件输入，以实现高质量和细致的输出。

# Input types
## Required
- model
    - 模型参数对于采样过程至关重要，它定义了采样过程的基础架构和参数。它决定了可以处理的数据类型和输出的质量。
    - Comfy dtype: MODEL
    - Python dtype: comfy.sd.Model
- add_noise
    - 此参数控制是否在采样过程中引入噪声，从而影响生成样本的多样性和随机性。这对于实现多样化的结果至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- noise_seed
    - 噪声种子参数在确保噪声生成过程的可重复性方面起着重要作用。当使用相同的种子时，它允许产生一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
- tile_width
    - 瓦片宽度参数决定了每个瓦片的水平维度，影响了采样过程的粒度。它在实现对生成样本空间分布的详细控制方面非常关键。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - 瓦片高度参数设置了每个瓦片的垂直维度，影响了采样过程的粒度和长宽比。它对于微调输出的空间排列非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- tiling_strategy
    - 瓦片策略参数决定了用于划分采样空间的方法，这可以显著影响采样过程的效率和一致性。
    - Comfy dtype: COMBO
    - Python dtype: str
- steps
    - 步骤参数定义了采样过程将要经历的迭代次数。它直接影响最终输出的复杂性和精细度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样器的配置设置，影响采样过程的行为和性能。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称参数指定了要使用的采样器类型，这决定了样本生成的基本方法，并影响整体结果。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数决定了采样器的调度策略，影响了采样过程的进展和节奏。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - 正面参数提供了正面的条件输入，引导采样过程朝着期望的结果发展，塑造生成样本的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Any]]
- negative
    - 负面参数提供负面的条件输入，通过避免不希望的结果来帮助完善采样过程。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Any]]
- latent_image
    - 潜在图像参数包含图像的潜在表示，这是采样过程的核心输入。它直接影响生成样本的质量和特性。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- start_at_step
    - 开始步骤参数指定了采样过程的初始步骤，设置了样本生成的起点。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 结束步骤参数定义了采样过程的最终步骤，决定了样本生成的终点。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - 返回剩余噪声参数控制是否在最终输出中包含残余噪声，这可以影响生成样本的纹理和外观。
    - Comfy dtype: COMBO
    - Python dtype: str
- preview
    - 预览参数启用或禁用采样过程中的预览图像生成，提供关于进度的视觉反馈。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- preview
    - 预览参数启用或禁用采样过程中的预览图像生成，提供关于进度的视觉反馈。
    - Comfy dtype: COMBO
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class TiledKSamplerAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'add_noise': (['enable', 'disable'],), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'tile_width': ('INT', {'default': 512, 'min': 256, 'max': MAX_RESOLUTION, 'step': 64}), 'tile_height': ('INT', {'default': 512, 'min': 256, 'max': MAX_RESOLUTION, 'step': 64}), 'tiling_strategy': (['random', 'random strict', 'padded', 'simple'],), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'return_with_leftover_noise': (['disable', 'enable'],), 'preview': (['disable', 'enable'],)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, model, add_noise, noise_seed, tile_width, tile_height, tiling_strategy, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, preview, denoise=1.0):
        return sample_common(model, add_noise, noise_seed, tile_width, tile_height, tiling_strategy, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise=1.0, preview=preview == 'enable')
```