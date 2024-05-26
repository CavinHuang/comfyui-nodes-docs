# Documentation
- Class name: KSamplerAdvanced_inspire_pipe
- Category: InspirePack/a1111_compat
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点促进InspirePack流水线中的高级采样过程，整合噪声管理和调度机制，以完善生成潜在表示的过程。

# Input types
## Required
- basic_pipe
    - basic_pipe参数是必需的，因为它提供了采样过程所需的基础组件，包括模型、clip以及其他必要元素。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, ...]
- add_noise
    - 此参数控制是否在采样过程中引入噪声，影响生成的潜在图像的多样性和质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - noise_seed参数对于噪声模式的可复现性至关重要，确保可以重新生成相同的噪声以获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数定义了采样过程的进展，较高的值导致更精细和详细的潜在图像。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整采样器的配置设置，影响采样过程的整体行为和输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数选择要使用的特定采样算法，直接影响采样过程的效率和效果。
    - Comfy dtype: ENUM
    - Python dtype: str
- scheduler
    - scheduler参数规定了采样过程的调度策略，优化了速度和质量之间的权衡。
    - Comfy dtype: ENUM
    - Python dtype: str
- latent_image
    - latent_image参数是采样过程的输入，作为生成新潜在表示的基础。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- start_at_step
    - start_at_step参数指示采样过程的初始步骤，决定了潜在图像生成的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数定义了采样过程的最终步骤，为潜在图像生成设定了边界。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mode
    - noise_mode参数决定了用于噪声生成的计算资源，要么利用GPU的并行能力，要么使用CPU的顺序处理。
    - Comfy dtype: ENUM
    - Python dtype: str

# Output types
- latent
    - latent参数代表采样过程的输出，提供了一个精炼和详细的潜在表示，可以进一步在流水线中使用。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - vae参数包括输出的变化自编码器组件，捕捉学习到的数据分布，并为进一步的分析和生成提供基础。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class KSamplerAdvanced_inspire_pipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'basic_pipe': ('BASIC_PIPE',), 'add_noise': ('BOOLEAN', {'default': True, 'label_on': 'enable', 'label_off': 'disable'}), 'noise_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.5, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'latent_image': ('LATENT',), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'return_with_leftover_noise': ('BOOLEAN', {'default': False, 'label_on': 'enable', 'label_off': 'disable'}), 'batch_seed_mode': (['incremental', 'comfy', 'variation str inc:0.01', 'variation str inc:0.05'],), 'variation_seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'variation_strength': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'noise_opt': ('NOISE',)}}
    RETURN_TYPES = ('LATENT', 'VAE')
    FUNCTION = 'sample'
    CATEGORY = 'InspirePack/a1111_compat'

    def sample(self, basic_pipe, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, denoise=1.0, batch_seed_mode='comfy', variation_seed=None, variation_strength=None, noise_opt=None):
        (model, clip, vae, positive, negative) = basic_pipe
        latent = KSamplerAdvanced_inspire().sample(model=model, add_noise=add_noise, noise_seed=noise_seed, steps=steps, cfg=cfg, sampler_name=sampler_name, scheduler=scheduler, positive=positive, negative=negative, latent_image=latent_image, start_at_step=start_at_step, end_at_step=end_at_step, noise_mode=noise_mode, return_with_leftover_noise=return_with_leftover_noise, denoise=denoise, batch_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength, noise_opt=noise_opt)[0]
        return (latent, vae)
```