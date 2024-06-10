---
tags:
- SamplerScheduler
- Sampling
---

# KSamplerProvider
## Documentation
- Class name: `KSamplerProvider`
- Category: `ImpactPack/Sampler`
- Output node: `False`

The KSamplerProvider node is designed to facilitate the creation of custom samplers for generative models, allowing users to specify various parameters such as seed, steps, configuration settings, and the type of sampler and scheduler to be used. It abstracts the complexity of sampler initialization and configuration, making it easier to experiment with different sampling strategies.
## Input types
### Required
- **`seed`**
    - The seed parameter ensures reproducibility of the sampling process by initializing the random number generator with a specific value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps the sampler will take, affecting the detail and quality of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration setting that influences the behavior of the sampler, potentially affecting aspects like sample diversity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the type of sampler to use, allowing for customization of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling algorithm to be used, impacting how sampling parameters are adjusted over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Controls the level of denoising applied to the samples, affecting their clarity and sharpness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`basic_pipe`**
    - A foundational pipeline component that provides essential model and conditioning information for the sampling process.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
## Output types
- **`ksampler`**
    - Comfy dtype: `KSAMPLER`
    - Produces a custom sampler configured according to the specified parameters, ready for generating samples.
    - Python dtype: `KSamplerWrapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                                "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                                "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                                "scheduler": (core.SCHEDULERS, ),
                                "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                                "basic_pipe": ("BASIC_PIPE", )
                             },
                }

    RETURN_TYPES = ("KSAMPLER",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Sampler"

    def doit(self, seed, steps, cfg, sampler_name, scheduler, denoise, basic_pipe):
        model, _, _, positive, negative = basic_pipe
        sampler = KSamplerWrapper(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, denoise)
        return (sampler, )

```
