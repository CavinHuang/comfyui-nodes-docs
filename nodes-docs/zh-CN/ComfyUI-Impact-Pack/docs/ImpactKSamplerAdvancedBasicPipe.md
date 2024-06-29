# Documentation
- Class name: KSamplerAdvancedBasicPipe
- Category: sampling
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

KSamplerAdvancedBasicPipe节点旨在框架内促进高级采样技术。它利用KSamplerAdvanced的能力执行复杂的采样操作，确保对采样过程有高度的控制和定制化。该节点在生成多样化和高质量的潜在表示方面至关重要，这些表示可以进一步细化或用于下游任务。

# Input types
## Required
- basic_pipe
    - basic_pipe参数对于节点的操作至关重要，因为它包含了采样所需的核心组件，包括模型、clip和VAE。它是构建采样过程的基础，对于节点的正确功能至关重要。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, torch.nn.Module, Any, Any]
- latent_image
    - latent_image参数是一个关键输入，它为采样过程提供了初始潜在状态。它显著影响生成样本的起点和轨迹。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- add_noise
    - add_noise参数决定在采样过程中是否引入噪声。这会影响生成样本的多样性和质量，是实现期望结果的关键因素。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - noise_seed参数用于初始化噪声添加的随机数生成器，确保采样过程的可重复性。它在控制节点操作的随机元素中起着至关重要的作用。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数指定在采样过程中执行的迭代次数。它直接影响生成样本的收敛和细节，是节点执行的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样过程的配置设置，允许微调节点的行为。对于实现最佳性能和结果至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数从预定义的采样器集合中选择要使用的特定采样方法。它是塑造生成样本特征的关键决定因素。
    - Comfy dtype: KSampler.SAMPLERS
    - Python dtype: str
- scheduler
    - scheduler参数定义了采样过程中要使用的调度算法。它对于管理采样迭代的进度和节奏至关重要。
    - Comfy dtype: KSampler.SCHEDULERS
    - Python dtype: str
- start_at_step
    - start_at_step参数设置采样过程开始的初始步骤。它允许定制采样轨迹，对于实现特定结果很重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数确定采样过程结束的最终步骤。它在确定采样迭代的范围和持续时间方面起着重要作用。
    - Comfy dtype: INT
    - Python dtype: int
- return_with_leftover_noise
    - return_with_leftover_noise参数决定节点是否应在最后一步后返回带有任何剩余噪声的样本。这对于后处理或进一步分析是一个重要考虑因素。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- basic_pipe
    - basic_pipe输出提供用于采样的原始组件，可以用于进一步处理或分析。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, Any, torch.nn.Module, Any, Any]
- latent
    - latent输出代表模型的采样潜在状态，是采样过程的关键结果，可以作为后续任务或模型的输入。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - vae输出包括采样过程中使用的变分自编码器，可能对进一步研究或应用有兴趣。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerAdvancedBasicPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'add_noise': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'return_with_leftover_noise': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'})}}
    RETURN_TYPES = ('BASIC_PIPE', 'LATENT', 'VAE')
    FUNCTION = 'sample'
    CATEGORY = 'sampling'

    def sample(self, basic_pipe, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise=1.0):
        (model, clip, vae, positive, negative) = basic_pipe
        if add_noise:
            add_noise = 'enable'
        else:
            add_noise = 'disable'
        if return_with_leftover_noise:
            return_with_leftover_noise = 'enable'
        else:
            return_with_leftover_noise = 'disable'
        latent = nodes.KSamplerAdvanced().sample(model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise)[0]
        return (basic_pipe, latent, vae)
```