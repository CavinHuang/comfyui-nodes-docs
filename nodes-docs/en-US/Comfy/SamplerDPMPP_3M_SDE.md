---
tags:
- Sampling
---

# SamplerDPMPP_3M_SDE
## Documentation
- Class name: `SamplerDPMPP_3M_SDE`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

This node provides a method to obtain a sampler specifically designed for DPM-Solver++(3M) SDE models, allowing for the generation of samples based on specified noise levels and device preferences.
## Input types
### Required
- **`eta`**
    - Defines the scale of the noise to be applied during the sampling process, influencing the diversity and quality of generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s_noise`**
    - Specifies the noise scale used in the sampling process, affecting the variance of the generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_device`**
    - Determines whether the sampling computations are performed on a CPU or GPU, impacting performance and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - Produces a sampler configured for DPM-Solver++(3M) SDE models, ready to generate samples based on the provided noise parameters.
    - Python dtype: `comfy.samplers.ksampler`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SamplerDPMPP_3M_SDE:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"eta": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "s_noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "noise_device": (['gpu', 'cpu'], ),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, eta, s_noise, noise_device):
        if noise_device == 'cpu':
            sampler_name = "dpmpp_3m_sde"
        else:
            sampler_name = "dpmpp_3m_sde_gpu"
        sampler = comfy.samplers.ksampler(sampler_name, {"eta": eta, "s_noise": s_noise})
        return (sampler, )

```
