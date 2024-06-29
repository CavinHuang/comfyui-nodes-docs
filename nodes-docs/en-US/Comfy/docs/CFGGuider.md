---
tags:
- ModelGuidance
---

# CFGGuider
## Documentation
- Class name: `CFGGuider`
- Category: `sampling/custom_sampling/guiders`
- Output node: `False`

The CFGGuider node is designed to guide the sampling process in generative models by applying conditional fine-grained control. It leverages conditioning inputs and a configurable control factor to steer the generation towards desired attributes or away from undesired ones, enhancing the model's ability to produce targeted outputs.
## Input types
### Required
- **`model`**
    - The generative model to which the guidance will be applied. It serves as the foundation for the guidance process, determining the base behavior and capabilities of the guided sampling.
    - Comfy dtype: `MODEL`
    - Python dtype: `comfy.samplers.CFGGuider or any subclass thereof`
- **`positive`**
    - A conditioning input intended to steer the model towards generating content that aligns with the specified attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
- **`negative`**
    - A conditioning input used to steer the model away from generating content that aligns with the specified attributes or themes, acting as a counterbalance to the positive conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
- **`cfg`**
    - A floating-point value that represents the strength of the conditional fine-grained control applied during the sampling process. It modulates the influence of the conditioning inputs on the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`guider`**
    - Comfy dtype: `GUIDER`
    - The output is a configured guider object that encapsulates the logic and parameters for guiding the generative model's sampling process according to the specified conditions and control factor.
    - Python dtype: `comfy.samplers.CFGGuider`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CFGGuider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                     }
                }

    RETURN_TYPES = ("GUIDER",)

    FUNCTION = "get_guider"
    CATEGORY = "sampling/custom_sampling/guiders"

    def get_guider(self, model, positive, negative, cfg):
        guider = comfy.samplers.CFGGuider(model)
        guider.set_conds(positive, negative)
        guider.set_cfg(cfg)
        return (guider,)

```
