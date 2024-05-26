# Documentation
- Class name: IterativeLatentUpscale
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

IterativeLatentUpscale节点的'doit'方法旨在通过指定数量的迭代步骤逐步放大样本的潜在表示。它智能地应用放大因子来增强潜在空间的分辨率，可能导致放大输出中的细节得到改善。此方法通过迭代细化潜在空间，旨在实现更高质量的放大，同时不损害底层结构，从而为整个过程做出贡献。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它提供了节点将要放大的初始潜在表示。其质量和维度直接影响节点产生高分辨率输出的能力。这个参数对于迭代放大过程至关重要，并决定了增强的起点。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- upscale_factor
    - “upscale_factor”参数决定了潜在样本将被放大的程度。它是控制放大输出最终分辨率的关键因素。此参数允许微调潜在空间的规模，以满足所需的输出尺寸。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - “steps”参数定义了要执行的迭代放大步骤的数量。它很重要，因为它决定了迭代过程的粒度，允许对潜在空间进行更受控和渐进的增强。增加步骤的数量可以导致更平滑、更精细的放大结果。
    - Comfy dtype: INT
    - Python dtype: int
- upscaler
    - “upscaler”参数是一个必要的输入，它提供了放大潜在样本的机制。它包含了迭代放大过程所必需的逻辑和操作，对于确定节点功能的效率和效果至关重要。
    - Comfy dtype: UPSCALER
    - Python dtype: comfy_extras.nodes_upscale_model.Upscaler
## Optional
- temp_prefix
    - “temp_prefix”参数用于指定在放大过程中可能创建的临时文件的前缀。虽然不是必需的，但在组织或识别中间文件时可能很有用，特别是在涉及多个节点的复杂工作流程中。
    - Comfy dtype: STRING
    - Python dtype: str
- step_mode
    - “step_mode”参数规定了在迭代放大过程的每一步中增加规模的方法。它提供了简单线性进展或几何进展的选择，这可以显著影响放大输出中细节的分布。
    - Comfy dtype: COMBO[simple, geometric]
    - Python dtype: str
- unique_id
    - “unique_id”参数虽然是可选的，但可以用来跟踪节点在更大工作流程中的进度和状态。当同时运行节点的多个实例时，它特别有用，允许区分和监控各个节点的执行。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- latent
    - “latent”输出代表了由迭代过程产生的放大的潜在表示。它是输入样本的精炼版本，具有增加的分辨率，可以用于进一步的处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - “vae”输出提供了与放大的潜在表示相关的变分自编码器（VAE）模型。这个模型可以用于生成新样本对潜在空间进行进一步分析等其他任务。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class IterativeLatentUpscale:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'upscale_factor': ('FLOAT', {'default': 1.5, 'min': 1, 'max': 10000, 'step': 0.1}), 'steps': ('INT', {'default': 3, 'min': 1, 'max': 10000, 'step': 1}), 'temp_prefix': ('STRING', {'default': ''}), 'upscaler': ('UPSCALER',), 'step_mode': (['simple', 'geometric'], {'default': 'simple'})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('LATENT', 'VAE')
    RETURN_NAMES = ('latent', 'vae')
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, samples, upscale_factor, steps, temp_prefix, upscaler, step_mode='simple', unique_id=None):
        w = samples['samples'].shape[3] * 8
        h = samples['samples'].shape[2] * 8
        if temp_prefix == '':
            temp_prefix = None
        if step_mode == 'geometric':
            upscale_factor_unit = pow(upscale_factor, 1.0 / steps)
        else:
            upscale_factor_unit = max(0, (upscale_factor - 1.0) / steps)
        current_latent = samples
        scale = 1
        for i in range(steps - 1):
            if step_mode == 'geometric':
                scale *= upscale_factor_unit
            else:
                scale += upscale_factor_unit
            new_w = w * scale
            new_h = h * scale
            core.update_node_status(unique_id, f'{i + 1}/{steps} steps | x{scale:.2f}', (i + 1) / steps)
            print(f'IterativeLatentUpscale[{i + 1}/{steps}]: {new_w:.1f}x{new_h:.1f} (scale:{scale:.2f}) ')
            step_info = (i, steps)
            current_latent = upscaler.upscale_shape(step_info, current_latent, new_w, new_h, temp_prefix)
        if scale < upscale_factor:
            new_w = w * upscale_factor
            new_h = h * upscale_factor
            core.update_node_status(unique_id, f'Final step | x{upscale_factor:.2f}', 1.0)
            print(f'IterativeLatentUpscale[Final]: {new_w:.1f}x{new_h:.1f} (scale:{upscale_factor:.2f}) ')
            step_info = (steps - 1, steps)
            current_latent = upscaler.upscale_shape(step_info, current_latent, new_w, new_h, temp_prefix)
        core.update_node_status(unique_id, '', None)
        return (current_latent, upscaler.vae)
```