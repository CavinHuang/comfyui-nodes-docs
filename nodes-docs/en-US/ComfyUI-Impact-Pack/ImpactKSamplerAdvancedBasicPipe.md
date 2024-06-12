---
tags:
- Sampling
---

# KSampler (Advanced/pipe)
## Documentation
- Class name: `ImpactKSamplerAdvancedBasicPipe`
- Category: `sampling`
- Output node: `False`

This node represents an advanced version of the KSampler within a pipeline, designed to facilitate complex sampling processes by integrating additional configurations and options for more nuanced control over the sampling outcome. It aims to enhance the flexibility and precision of sampling tasks in generative models.
## Input types
### Required
- **`basic_pipe`**
    - The basic pipeline configuration that the sampler operates on, including model and initial settings.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`add_noise`**
    - Indicates whether noise should be added to the sampling process, enabling or disabling this feature.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_seed`**
    - Specifies the seed for noise generation, ensuring reproducibility in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the depth of sampling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Specifies the configuration setting for the sampling process, impacting the behavior and outcome of the sampler.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Determines the specific sampler algorithm to be used, allowing for customization of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduling algorithm to manage the sampling steps, influencing the progression and quality of the sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_image`**
    - The initial latent image to be used in the sampling process, serving as the starting point.
    - Comfy dtype: `LATENT`
    - Python dtype: `object`
- **`start_at_step`**
    - Determines the starting step for the sampling process, allowing for mid-process initiation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Specifies the ending step for the sampling process, defining the termination point.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Controls whether the sampling process should return the result with leftover noise, affecting the final output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - The basic pipeline configuration after the sampling process.
    - Python dtype: `tuple`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The resulting latent image after the sampling process.
    - Python dtype: `object`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE model used in the sampling process, included in the output for further use or analysis.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvancedBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"basic_pipe": ("BASIC_PIPE",),
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (core.SCHEDULERS, ),
                     "latent_image": ("LATENT", ),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "return_with_leftover_noise": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                     }
                }

    RETURN_TYPES = ("BASIC_PIPE", "LATENT", "VAE")
    FUNCTION = "sample"

    CATEGORY = "sampling"

    def sample(self, basic_pipe, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise=1.0):
        model, clip, vae, positive, negative = basic_pipe

        if add_noise:
            add_noise = "enable"
        else:
            add_noise = "disable"

        if return_with_leftover_noise:
            return_with_leftover_noise = "enable"
        else:
            return_with_leftover_noise = "disable"

        latent = separated_sample(model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise)
        return basic_pipe, latent, vae

```
