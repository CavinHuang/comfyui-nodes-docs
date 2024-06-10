---
tags:
- Sampling
---

# KSamplerAdvanced (inspire)
## Documentation
- Class name: `KSamplerAdvanced __Inspire`
- Category: `InspirePack/a1111_compat`
- Output node: `False`

This node is designed to enhance the sampling process in generative models, specifically tailored for the Inspire pack. It builds upon the standard sampling techniques by incorporating advanced features and optimizations to improve the quality and efficiency of generated samples.
## Input types
### Required
- **`model`**
    - Specifies the generative model used for the sampling process, serving as the core component around which the sampling operation revolves.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`add_noise`**
    - Determines whether noise should be added to the sampling process, enhancing the diversity and quality of the generated samples.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring reproducibility and consistency in the samples produced.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Specifies the conditioning-free guidance scale, influencing the direction and strength of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampler algorithm to be used, allowing for customization of the sampling technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduler for controlling the sampling process, further customizing the generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Provides positive conditioning to guide the sampling towards desired attributes or content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Provides negative conditioning to steer the sampling away from undesired attributes or content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Inputs a latent image representation to be used or modified during the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`start_at_step`**
    - Specifies the starting step for the sampling process, allowing for mid-process interventions or adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Defines the ending step for the sampling process, setting the bounds for generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_mode`**
    - Determines the computational platform (GPU or CPU) for noise generation, affecting performance and efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`return_with_leftover_noise`**
    - Indicates whether to return the sample with leftover noise, offering additional control over the output's final appearance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`batch_seed_mode`**
    - Specifies the mode for seed generation across batches, affecting the diversity of generated samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`variation_seed`**
    - Sets the seed for introducing variations, enabling controlled diversity in the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`variation_strength`**
    - Determines the strength of variations introduced, allowing for fine-tuning of the output's diversity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`noise_opt`**
    - Provides options for noise customization, offering further control over the sampling process.
    - Comfy dtype: `NOISE`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Outputs a latent representation of the generated sample, encapsulating the result of the advanced sampling process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvanced_inspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "latent_image": ("LATENT", ),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "return_with_leftover_noise": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     },
                "optional":
                    {
                        "noise_opt": ("NOISE",),
                    }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, denoise=1.0, batch_seed_mode="comfy", variation_seed=None, variation_strength=None, noise_opt=None):
        force_full_denoise = True

        if return_with_leftover_noise:
            force_full_denoise = False

        disable_noise = False

        if not add_noise:
            disable_noise = True

        return common_ksampler(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image,
                               denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step,
                               force_full_denoise=force_full_denoise, noise_mode=noise_mode, incremental_seed_mode=batch_seed_mode,
                               variation_seed=variation_seed, variation_strength=variation_strength, noise=noise_opt)

```
