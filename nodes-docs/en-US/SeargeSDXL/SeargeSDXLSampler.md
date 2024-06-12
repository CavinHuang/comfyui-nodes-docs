---
tags:
- Sampling
---

# SDXL Sampler v1 (Searge)
## Documentation
- Class name: `SeargeSDXLSampler`
- Category: `Searge/_deprecated_/Sampling`
- Output node: `False`

The SeargeSDXLSampler node is designed to facilitate sampling operations within the SDXL framework, providing foundational support for generating or refining samples based on specific inputs. It serves as a core component in the process of creating or enhancing digital content, leveraging the capabilities of the SDXL architecture.
## Input types
### Required
- **`base_model`**
    - Required input specifying the model to be used as the base for sampling, essential for the initial generation phase.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`base_positive`**
    - Required input specifying positive conditioning for the base model, guiding the initial generation towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`base_negative`**
    - Required input specifying negative conditioning for the base model, steering the initial generation away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - Required input specifying the model to be used for refining the initial samples, enhancing their quality or altering their characteristics.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_positive`**
    - Required input specifying positive conditioning for the refiner model, guiding the refinement process towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - Required input specifying negative conditioning for the refiner model, steering the refinement process away from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Required input specifying the latent image to be used as a starting point for the sampling or refinement process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`noise_seed`**
    - Optional input specifying the seed for noise generation, influencing the randomness of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Required input specifying the number of steps to perform in the sampling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Required input specifying the CFG (classifier-free guidance) scale, adjusting the influence of conditioning on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Required input specifying the name of the sampler to use, determining the algorithm for the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Required input specifying the scheduler to use, affecting the progression of steps in the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`base_ratio`**
    - Required input specifying the ratio of influence between the base and refiner models on the final output, balancing their contributions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - Optional input specifying the denoise level, affecting the clarity and sharpness of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **``**
    - Comfy dtype: `LATENT`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLSampler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "base_model": ("MODEL",),
            "base_positive": ("CONDITIONING",),
            "base_negative": ("CONDITIONING",),
            "refiner_model": ("MODEL",),
            "refiner_positive": ("CONDITIONING",),
            "refiner_negative": ("CONDITIONING",),
            "latent_image": ("LATENT",),
            "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            "steps": ("INT", {"default": 30, "min": 1, "max": 1000}),
            "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0, "step": 0.5}),
            "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {"default": "dpmpp_2m"}),
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {"default": "karras"}),
            "base_ratio": ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.01}),
            "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
        },
        }

    RETURN_TYPES = ("LATENT",)
    RETURN_NAMES = ("",)
    FUNCTION = "sample"

    CATEGORY = "Searge/_deprecated_/Sampling"

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative,
               latent_image, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise):

        base_steps = int(steps * base_ratio)

        if denoise < 0.01:
            return (latent_image,)

        if base_steps >= steps:
            return nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive,
                                         base_negative, latent_image, denoise=denoise, disable_noise=False,
                                         start_step=0, last_step=steps, force_full_denoise=True)

        base_result = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive,
                                            base_negative, latent_image, denoise=denoise, disable_noise=False,
                                            start_step=0, last_step=base_steps, force_full_denoise=False)

        return nodes.common_ksampler(refiner_model, noise_seed, steps, cfg, sampler_name, scheduler, refiner_positive,
                                     refiner_negative, base_result[0], denoise=1.0, disable_noise=True,
                                     start_step=base_steps, last_step=steps, force_full_denoise=True)

```
