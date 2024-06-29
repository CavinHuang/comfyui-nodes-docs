---
tags:
- Sampling
---

# SamplerDPMPP_2M_SDE
## Documentation
- Class name: `SamplerDPMPP_2M_SDE`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

This node is designed to generate a sampler for the DPMPP_2M_SDE model, allowing for the creation of samples based on specified solver types, noise levels, and computational device preferences. It abstracts the complexities of sampler configuration, providing a streamlined interface for generating samples with customized settings.
## Input types
### Required
- **`solver_type`**
    - Specifies the solver type to be used in the sampling process, offering options between 'midpoint' and 'heun'. This choice influences the numerical integration method applied during sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`eta`**
    - Determines the step size in the numerical integration, affecting the granularity of the sampling process. A higher value indicates a larger step size.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s_noise`**
    - Controls the level of noise introduced during the sampling process, influencing the variability of the generated samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_device`**
    - Indicates the computational device ('gpu' or 'cpu') on which the noise generation process is executed, affecting performance and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - The output is a sampler configured according to the specified parameters, ready for generating samples.
    - Python dtype: `comfy.samplers.ksampler`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SamplerDPMPP_2M_SDE:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"solver_type": (['midpoint', 'heun'], ),
                     "eta": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "s_noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "noise_device": (['gpu', 'cpu'], ),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, solver_type, eta, s_noise, noise_device):
        if noise_device == 'cpu':
            sampler_name = "dpmpp_2m_sde"
        else:
            sampler_name = "dpmpp_2m_sde_gpu"
        sampler = comfy.samplers.ksampler(sampler_name, {"eta": eta, "s_noise": s_noise, "solver_type": solver_type})
        return (sampler, )

```
