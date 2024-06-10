# Documentation
- Class name: PerpNeg
- Category: _for_testing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PerpNeg节点旨在通过引入负面条件方面来操纵模型的采样过程。它通过改变模型的去噪步骤来实现这一点，将负面比例因子纳入其中，这有助于将生成过程引向更多样化的结果。

# Input types
## Required
- model
    - 模型参数对于PerpNeg节点至关重要，因为它代表了将要被修改的机器学习模型。节点的功能直接与所提供模型的能力相关，影响在采样期间如何应用负面条件。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- empty_conditioning
    - 空条件作为模型将使用的输入条件的占位符。它在节点的操作中起着关键作用，因为它决定了在采样过程中如何应用负面比例，影响最终输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]
## Optional
- neg_scale
    - neg_scale参数用于控制负面条件效果的强度。它特别重要，因为它直接影响节点多样化采样结果的能力，提供了正面和负面影响之间的平衡。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - PerpNeg节点的输出模型是输入模型的修改版本，现在包括了负面条件方面。然后可以使用这个修改后的模型进行采样，可能导致更多样化和创造性的结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: CPU

# Source code
```
class PerpNeg:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'empty_conditioning': ('CONDITIONING',), 'neg_scale': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 100.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = '_for_testing'

    def patch(self, model, empty_conditioning, neg_scale):
        m = model.clone()
        nocond = comfy.sampler_helpers.convert_cond(empty_conditioning)

        def cfg_function(args):
            model = args['model']
            noise_pred_pos = args['cond_denoised']
            noise_pred_neg = args['uncond_denoised']
            cond_scale = args['cond_scale']
            x = args['input']
            sigma = args['sigma']
            model_options = args['model_options']
            nocond_processed = comfy.samplers.encode_model_conds(model.extra_conds, nocond, x, x.device, 'negative')
            (noise_pred_nocond,) = comfy.samplers.calc_cond_batch(model, [nocond_processed], x, sigma, model_options)
            cfg_result = x - perp_neg(x, noise_pred_pos, noise_pred_neg, noise_pred_nocond, neg_scale, cond_scale)
            return cfg_result
        m.set_model_sampler_cfg_function(cfg_function)
        return (m,)
```