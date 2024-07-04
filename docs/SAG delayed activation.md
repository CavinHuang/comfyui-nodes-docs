
# Documentation
- Class name: `SAG delayed activation`
- Category: `model_patches`
- Output node: `False`

SAG delayed activation节点引入了一种自注意力引导(Self-Attention Guidance, SAG)的自定义实现,专门设计用于通过根据条件输入动态调整注意力机制来增强模型性能。它主要聚焦于修改模型内的注意力层以纳入额外的引导,从而可能提高模型生成或处理数据的精确度和相关性。

# Input types
## Required
- model
    - 将应用自注意力引导(SAG)修改的神经网络模型。这个参数至关重要,因为它决定了将被SAG自定义实现增强的基础结构。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- scale
    - 一个调整SAG效果强度的缩放因子,影响引导对模型注意力机制的作用强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur_sigma
    - 指定用于对抗性模糊的高斯模糊标准差,这是SAG技术中操纵注意力分数的一部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_start
    - 应用SAG修改的sigma起始值,为注意力引导设定了一个操作范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_end
    - sigma的结束值,标记了应用SAG修改的操作范围的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 经过修改的神经网络模型,现在已经增强了自定义的自注意力引导实现,旨在通过动态调整其注意力机制来提高其性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SelfAttentionGuidanceCustom:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                             "scale": ("FLOAT", {"default": 0.5, "min": -2.0, "max": 5.0, "step": 0.1}),
                             "blur_sigma": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 10.0, "step": 0.1}),
                             "sigma_start": ("FLOAT", {"default": 15.0, "min": 0.0, "max": 1000.0, "step": 0.1, "round": 0.1}),
                             "sigma_end": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1000.0, "step": 0.1, "round": 0.1}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "model_patches"

    def patch(self, model, scale, blur_sigma, sigma_start, sigma_end):
        m = model.clone()
        
        attn_scores = None

        # TODO: make this work properly with chunked batches
        #       currently, we can only save the attn from one UNet call
        def attn_and_record(q, k, v, extra_options):
            nonlocal attn_scores
            # if uncond, save the attention scores
            heads = extra_options["n_heads"]
            cond_or_uncond = extra_options["cond_or_uncond"]
            b = q.shape[0] // len(cond_or_uncond)
            if 1 in cond_or_uncond:
                uncond_index = cond_or_uncond.index(1)
                # do the entire attention operation, but save the attention scores to attn_scores
                (out, sim) = attention_basic_with_sim(q, k, v, heads=heads)
                # when using a higher batch size, I BELIEVE the result batch dimension is [uc1, ... ucn, c1, ... cn]
                n_slices = heads * b
                attn_scores = sim[n_slices * uncond_index:n_slices * (uncond_index+1)]
                return out
            else:
                return optimized_attention(q, k, v, heads=heads)

        def post_cfg_function(args):
            nonlocal attn_scores
            uncond_attn = attn_scores

            sag_scale = scale
            sag_sigma = blur_sigma
            sag_threshold = 1.0
            model = args["model"]
            uncond_pred = args["uncond_denoised"]
            uncond = args["uncond"]
            cfg_result = args["denoised"]
            sigma = args["sigma"]
            model_options = args["model_options"]
            x = args["input"]
            if not isinstance(uncond, torch.Tensor):
                return cfg_result
            if min(cfg_result.shape[2:]) <= 4: #skip when too small to add padding
                return cfg_result
            if sigma[0] > sigma_start or sigma[0] < sigma_end:
                return cfg_result
            # create the adversarially blurred image
            degraded = create_blur_map(uncond_pred, uncond_attn, sag_sigma, sag_threshold)
            degraded_noised = degraded + x - uncond_pred
            # call into the UNet
            (sag, _) = comfy.samplers.calc_cond_batch(model, [uncond, None], degraded_noised, sigma, model_options)
            # comfy.samplers.calc_cond_uncond_batch(model, uncond, None, degraded_noised, sigma, model_options)
            
            return cfg_result + (degraded - sag) * sag_scale

        m.set_model_sampler_post_cfg_function(post_cfg_function, disable_cfg1_optimization=False)

        # from diffusers:
        # unet.mid_block.attentions[0].transformer_blocks[0].attn1.patch
        m.set_model_attn1_replace(attn_and_record, "middle", 0, 0)

        return (m, )

```
