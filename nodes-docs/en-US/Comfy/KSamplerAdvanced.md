---
tags:
- Sampling
---

# KSampler (Advanced)
## Documentation
- Class name: `KSamplerAdvanced`
- Category: `sampling`
- Output node: `False`

The KSamplerAdvanced node is designed to enhance the sampling process by providing advanced configurations and techniques. It aims to offer more sophisticated options for generating samples from a model, improving upon the basic KSampler functionalities.
## Input types
### Required
- **`model`**
    - Specifies the model from which samples are to be generated, playing a crucial role in the sampling process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`add_noise`**
    - Determines whether noise should be added to the sampling process, affecting the diversity and quality of the generated samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring reproducibility in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, impacting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, influencing the direction and space of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to be used, allowing for customization of the sampling technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, affecting the progression and quality of samples.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Specifies the positive conditioning to guide the sampling towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Specifies the negative conditioning to steer the sampling away from certain attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Provides the initial latent image to be used in the sampling process, serving as a starting point.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`start_at_step`**
    - Determines the starting step of the sampling process, allowing for control over the sampling progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Sets the ending step of the sampling process, defining the scope of the sampling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Indicates whether to return the sample with leftover noise, affecting the final output's appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The output represents the latent image generated from the model, reflecting the applied configurations and techniques.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - Reroute
    - workflow/KSampler + Vae
    - gcLatentTunnel
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [LatentCompositeMasked](../../Comfy/Nodes/LatentCompositeMasked.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [LatentBlend](../../Comfy/Nodes/LatentBlend.md)
    - Mute / Bypass Repeater (rgthree)



## Source code
```python
class KSamplerAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "add_noise": (["enable", "disable"], ),
                    "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "latent_image": ("LATENT", ),
                    "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                    "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                    "return_with_leftover_noise": (["disable", "enable"], ),
                     }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "sampling"

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, return_with_leftover_noise, denoise=1.0):
        force_full_denoise = True
        if return_with_leftover_noise == "enable":
            force_full_denoise = False
        disable_noise = False
        if add_noise == "disable":
            disable_noise = True
        return common_ksampler(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step, force_full_denoise=force_full_denoise)

```
