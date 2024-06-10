---
tags:
- Sampling
---

# SamplerLCMCycle
## Documentation
- Class name: `SamplerLCMCycle`
- Category: `sampling/custom_sampling/samplers`
- Output node: `False`

The SamplerLCMCycle node is designed to generate a custom sampler based on the LCM (Least Common Multiple) cycle method, incorporating options for Euler steps, LCM steps, sigma tweaking, and ancestral sampling to tailor the sampling process.
## Input types
### Required
- **`euler_steps`**
    - Specifies the number of Euler steps to be used in the LCM cycle, affecting the granularity of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`lcm_steps`**
    - Determines the number of LCM steps in the cycle, influencing the sampling's adherence to the LCM pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`tweak_sigmas`**
    - A boolean flag that, when enabled, tweaks the sigma values used in the sampling process for potentially enhanced results.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`ancestral`**
    - Controls the ancestral sampling rate, offering a way to adjust the influence of previous generations on the current sample.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`sampler`**
    - Comfy dtype: `SAMPLER`
    - Produces a custom sampler configured according to the specified LCM cycle parameters.
    - Python dtype: `comfy.samplers.KSAMPLER`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [SamplerCustom](../../Comfy/Nodes/SamplerCustom.md)



## Source code
```python
class SamplerLCMCycle:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"euler_steps": ("INT", {"default": 1, "min": 1, "max": 50}),
                     "lcm_steps": ("INT", {"default": 2, "min": 1, "max": 50}),
                     "tweak_sigmas": ("BOOLEAN", {"default": False}),
                     "ancestral": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.01, "round": False}),
                    }
               }
    RETURN_TYPES = ("SAMPLER",)
    CATEGORY = "sampling/custom_sampling/samplers"

    FUNCTION = "get_sampler"

    def get_sampler(self, euler_steps, lcm_steps, tweak_sigmas, ancestral):
        sampler = comfy.samplers.KSAMPLER(sample_lcm_cycle, extra_options={"euler_steps": euler_steps, "lcm_steps": lcm_steps, "tweak_sigmas": tweak_sigmas, "ancestral": ancestral})
        return (sampler, )

```
