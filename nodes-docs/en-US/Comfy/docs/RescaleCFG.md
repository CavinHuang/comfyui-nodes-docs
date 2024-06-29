---
tags:
- ModelGuidance
---

# RescaleCFG
## Documentation
- Class name: `RescaleCFG`
- Category: `advanced/model`
- Output node: `False`

The RescaleCFG node is designed to adjust the conditioning and unconditioning scales of a model's output based on a specified multiplier, aiming to achieve a more balanced and controlled generation process. It operates by rescaling the model's output to modify the influence of conditioned and unconditioned components, thereby potentially enhancing the model's performance or output quality.
## Input types
### Required
- **`model`**
    - The model parameter represents the generative model to be adjusted. It is crucial as the node applies a rescaling function to the model's output, directly influencing the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`multiplier`**
    - The multiplier parameter controls the extent of rescaling applied to the model's output. It determines the balance between the original and rescaled components, affecting the final output's characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with adjusted conditioning and unconditioning scales. This model is expected to produce outputs with potentially enhanced characteristics due to the applied rescaling.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RescaleCFG:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "multiplier": ("FLOAT", {"default": 0.7, "min": 0.0, "max": 1.0, "step": 0.01}),
                              }}
    RETURN_TYPES = ("MODEL",)
    FUNCTION = "patch"

    CATEGORY = "advanced/model"

    def patch(self, model, multiplier):
        def rescale_cfg(args):
            cond = args["cond"]
            uncond = args["uncond"]
            cond_scale = args["cond_scale"]
            sigma = args["sigma"]
            sigma = sigma.view(sigma.shape[:1] + (1,) * (cond.ndim - 1))
            x_orig = args["input"]

            #rescale cfg has to be done on v-pred model output
            x = x_orig / (sigma * sigma + 1.0)
            cond = ((x - (x_orig - cond)) * (sigma ** 2 + 1.0) ** 0.5) / (sigma)
            uncond = ((x - (x_orig - uncond)) * (sigma ** 2 + 1.0) ** 0.5) / (sigma)

            #rescalecfg
            x_cfg = uncond + cond_scale * (cond - uncond)
            ro_pos = torch.std(cond, dim=(1,2,3), keepdim=True)
            ro_cfg = torch.std(x_cfg, dim=(1,2,3), keepdim=True)

            x_rescaled = x_cfg * (ro_pos / ro_cfg)
            x_final = multiplier * x_rescaled + (1.0 - multiplier) * x_cfg

            return x_orig - (x - x_final * sigma / (sigma * sigma + 1.0) ** 0.5)

        m = model.clone()
        m.set_model_sampler_cfg_function(rescale_cfg)
        return (m, )

```
