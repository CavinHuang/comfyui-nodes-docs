# Documentation
- Class name: TonemapNoiseWithRescaleCFG
- Category: custom_node_experiments
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

TonemapNoiseWithRescaleCFG节点旨在通过应用色调映射技术结合降噪策略来增强生成图像的视觉质量。它通过复杂的重新缩放操作调整图像的对比度和亮度，以优化其外观并减少噪声。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了节点将操作的生成模型。它是应用色调映射和重新缩放操作以生成高质量图像的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- tonemap_multiplier
    - tonemap_multiplier参数控制应用于图像的色调映射效果的强度。它对于微调视觉结果以实现所需的对比度和亮度水平至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rescale_multiplier
    - rescale_multiplier参数在降噪过程中决定了重新缩放和原始图像值之间的平衡。它在保持图像细节的同时减少噪声方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是修改后的生成模型，它具有增强的采样器配置函数，该函数结合了色调映射和降噪技术，以产生视觉吸引力更强的图像。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class TonemapNoiseWithRescaleCFG:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'tonemap_multiplier': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01}), 'rescale_multiplier': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'custom_node_experiments'

    def patch(self, model, tonemap_multiplier, rescale_multiplier):

        def tonemap_noise_rescale_cfg(args):
            cond = args['cond']
            uncond = args['uncond']
            cond_scale = args['cond_scale']
            noise_pred = cond - uncond
            noise_pred_vector_magnitude = (torch.linalg.vector_norm(noise_pred, dim=1) + 1e-10)[:, None]
            noise_pred /= noise_pred_vector_magnitude
            mean = torch.mean(noise_pred_vector_magnitude, dim=(1, 2, 3), keepdim=True)
            std = torch.std(noise_pred_vector_magnitude, dim=(1, 2, 3), keepdim=True)
            top = (std * 3 + mean) * tonemap_multiplier
            noise_pred_vector_magnitude *= 1.0 / top
            new_magnitude = noise_pred_vector_magnitude / (noise_pred_vector_magnitude + 1.0)
            new_magnitude *= top
            x_cfg = uncond + noise_pred * new_magnitude * cond_scale
            ro_pos = torch.std(cond, dim=(1, 2, 3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1, 2, 3), keepdim=True)
            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = rescale_multiplier * x_rescaled + (1.0 - rescale_multiplier) * x_cfg
            return x_final
        m = model.clone()
        m.set_model_sampler_cfg_function(tonemap_noise_rescale_cfg)
        return (m,)
```