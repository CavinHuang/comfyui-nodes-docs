---
tags:
- Sampling
---

# SamplerLCMAlternative
## Documentation
- Class name: `SamplerLCMAlternative`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

This node provides a mechanism to generate samples using an alternative LCM (Least Common Multiple) approach, allowing for customization of the sampling process through parameters such as euler steps, ancestral influence, and noise multiplier. It aims to offer a flexible sampling strategy that can be tailored to specific needs or experimental setups.
## Input types
### Required
- **`euler_steps`**
    - Specifies the number of Euler integration steps to be used in the sampling process, influencing the granularity and potentially the quality of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ancestral`**
    - Determines the degree of ancestral sampling to be applied, affecting the diversity and characteristics of the samples by adjusting the influence of prior steps.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mult`**
    - Adjusts the multiplier for the noise applied during sampling, allowing for control over the variance and exploration within the sample space.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - Produces a sampler configured according to the specified parameters, ready for generating samples.
    - Python dtype: `comfy.samplers.KSAMPLER`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)



## Source code
```python
class SamplerLCMAlternative:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"euler_steps": ("INT", {"default": 0, "min": -10000, "max": 10000}),
                     "ancestral": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.01, "round": False}),
                     "noise_mult": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.001, "round": False}),
                    }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, euler_steps, ancestral, noise_mult):
        sampler = comfy.samplers.KSAMPLER(sample_lcm_alt, extra_options={"euler_steps": euler_steps, "noise_mult": noise_mult, "ancestral": ancestral})
        return (sampler, )

```
