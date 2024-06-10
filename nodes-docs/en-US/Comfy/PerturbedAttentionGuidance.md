---
tags:
- ModelGuidance
---

# PerturbedAttentionGuidance
## Documentation
- Class name: `PerturbedAttentionGuidance`
- Category: `_for_testing`
- Output node: `False`

The PerturbedAttentionGuidance node introduces a method to modify the attention mechanism within a given model by applying a perturbation function. This alteration aims to explore the effects of perturbed attention on the model's performance, potentially enhancing its ability to focus on relevant features by adjusting the attention weights.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model to which the perturbed attention guidance will be applied. It is crucial for defining the base architecture that will undergo the perturbation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`scale`**
    - The scale parameter controls the intensity of the perturbation applied to the attention mechanism. It plays a significant role in determining the extent to which the original attention weights are modified.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - Returns a modified version of the input model, where the attention mechanism has been perturbed according to the specified scale.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PerturbedAttentionGuidance:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "scale": ("FLOAT", {"default": 3.0, "min": 0.0, "max": 100.0, "step": 0.1, "round": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "_for_testing"

    def patch(self, model, scale):
        unet_block = "middle"
        unet_block_id = 0
        m = model.clone()

        def perturbed_attention(q, k, v, extra_options, mask=None):
            return v

        def post_cfg_function(args):
            model = args["model"]
            cond_pred = args["cond_denoised"]
            cond = args["cond"]
            cfg_result = args["denoised"]
            sigma = args["sigma"]
            model_options = args["model_options"].copy()
            x = args["input"]

            if scale == 0:
                return cfg_result

            # Replace Self-attention with PAG
            model_options = comfy.model_patcher.set_model_options_patch_replace(model_options, perturbed_attention, "attn1", unet_block, unet_block_id)
            (pag,) = comfy.samplers.calc_cond_batch(model, [cond], x, sigma, model_options)

            return cfg_result + (cond_pred - pag) * scale

        m.set_model_sampler_post_cfg_function(post_cfg_function)

        return (m,)

```
