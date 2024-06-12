---
tags:
- ModelGuidance
---

# SAG delayed activation
## Documentation
- Class name: `SAG delayed activation`
- Category: `model_patches`
- Output node: `False`

This node introduces a custom implementation of Self-Attention Guidance (SAG) for neural networks, specifically designed to enhance model performance by dynamically adjusting attention mechanisms based on conditional inputs. It focuses on modifying the attention layers within a model to incorporate additional guidance, thereby potentially improving the model's ability to generate or process data with greater precision and relevance.
## Input types
### Required
- **`model`**
    - The neural network model to which the Self-Attention Guidance modifications will be applied. This parameter is crucial as it determines the base structure that will be enhanced with the custom SAG implementation.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`scale`**
    - A scaling factor that adjusts the intensity of the SAG effect, influencing how strongly the guidance affects the model's attention mechanisms.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`blur_sigma`**
    - Specifies the standard deviation of the Gaussian blur applied for adversarial blurring, part of the SAG technique to manipulate attention scores.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_start`**
    - The starting value of sigma for which the SAG modifications are applied, setting an operational range for the attention guidance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_end`**
    - The ending value of sigma, marking the lower bound of the operational range for applying the SAG modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified neural network model, now enhanced with the custom Self-Attention Guidance implementation, aimed at improving its performance by dynamically adjusting its attention mechanisms.
    - Python dtype: `torch.nn.Module`
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
