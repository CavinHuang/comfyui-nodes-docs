---
tags:
- Sampling
---

# SamplerEulerAncestral
## Documentation
- Class name: `SamplerEulerAncestral`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

This node provides a mechanism to generate samples using the Euler Ancestral sampling method, tailored for specific noise and step size adjustments.
## Input types
### Required
- **`eta`**
    - Specifies the step size for the Euler method, influencing the granularity of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s_noise`**
    - Determines the scale of noise to be added at each step, affecting the variability of the samples.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - Outputs a sampler configured for Euler Ancestral sampling, ready for generating samples.
    - Python dtype: `comfy.samplers.KSampler`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SamplerEulerAncestral:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"eta": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                     "s_noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0, "step":0.01, "round": False}),
                      }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, eta, s_noise):
        sampler = comfy.samplers.ksampler("euler_ancestral", {"eta": eta, "s_noise": s_noise})
        return (sampler, )

```
