# Documentation
- Class name: IterativeMixingKSamplerAdv
- Category: test
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

该节点通过逐步引入一组预定义的潜在向量来改进一批噪声潜在表示，旨在提高生成样本的质量和一致性。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于去噪和精炼潜在表示的生成网络。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- seed
    - 种子对于去噪和采样步骤中涉及的随机过程至关重要，确保输出的可重复性和多样性。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数很重要，因为它调整采样过程的行为，影响生成样本的质量和特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 采样器名称决定了使用的采样方法，这对迭代混合过程和最终输出至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数是去噪过程中的关键，控制迭代中噪声减少的速率。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - 正向调节为生成过程提供了重要的上下文，引导生成朝着期望的结果发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - 负向调节对于限制采样空间至关重要，防止不希望的伪影，并确保结果的一致性。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image_batch
    - 潜在图像批次是迭代混合过程的起点，每个元素都会影响精炼的轨迹。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- denoise
    - 去噪参数对于控制每一步的降噪程度至关重要，平衡精炼和防止伪影。
    - Comfy dtype: FLOAT
    - Python dtype: float
- alpha_1
    - Alpha-1影响混合计划，决定了指导潜在向量如何混合到去噪过程中以获得最佳结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- reverse_input_batch
    - 反转输入批次参数改变了潜在向量的顺序，影响了迭代混合的进展和一致性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- blending_schedule
    - 混合计划在确定指导潜在向量合并的速率方面起着重要作用，影响最终样本的质量。
    - Comfy dtype: COMBO
    - Python dtype: str
- stop_blending_at_pct
    - 该参数决定了混合停止的百分比，平衡了指导潜在向量的影响，并确保了期望的细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clamp_blending_at_pct
    - 夹紧混合百分比参数限制了混合的影响，防止过度混合并保持生成样本的完整性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blending_function
    - 混合函数定义了用于组合指导潜在向量和去噪样本的数学运算，影响输出的最终外观。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- mixed_latents
    - 混合潜在向量代表了迭代精炼的潜在表示，这是该节点输出的核心。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- noised_latents
    - 噪声潜在向量捕捉批次的初始噪声状态，为去噪过程提供参考。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- intermediate_latents
    - 这些中间潜在向量记录了迭代混合过程的进展，提供了精炼轨迹的见解。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- plot_image
    - 绘图图像可视化混合计划，提供了迭代混合过程的图形表示。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image

# Usage tips
- Infra type: GPU

# Source code
```
class IterativeMixingKSamplerAdv:
    """
    Take a batch of latents, z_prime, and progressively de-noise them
    step by step from z_prime[0] to z_prime[steps], mixing in a weighted
    fraction of z_prime[i] at each step so that de-noising is guided by
    the z_prime latents. This batch sampler assumes that the number of steps
    is just the length of z_prime, so there is no steps parameter. The parameter
    latent_image_batch should come from the Batch Unsampler node. The parameter
    alpha_1 controls an exponential cosine function that schedules how much
    of the noised latents to mix with the de-noised latents at each step.
    Small values cause more of the noised latents to be mixed in at each step,
    which provides more guidance to the diffusion, but which may result in more
    artifacts. Large values (i.e. >1.0) can cause output to be grainy. Your
    mileage may vary.
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image_batch': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'alpha_1': ('FLOAT', {'default': 2.4, 'min': 0.05, 'max': 100.0, 'step': 0.05}), 'reverse_input_batch': ('BOOLEAN', {'default': True}), 'blending_schedule': (list(BLENDING_SCHEDULE_MAP.keys()), {'default': 'cosine'}), 'stop_blending_at_pct': ('FLOAT', {'default': 1.0}), 'clamp_blending_at_pct': ('FLOAT', {'default': 1.0}), 'blending_function': (list(BLENDING_FUNCTION_MAP.keys()), {'default': 'addition'})}}
    RETURN_TYPES = ('LATENT', 'LATENT', 'LATENT', 'IMAGE')
    RETURN_NAMES = ('mixed_latents', 'noised_latents', 'intermediate_latents', 'plot_image')
    FUNCTION = 'sample'
    CATEGORY = 'test'

    def sample(self, model, seed, cfg, sampler_name, scheduler, positive, negative, latent_image_batch, denoise=1.0, alpha_1=0.1, reverse_input_batch=True, blending_schedule='cosine', stop_blending_at_pct=1.0, clamp_blending_at_pct=1.0, blending_function=list(BLENDING_FUNCTION_MAP.keys())[0]):
        sampler = IterativeMixingKSampler()
        return sampler(model, seed, cfg, sampler_name, scheduler, positive, negative, latent_image_batch, denoise=denoise, alpha_1=alpha_1, reverse_input_batch=True, blending_schedule=blending_schedule, stop_blending_at_pct=stop_blending_at_pct, clamp_blending_at_pct=clamp_blending_at_pct, blending_function=blending_function)
```