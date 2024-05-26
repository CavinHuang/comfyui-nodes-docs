# Documentation
- Class name: TiledKSampler
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_TiledKSampler.git

TiledKSampler节点旨在通过将任务划分为更小、更易管理的部分（称为瓦片）来促进高分辨率图像的生成。它通过应用用户定义的瓦片策略，并在多个步骤中迭代地完善图像，从而允许对采样过程进行复杂的控制，并能够整合各种条件输入来指导生成过程。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于生成图像样本的基础生成模型。它是决定输出类型和质量的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: comfy.sd.Model
- seed
    - 种子用于初始化随机数生成器，确保图像采样过程在不同运行之间可复现和一致。
    - Comfy dtype: INT
    - Python dtype: int
- tile_width
    - 瓦片宽度决定了每个瓦片的水平维度，影响采样过程的粒度和最终图像的细节水平。
    - Comfy dtype: INT
    - Python dtype: int
- tile_height
    - 瓦片高度决定了每个瓦片的垂直维度，直接影响生成图像的整体结构和构图。
    - Comfy dtype: INT
    - Python dtype: int
- tiling_strategy
    - 瓦片策略参数定义了将图像划分为瓦片的方法，这可以显著改变采样过程的效率和质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- steps
    - 步骤数量参数决定了迭代细化过程，更高的值导致更详细和细腻的图像生成。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数通常与模型特定设置相关，对图像采样的整体性能和输出质量起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称参数指定了要使用的采样器类型，这可以极大地影响生成图像的风格和特征。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数定义了随时间调整采样过程的策略，影响图像生成的收敛性和稳定性。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - 正面条件输入用于引导图像生成朝向期望的特征或特性，对塑造最终输出起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Any]]
- negative
    - 负面条件输入用于排除图像生成中的某些特征或特性，允许获得更受控和特定的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Dict[str, Any]]
- latent_image
    - 潜在图像参数包含图像的初始潜在表示，通过采样过程迭代细化以生成最终图像。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- denoise
    - 去噪参数控制采样过程中应用的噪声减少水平，影响生成图像的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent_image
    - 输出潜在图像包含采样过程后细化的潜在表示，封装了最终生成的图像及其相关的元数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: GPU

# Source code
```
class TiledKSampler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'tile_width': ('INT', {'default': 512, 'min': 256, 'max': MAX_RESOLUTION, 'step': 64}), 'tile_height': ('INT', {'default': 512, 'min': 256, 'max': MAX_RESOLUTION, 'step': 64}), 'tiling_strategy': (['random', 'random strict', 'padded', 'simple'],), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, model, seed, tile_width, tile_height, tiling_strategy, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise):
        steps_total = int(steps / denoise)
        return sample_common(model, 'enable', seed, tile_width, tile_height, tiling_strategy, steps_total, cfg, sampler_name, scheduler, positive, negative, latent_image, steps_total - steps, steps_total, 'disable', denoise=1.0, preview=True)
```