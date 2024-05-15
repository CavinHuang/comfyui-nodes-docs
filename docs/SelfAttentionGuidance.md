# Documentation
- Class name: SelfAttentionGuidance
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SelfAttentionGuidance 类旨在通过提供基于自注意力的指导来增强模型中的注意力机制。它通过修改模型的注意力过程来融入额外的上下文，可能提高模型关注输入数据相关部分的能力。

# Input types
## Required
- model
    - 模型参数对于 SelfAttentionGuidance 节点至关重要，因为它代表了节点将修改和指导的机器学习模型。节点的功能直接与模型的架构和能力相关联。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- scale
    - scale 参数调整自注意力指导对模型输出的影响。它是一个关键组件，允许微调节点对模型注意力过程的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur_sigma
    - blur_sigma 参数定义了在模型的后配置函数中应用的模糊程度。它很重要，因为它可以影响模型输出的视觉质量和细节保留。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - modified_model 输出是将 SelfAttentionGuidance 补丁应用于输入模型的结果。它表示具有增强注意力机制的模型，准备用于进一步使用或评估。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class SelfAttentionGuidance:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'scale': ('FLOAT', {'default': 0.5, 'min': -2.0, 'max': 5.0, 'step': 0.1}), 'blur_sigma': ('FLOAT', {'default': 2.0, 'min': 0.0, 'max': 10.0, 'step': 0.1})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, scale, blur_sigma):
        m = model.clone()
        attn_scores = None

        def attn_and_record(q, k, v, extra_options):
            nonlocal attn_scores
            heads = extra_options['n_heads']
            cond_or_uncond = extra_options['cond_or_uncond']
            b = q.shape[0] // len(cond_or_uncond)
            if 1 in cond_or_uncond:
                uncond_index = cond_or_uncond.index(1)
                (out, sim) = attention_basic_with_sim(q, k, v, heads=heads)
                n_slices = heads * b
                attn_scores = sim[n_slices * uncond_index:n_slices * (uncond_index + 1)]
                return out
            else:
                return optimized_attention(q, k, v, heads=heads)

        def post_cfg_function(args):
            nonlocal attn_scores
            uncond_attn = attn_scores
            sag_scale = scale
            sag_sigma = blur_sigma
            sag_threshold = 1.0
            model = args['model']
            uncond_pred = args['uncond_denoised']
            uncond = args['uncond']
            cfg_result = args['denoised']
            sigma = args['sigma']
            model_options = args['model_options']
            x = args['input']
            if min(cfg_result.shape[2:]) <= 4:
                return cfg_result
            degraded = create_blur_map(uncond_pred, uncond_attn, sag_sigma, sag_threshold)
            degraded_noised = degraded + x - uncond_pred
            (sag,) = comfy.samplers.calc_cond_batch(model, [uncond], degraded_noised, sigma, model_options)
            return cfg_result + (degraded - sag) * sag_scale
        m.set_model_sampler_post_cfg_function(post_cfg_function, disable_cfg1_optimization=True)
        m.set_model_attn1_replace(attn_and_record, 'middle', 0, 0)
        return (m,)
```