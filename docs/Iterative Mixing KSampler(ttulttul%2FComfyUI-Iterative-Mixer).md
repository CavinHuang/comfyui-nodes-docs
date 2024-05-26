# Documentation
- Class name: IterativeMixingKSamplerSimple
- Category: test
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

该节点简化了迭代混合和采样过程，使得在单一框架内高效地添加和移除噪声成为可能。它旨在为那些希望尝试迭代采样技术但不想面对多个节点复杂性用户提供简化的工作流程。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了采样过程的基础。它影响生成样本的质量和特性，是节点功能的核心组成部分。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- positive
    - 正向调节输入对于引导采样过程朝向期望结果是必不可少的。它影响生成样本的方向和性质，使其符合指定条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- negative
    - 负向调节输入通过避免不良结果来帮助完善采样过程。它在引导生成远离不需要的特性方面发挥着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- latent_image
    - 潜在图像参数对于迭代混合过程至关重要，因为它代表了添加和移除噪声的起点。它显著影响样本的初始状态和演变。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- seed
    - 种子参数对于确保采样过程的可重复性和一致性很重要。它初始化随机数生成，进而影响输出样本的变异性和多样性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数决定了采样过程中的迭代次数，直接影响生成样本的复杂性和精细度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数（或cfg）对于调整采样过程的内部设置至关重要。它影响节点的整体行为和性能，使其能够进行微调以获得最佳结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称参数对于选择适当的采样方法至关重要。它决定了用于生成样本的策略，这可以显著改变最终输出。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SAMPLERS]
    - Python dtype: str
- scheduler
    - 调度器参数对于管理采样过程的进展至关重要。它控制迭代的步伐和时机，影响结果的效率和质量。
    - Comfy dtype: COMBO[comfy.samplers.KSampler.SCHEDULERS]
    - Python dtype: str
- denoise
    - 去噪参数在生成样本的精炼中扮演重要角色。它调整噪声减少的水平，可以提高最终输出的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- alpha_1
    - alpha_1参数在控制采样过程中的混合进度中至关重要。它影响样本的混合和融合方式，影响输出的最终外观和特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blending_schedule
    - 混合进度参数是定义样本之间过渡的关键。它决定了混合策略，这可以显著影响生成序列的平滑性和连贯性。
    - Comfy dtype: COMBO[list(BLENDING_SCHEDULE_MAP.keys())]
    - Python dtype: str
- blending_function
    - 混合函数参数对于确定迭代过程中样本如何结合至关重要。它通过控制样本合并的方式影响最终结果。
    - Comfy dtype: COMBO[list(BLENDING_FUNCTION_MAP.keys())]
    - Python dtype: str
- normalize_on_mean
    - 均值归一化参数对于调整数据预处理步骤很重要。它影响输入数据的归一化，可以影响采样过程和生成样本的特性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- samples
    - 输出样本代表了迭代混合和采样过程的最终结果。它们包含了输入参数和节点功能的精髓，展示了节点生成复杂和细腻数据模式的能力。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IterativeMixingKSamplerSimple:
    """
    A simplified version of IterativeMixingKSamplerAdv, this node
    does the noising (unsampling) and de-noising (sampling) all within
    one node with easy settings.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 40, 'min': 0, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'alpha_1': ('FLOAT', {'default': 2.4, 'min': 0.05, 'max': 100.0, 'step': 0.05}), 'blending_schedule': (list(BLENDING_SCHEDULE_MAP.keys()), {'default': 'cosine'}), 'blending_function': (list(BLENDING_FUNCTION_MAP.keys()), {'default': 'addition'}), 'normalize_on_mean': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'test'

    def __init__(self):
        self.batch_unsampler = BatchUnsampler()

    def sample(self, model, positive, negative, latent_image, seed, steps, cfg, sampler_name, scheduler, denoise, alpha_1, blending_schedule, blending_function, normalize_on_mean):
        (z_primes,) = self.batch_unsampler.unsampler(model, sampler_name, scheduler, steps, 0, steps, latent_image, normalize=normalize_on_mean)
        sampler = IterativeMixingKSampler()
        (z_out, _, _, _) = sampler(model, seed, cfg, sampler_name, scheduler, positive, negative, z_primes, denoise=denoise, alpha_1=alpha_1, reverse_input_batch=True, blending_schedule=blending_schedule, blending_function=blending_function, stop_blending_at_pct=1.0)
        return ({'samples': z_out['samples'][-1:]},)
```