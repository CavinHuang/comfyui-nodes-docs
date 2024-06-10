---
tags:
- ModelGuidance
---

# DualCFGGuider
## Documentation
- Class name: `DualCFGGuider`
- Category: `sampling/custom_sampling/guiders`
- Output node: `False`

The DualCFGGuider node is designed to enhance the sampling process by applying dual conditional guidance factors to a model. It allows for the specification of two distinct conditioning contexts and their respective guidance scales, enabling more nuanced control over the generation process.
## Input types
### Required
- **`model`**
    - The model parameter specifies the generative model to which the dual conditional guidance will be applied, serving as the foundation for the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.samplers.CFGGuider`
- **`cond1`**
    - The cond1 parameter represents the first conditioning context, providing a specific direction or theme for the generation.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`cond2`**
    - The cond2 parameter represents the second conditioning context, offering an additional layer of thematic guidance.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - The negative parameter specifies a conditioning context intended to guide the model away from certain themes or content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`cfg_conds`**
    - The cfg_conds parameter sets the guidance scale for the first conditioning context, adjusting the influence it has on the generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_cond2_negative`**
    - The cfg_cond2_negative parameter sets the guidance scale for the combination of the second conditioning context and the negative context, fine-tuning their impact on the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`guider`**
    - Comfy dtype: `GUIDER`
    - The output is a configured guider object, ready to influence the generative model's sampling process with dual conditional guidance.
    - Python dtype: `Guider_DualCFG`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DualCFGGuider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "cond1": ("CONDITIONING", ),
                    "cond2": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "cfg_conds": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "cfg_cond2_negative": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                     }
                }

    RETURN_TYPES = ("GUIDER",)

    FUNCTION = "get_guider"
    CATEGORY = "sampling/custom_sampling/guiders"

    def get_guider(self, model, cond1, cond2, negative, cfg_conds, cfg_cond2_negative):
        guider = Guider_DualCFG(model)
        guider.set_conds(cond1, cond2, negative)
        guider.set_cfg(cfg_conds, cfg_cond2_negative)
        return (guider,)

```
