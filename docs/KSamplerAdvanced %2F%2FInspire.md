# Documentation
- Class name: KSamplerAdvanced_inspire
- Category: InspirePack/a1111_compat
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

KSamplerAdvanced_inspire 类旨在模型内促进高级采样操作，集成噪声和调度机制以增强生成过程。它旨在为用户提供一个灵活高效的工具，用于探索模型的潜在空间，从而能够创造出多样化且高质量的输出。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了节点将操作的基础生成模型。它是所有采样活动的基础，直接影响生成输出的质量和类型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- add_noise
    - add_noise 参数控制是否在采样过程中入随机元素，这可以导致结果更加多样化和富有创造性。它是探索模型能力并实现多样化输出的一个重要方面。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - noise_seed 参数在确定采样过程中应用的噪声模式的随机性和多样性方面起着重要作用。它确保噪声是可复现和一致的，这对于实验控制和比较至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps 参数决定了采样过程的进展，影响了在模型潜在空间内探索的粒度和深度。它是实现全面和细致的结果集的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg 参数是一个配置值，用于调整采样过程的行为，允许对输出特征进行微调。它是根据特定要求和期望的结果调整节点功能的重要工具。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name 参数指定了要采用的采样策略，这对节点有效导航模型潜在空间的能力至关重要。它塑造了采样过程的整体方法和方向。
    - Comfy dtype: ENUM
    - Python dtype: str
- scheduler
    - scheduler 参数定义了采样过程的调度方法，这对于管理节点操作的动态方面至关重要。它确保节点能够适应并响应模型潜在空间内的变化条件。
    - Comfy dtype: ENUM
    - Python dtype: str
- positive
    - positive 参数作为采样过程的指导，提供了节点应遵循的正面示例或条件。它对于引导输出朝着期望的特性发展并确保结果与预期方向一致至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- negative
    - negative 参数为采样过程建立了约束或不期望的条件，这对于引导节点远离不良结果至关重要。它在塑造最终结果和保持输出质量方面发挥着重要作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: dict
- latent_image
    - latent_image 参数是节点采样操作的主要输入，代表模型潜在空间中的初始状态或条件。它是节点生成输出的基础，并直接影响结果的性质。
    - Comfy dtype: LATENT
    - Python dtype: dict
- start_at_step
    - start_at_step 参数定义了采样过程的起点，指示节点应从哪一步开始其操作。它是控制采样活动的时间和顺序的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step 参数设置了采样过程的终点，决定了节点应继续其操作的步数上限。它对于定义采样活动的范围和持续时间至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mode
    - noise_mode 参数决定了生成噪声所使用的计算资源，选项包括 GPU 和 CPU。这是一个关键决策，影响采样过程的性能和效率。
    - Comfy dtype: ENUM
    - Python dtype: str
- return_with_leftover_noise
    - return_with_leftover_noise 参数决定节点是否应该在主要输出之外返回额外的噪声信息。这对于进一步的分析或后续处理步骤可能有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- batch_seed_mode
    - batch_seed_mode 参数管理批处理中的种子分配，这对于保持一致性并在并行处理场景中控制噪声生成非常重要。它确保每个批次都有唯一的噪声种子，促进多样性并防止输出中的重叠。
    - Comfy dtype: ENUM
    - Python dtype: str
- variation_seed
    - variation_seed 参数在噪声生成过程中引入变异性，允许探索更广泛的结果范围。它对于在采样过程中创造独特且多样的结果至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - variation_strength 参数调整噪声引入的变化的强度，这可以影响最终输出中变化的程度。它是控制结果多样性和创造性的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- noise_opt
    - noise_opt 参数提供了一个选项，用于自定义采样过程中应用的噪声，为用户提供了尝试不同噪声配置及其对输出影响的能力。
    - Comfy dtype: NOISE
    - Python dtype: torch.Tensor

# Output types
- latent
    - latent 参数包含了采样过程的结果样本，代表了节点操作的最终成果。它非常重要，因为它包含了进一步分析或生成最终图像所需的重要信息。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerAdvanced_inspire:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'add_noise': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.5, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'return_with_leftover_noise': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'}), 'batch_seed_mode': (['incremental', 'comfy', 'variation str inc:0.01', 'variation str inc:0.05'],), 'variation_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'variation_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'noise_opt': ('NOISE',)}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'sample'
    CATEGORY = 'InspirePack/a1111_compat'

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, denoise=1.0, batch_seed_mode='comfy', variation_seed=None, variation_strength=None, noise_opt=None):
        force_full_denoise = True
        if return_with_leftover_noise:
            force_full_denoise = False
        disable_noise = False
        if not add_noise:
            disable_noise = True
        return common_ksampler(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise, noise_mode=noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength, noise=noise_opt)
```