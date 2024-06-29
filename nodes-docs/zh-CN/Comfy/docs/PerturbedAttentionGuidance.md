# Documentation
- Class name: PerturbedAttentionGuidance
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PerturbedAttentionGuidance类引入了一种通过注入扰动来修改模型注意力机制的方法，旨在增强模型对各种条件的鲁棒性和适应性。

# Input types
## Required
- model
    - 模型参数是必需的，因为它定义了应用扰动的基础架构，直接影响注意力引导过程的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- scale
    - 比例参数调整扰动的强度，显著影响模型注意力的改变方式，进而影响输出的质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出模型是输入模型的修改版，现在增强了扰动注意力引导，可以在各种任务中带来改进的性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class PerturbedAttentionGuidance:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'scale': ('FLOAT', {'default': 3.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, scale):
        unet_block = 'middle'
        unet_block_id = 0
        m = model.clone()

        def perturbed_attention(q, k, v, extra_options, mask=None):
            return v

        def post_cfg_function(args):
            model = args['model']
            cond_pred = args['cond_denoised']
            cond = args['cond']
            cfg_result = args['denoised']
            sigma = args['sigma']
            model_options = args['model_options'].copy()
            x = args['input']
            if scale == 0:
                return cfg_result
            model_options = comfy.model_patcher.set_model_options_patch_replace(model_options, perturbed_attention, 'attn1', unet_block, unet_block_id)
            (pag,) = comfy.samplers.calc_cond_batch(model, [cond], x, sigma, model_options)
            return cfg_result + (cond_pred - pag) * scale
        m.set_model_sampler_post_cfg_function(post_cfg_function)
        return (m,)
```