---
tags:
- ModelGuidance
- ModelPatch
---

# RescaleClassifierFreeGuidanceTest
## Documentation
- Class name: `RescaleClassifierFreeGuidanceTest`
- Category: `custom_node_experiments`
- Output node: `False`

This node applies a custom patch to a given model, modifying its classifier-free guidance sampling function. The patch rescales the guidance scale factor dynamically based on the standard deviation of the conditional and unconditional inputs, aiming to maintain a consistent scale of features across different guidance strengths.
## Input types
### Required
- **`model`**
    - The model to which the patch will be applied. This patch modifies the model's classifier-free guidance sampling function to dynamically adjust the guidance scale.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`multiplier`**
    - A scaling factor that blends the original and rescaled guidance signals, controlling the strength of the rescaling effect on the model's output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The patched model with an updated classifier-free guidance sampling function that incorporates dynamic rescaling based on input standard deviations.
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
