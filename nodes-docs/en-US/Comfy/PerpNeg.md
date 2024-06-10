---
tags:
- ModelGuidance
---

# Perp-Neg (DEPRECATED by PerpNegGuider)
## Documentation
- Class name: `PerpNeg`
- Category: `_for_testing`
- Output node: `False`

The PerpNeg node is designed to adjust the conditioning of a model by applying a perpendicular negative guidance technique. This technique modifies the input conditioning vectors to enhance the generation of content that diverges from undesired directions, effectively guiding the model towards more desirable outputs.
## Input types
### Required
- **`model`**
    - The model parameter represents the generative model to which the perpendicular negative guidance will be applied. It is crucial for determining the base behavior and capabilities of the node.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_management.MODEL`
- **`empty_conditioning`**
    - The empty_conditioning parameter is used to provide a baseline or neutral conditioning context, against which positive and negative deviations are calculated and adjusted.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `CONDITIONING`
- **`neg_scale`**
    - The neg_scale parameter controls the intensity of the negative guidance applied, allowing for fine-tuning of the perpendicular negative effect on the model's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The output is a modified version of the input model, adjusted with perpendicular negative guidance to influence its generation process towards desired outcomes.
    - Python dtype: `comfy.model_management.MODEL`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PerpNeg:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL", ),
                             "empty_conditioning": ("CONDITIONING", ),
                             "neg_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                            }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "_for_testing"

    def patch(self, model, empty_conditioning, neg_scale):
        m = model.clone()
        nocond = comfy.sampler_helpers.convert_cond(empty_conditioning)

        def cfg_function(args):
            model = args["model"]
            noise_pred_pos = args["cond_denoised"]
            noise_pred_neg = args["uncond_denoised"]
            cond_scale = args["cond_scale"]
            x = args["input"]
            sigma = args["sigma"]
            model_options = args["model_options"]
            nocond_processed = comfy.samplers.encode_model_conds(model.extra_conds, nocond, x, x.device, "negative")

            (noise_pred_nocond,) = comfy.samplers.calc_cond_batch(model, [nocond_processed], x, sigma, model_options)

            cfg_result = x - perp_neg(x, noise_pred_pos, noise_pred_neg, noise_pred_nocond, neg_scale, cond_scale)
            return cfg_result

        m.set_model_sampler_cfg_function(cfg_function)

        return (m, )

```
