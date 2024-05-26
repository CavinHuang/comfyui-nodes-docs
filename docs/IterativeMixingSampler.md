# Documentation
- Class name: IterativeMixingSamplerNode
- Category: sampling/custom_sampling/samplers
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

该节点通过迭代混合潜在变量来增强生成样本的多样性和质量。它通过逐步调整不同潜在变量在采样过程中的影响，实现了对生成输出的精细控制。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了采样器将使用的生成网络。它决定了节点将利用的基础架构和学习成果，以创建新的样本。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- sampler
    - 采样器参数对于确定采样策略至关重要。它影响潜在变量的混合和交互方式，进而影响生成样本的多样性和一致性。
    - Comfy dtype: COMBO
    - Python dtype: str
- alpha_1
    - Alpha_1 控制混合过程中主要潜在变量的初始影响。调整此参数可以显著改变生成内容的特点，使其成为实现预期结果的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blending_schedule
    - 混合进度定义了混合过程随时间的进展。它在确保不同潜在影响之间平滑过渡方面至关重要，有助于生成样本的自然演变。
    - Comfy dtype: COMBO
    - Python dtype: str
- blending_function
    - 该函数决定了在混合过程中潜在变量的组合方式。它在塑造生成样本的最终特征方面起着关键作用，因为它控制了它们的总体构成。
    - Comfy dtype: COMBO
    - Python dtype: str
- normalize_on_mean
    - 启用此参数后，确保潜在变量基于它们的均值进行归一化。这有助于实现更加平衡和可预测的混合过程，对于保持输出的一致性至关重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- start_blending_at_pct
    - 此参数规定了混合过程的起点，作为总采样步骤的百分比。它对于调整混合的引入时机很重要，这影响了样本的整体质量和多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- stop_blending_at_pct
    - 定义混合过程的停止点，此参数有助于控制混合的持续时间，从而影响生成样本的最终特征。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_blending_at_pct
    - 此参数将混合影响限制在指定的百分比内，确保混合不会压倒基础潜在变量，并在生成过程中保持平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blend_min
    - blend_min 参数设置了混合的最小值，确保混合潜在变量的贡献不是太微妙，并在塑造输出方面保持有效。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blend_max
    - 通过设置混合的上限，blend_max 确保混合潜在变量的影响不会超过某个阈值，在不损害基础模型的完整性的情况下保持多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- perlin_mode
    - perlin_mode 参数在混合过程中引入噪声模式，增加了随机性，这可以增强生成样本的创造性和可变性。
    - Comfy dtype: COMBO
    - Python dtype: str
- perlin_strength
    - Perlin 强度决定了噪声模式的强度，直接影响混合过程中变化的程度，从而影响输出的多样性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- perlin_scale
    - Perlin 噪声的规模影响了噪声模式的粒度，进而影响了生成样本的细部细节和纹理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rewind
    - 启用回放功能后，节点可以重新访问采样过程中的先前步骤，提供了对迭代混合的更多控制，并可能导致更精细的结果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- rewind_min
    - rewind_min 设置了回放过程的下限，确保节点不会在采样步骤中回退太远，这可能会破坏已取得的进展。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rewind_max
    - rewind_max 确定了回放过程的上限，防止过度回溯可能导致生成样本中期望特征的丢失。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sampler
    - 输出采样器是一个配置好的采样策略实例，它结合了各种参数以产生多样化和高质量的生成样本，反映了潜在变量的精细混合。
    - Comfy dtype: SAMPLER
    - Python dtype: comfy.samplers.KSampler

# Usage tips
- Infra type: GPU

# Source code
```
class IterativeMixingSamplerNode:
    """
    A sampler implementing iterative mixing of latents.
    Use this with the SamplerCustom node.
    """
    PERLIN_MODES = ['masks', 'latents', 'matched_noise']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'sampler': (list(SAMPLERS_MAP.keys()), {'default': 'euler'}), 'alpha_1': ('FLOAT', {'default': 2.4, 'min': 0.05, 'max': 100.0, 'step': 0.05}), 'blending_schedule': (list(BLENDING_SCHEDULE_MAP.keys()), {'default': 'cosine'}), 'blending_function': (list(BLENDING_FUNCTION_MAP.keys()), {'default': 'addition'}), 'normalize_on_mean': ('BOOLEAN', {'default': False}), 'start_blending_at_pct': ('FLOAT', {'default': 0.0, 'min': 0.0, 'step': 0.01}), 'stop_blending_at_pct': ('FLOAT', {'default': 1.0, 'min': 0.0, 'step': 0.01}), 'clamp_blending_at_pct': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'blend_min': ('FLOAT', {'default': 0.0, 'step': 0.01}), 'blend_max': ('FLOAT', {'default': 1.0, 'step': 0.01}), 'perlin_mode': (s.PERLIN_MODES, {'default': 'masks'}), 'perlin_strength': ('FLOAT', {'default': 0.75, 'step': 0.001}), 'perlin_scale': ('FLOAT', {'default': 10.0, 'min': 0.1, 'max': 400.0}), 'rewind': ('BOOLEAN', {'default': False}), 'rewind_min': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 0.99}), 'rewind_max': ('FLOAT', {'default': 0.8, 'min': 0.01, 'max': 0.99})}}
    RETURN_TYPES = ('SAMPLER',)
    CATEGORY = 'sampling/custom_sampling/samplers'
    FUNCTION = 'get_sampler'

    def set_steps(self, steps, denoise=None):
        self.steps = steps
        if denoise is None or denoise > 0.9999:
            self.sigmas = self.calculate_sigmas(steps).to(self.device)
        else:
            new_steps = int(steps / denoise)
            sigmas = self.calculate_sigmas(new_steps).to(self.device)
            self.sigmas = sigmas[-(steps + 1):]

    def get_sampler(self, model, sampler, alpha_1, blending_schedule, blending_function, normalize_on_mean, start_blending_at_pct, stop_blending_at_pct, clamp_blending_at_pct, blend_min, blend_max, perlin_mode, perlin_strength, perlin_scale, rewind, rewind_min, rewind_max):
        extras = {k: v for (k, v) in locals().items() if k != 'self'}
        extras['model_node'] = extras['model']
        del extras['model']
        if sampler not in SAMPLERS_MAP:
            raise ValueError(f'invalid sampler: {sampler}')
        sampler_obj = SAMPLERS_MAP[sampler]()
        sampler_fn = functools.partial(sampler_obj.__call__)
        del extras['sampler']
        sampler = comfy.samplers.KSAMPLER(sampler_fn, extra_options=extras)
        return (sampler,)
```