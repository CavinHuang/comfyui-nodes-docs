# Documentation
- Class name: ModelSamplerTonemapNoiseTest
- Category: custom_node_experiments
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

节点 `ModelSamplerTonemapNoiseTest` 的 `patch` 方法旨在通过应用色调映射和噪声减少技术来增强给定模型的采样过程。它通过在 Reinhard 色调映射操作的上下文中调整噪声预测来工作，目的是提高采样输出的视觉质量和一致性。

# Input types
## Required
- model
    - 参数 `model` 至关重要，因为它代表了将要采样的机器学习模型。这是主要的输入，将在其上应用色调映射和噪声减少。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
## Optional
- multiplier
    - 参数 `multiplier` 用于缩放噪声减少效果。它允许根据手头任务的具体需求微调噪声过滤过程的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出 `model` 是输入模型的修改版本，现在配备了一个增强的采样函数，该函数结合了色调映射和噪声减少技术，以提高输出质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class ModelSamplerTonemapNoiseTest:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'multiplier': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'custom_node_experiments'

    def patch(self, model, multiplier):

        def sampler_tonemap_reinhard(args):
            cond = args['cond']
            uncond = args['uncond']
            cond_scale = args['cond_scale']
            noise_pred = cond - uncond
            noise_pred_vector_magnitude = (torch.linalg.vector_norm(noise_pred, dim=1) + 1e-10)[:, None]
            noise_pred /= noise_pred_vector_magnitude
            mean = torch.mean(noise_pred_vector_magnitude, dim=(1, 2, 3), keepdim=True)
            std = torch.std(noise_pred_vector_magnitude, dim=(1, 2, 3), keepdim=True)
            top = (std * 3 + mean) * multiplier
            noise_pred_vector_magnitude *= 1.0 / top
            new_magnitude = noise_pred_vector_magnitude / (noise_pred_vector_magnitude + 1.0)
            new_magnitude *= top
            return uncond + noise_pred * new_magnitude * cond_scale
        m = model.clone()
        m.set_model_sampler_cfg_function(sampler_tonemap_reinhard)
        return (m,)
```