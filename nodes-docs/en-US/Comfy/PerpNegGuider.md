---
tags:
- ModelGuidance
---

# PerpNegGuider
## Documentation
- Class name: `PerpNegGuider`
- Category: `_for_testing`
- Output node: `False`

The PerpNegGuider node is designed to guide the generation process by applying perpendicular negative conditioning. It adjusts the generation towards positive conditions while steering clear of specified negative conditions, utilizing a configurable scale for negative conditioning.
## Input types
### Required
- **`model`**
    - The model parameter represents the generative model to which the guidance will be applied, serving as the foundation for the conditioning process.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.model_management.Model`
- **`positive`**
    - The positive parameter specifies the desired attributes or conditions that the generation should align with, guiding the model towards generating content that matches these positive conditions.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - The negative parameter defines the attributes or conditions that the generation should avoid, helping to steer the generated content away from these undesired aspects.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`empty_conditioning`**
    - The empty_conditioning parameter is used to reset or provide a baseline for the conditioning, ensuring that the guidance starts from a neutral state.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`cfg`**
    - The cfg parameter controls the overall strength of the conditioning, allowing for fine-tuning of how strongly the positive and negative conditions influence the generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`neg_scale`**
    - The neg_scale parameter adjusts the scale of the negative conditioning, modifying the extent to which negative conditions are avoided in the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`guider`**
    - Comfy dtype: `GUIDER`
    - The output is a configured guider object that applies perpendicular negative conditioning to guide the generative model.
    - Python dtype: `Guider_PerpNeg`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PerpNegGuider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "empty_conditioning": ("CONDITIONING", ),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "neg_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("GUIDER",)

    FUNCTION = "get_guider"
    CATEGORY = "_for_testing"

    def get_guider(self, model, positive, negative, empty_conditioning, cfg, neg_scale):
        guider = Guider_PerpNeg(model)
        guider.set_conds(positive, negative, empty_conditioning)
        guider.set_cfg(cfg, neg_scale)
        return (guider,)

```
