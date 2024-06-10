---
tags:
- Sampling
---

# SamplerDPMPP_SDE
## Documentation
- Class name: `SamplerDPMPP_SDE`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

This node is designed to generate a sampler for the DPM++ SDE (Stochastic Differential Equation) model. It adapts to both CPU and GPU execution environments, optimizing the sampler's implementation based on the available hardware.
## Input types
### Required
- **`eta`**
    - Specifies the step size for the SDE solver, influencing the granularity of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s_noise`**
    - Determines the level of noise to be applied during the sampling process, affecting the diversity of the generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`r`**
    - Controls the ratio of noise reduction in the sampling process, impacting the clarity and quality of the generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_device`**
    - Selects the execution environment (CPU or GPU) for the sampler, optimizing performance based on available hardware.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - The generated sampler configured with the specified parameters, ready for use in sampling operations.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SamplerDPMPP_SDE:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"eta": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "s_noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "r": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "noise_device": (['gpu', 'cpu'], ),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, eta, s_noise, r, noise_device):
        if noise_device == 'cpu':
            sampler_name = "dpmpp_sde"
        else:
            sampler_name = "dpmpp_sde_gpu"
        sampler = comfy.samplers.ksampler(sampler_name, {"eta": eta, "s_noise": s_noise, "r": r})
        return (sampler, )

```
