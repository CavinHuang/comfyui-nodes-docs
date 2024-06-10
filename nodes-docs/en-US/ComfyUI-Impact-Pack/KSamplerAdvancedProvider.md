---
tags:
- SamplerScheduler
- Sampling
---

# KSamplerAdvancedProvider
## Documentation
- Class name: `KSamplerAdvancedProvider`
- Category: `ImpactPack/Sampler`
- Output node: `False`

This node provides an advanced KSampler configuration, enabling the customization of sampling processes with additional parameters and options for more complex and tailored sampling strategies.
## Input types
### Required
- **`cfg`**
    - Specifies the configuration value for the sampler, influencing its behavior and performance characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Determines the specific sampler to be used, chosen from a predefined set of samplers.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduling algorithm to manage the sampling process, affecting the progression and adjustment of sampling parameters.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sigma_factor`**
    - Adjusts the sigma factor, modifying the noise level applied during the sampling process for fine-tuning purposes.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`basic_pipe`**
    - Provides the basic pipeline components necessary for the sampling operation, including the model and conditioning information.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
### Optional
- **`sampler_opt`**
    - Optional sampler configurations, allowing for further customization of the sampling process.
    - Comfy dtype: `SAMPLER`
    - Python dtype: `dict`
## Output types
- **`ksampler_advanced`**
    - Comfy dtype: `KSAMPLER_ADVANCED`
    - An advanced KSampler instance configured with the specified parameters for complex sampling tasks.
    - Python dtype: `KSamplerAdvancedWrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvancedProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                                "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                                "scheduler": (core.SCHEDULERS, ),
                                "sigma_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                                "basic_pipe": ("BASIC_PIPE", )
                             },
                "optional": {
                                "sampler_opt": ("SAMPLER", )
                            }
                }

    RETURN_TYPES = ("KSAMPLER_ADVANCED",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Sampler"

    def doit(self, cfg, sampler_name, scheduler, basic_pipe, sigma_factor=1.0, sampler_opt=None):
        model, _, _, positive, negative = basic_pipe
        sampler = KSamplerAdvancedWrapper(model, cfg, sampler_name, scheduler, positive, negative, sampler_opt=sampler_opt, sigma_factor=sigma_factor)
        return (sampler, )

```
