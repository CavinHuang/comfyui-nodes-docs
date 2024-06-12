---
tags:
- ModelGuidance
- ModelPatch
---

# Inference_Core_RescaleClassifierFreeGuidanceTest
## Documentation
- Class name: `Inference_Core_RescaleClassifierFreeGuidanceTest`
- Category: `custom_node_experiments`
- Output node: `False`

This node applies a custom patch to a given model, enhancing its inference capabilities by rescaling the classifier-free guidance process. It adjusts the balance between conditioned and unconditioned generation through a specified multiplier, aiming to improve the model's output quality.
## Input types
### Required
- **`model`**
    - The model to be patched, which will have its classifier-free guidance process rescaled for improved inference performance.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`multiplier`**
    - A scalar value that adjusts the balance between conditioned and unconditioned generation, influencing the final output quality of the model.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The patched model with an adjusted classifier-free guidance process for enhanced inference performance.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RescaleClassifierFreeGuidance:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "multiplier": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "custom_node_experiments"

    def patch(self, model, multiplier):
        
        def rescale_cfg(args):
            cond = args["cond"]
            uncond = args["uncond"]
            cond_scale = args["cond_scale"]

            x_cfg = uncond + cond_scale * (cond - uncond)
            ro_pos = torch.std(cond, dim=(1,2,3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1,2,3), keepdim=True)

            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = multiplier * x_rescaled + (1.0 - multiplier) * x_cfg

            return x_final

        m = model.clone()
        m.set_model_sampler_cfg_function(rescale_cfg)
        return (m, )

```
