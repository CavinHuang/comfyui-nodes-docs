---
tags:
- Sampling
---

# SDXL Sampler v3 (Searge)
## Documentation
- Class name: `SeargeSDXLSamplerV3`
- Category: `Searge/_deprecated_/Sampling`
- Output node: `False`

The SeargeSDXLSamplerV3 node is designed for advanced sampling in generative models, offering enhanced capabilities for generating high-quality digital content. It incorporates sophisticated algorithms to refine and optimize the output, making it suitable for applications requiring precision and detail in the generated samples.
## Input types
### Required
- **`base_model`**
    - Specifies the base model used for initial sampling, setting the foundation for the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`base_positive`**
    - Defines the positive conditioning to guide the base model towards desirable outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`base_negative`**
    - Specifies the negative conditioning to steer the base model away from undesirable outcomes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - Indicates the refiner model used to enhance and refine the initial samples for improved quality.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_positive`**
    - Defines the positive conditioning for the refiner model, further guiding the enhancement process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - Specifies the negative conditioning for the refiner model, ensuring the refinement avoids undesirable aspects.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Represents the latent image or state used as a starting point for the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`noise_seed`**
    - Provides a seed value for noise generation, ensuring reproducibility in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps in the sampling process, affecting the detail and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configures the sampling strength or control factor, influencing the variance and fidelity of the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Specifies the name of the sampler algorithm used, affecting the sampling strategy and outcome.
    - Comfy dtype: `SAMPLER_NAME`
    - Python dtype: `str`
- **`scheduler`**
    - Indicates the scheduler used to manage the sampling steps, impacting the progression and refinement of the generation.
    - Comfy dtype: `SCHEDULER_NAME`
    - Python dtype: `str`
- **`base_ratio`**
    - Sets the ratio of base to refiner model usage, balancing initial generation with refinement.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - Controls the denoising factor in the sampling process, affecting the clarity and smoothness of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`refiner_prep_steps`**
    - Specifies the number of preparation steps for the refiner model, adjusting the initial conditions for refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Produces the final latent image or state after the sampling and refinement process, ready for further use or conversion to digital content.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)



## Source code
```python
class SeargeSDXLSamplerV3:
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
            "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xfffffffffffffff0}),
            "steps": ("INT", {"default": 20, "min": 1, "max": 200}),
            "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 30.0, "step": 0.5}),
            "sampler_name": ("SAMPLER_NAME", {"default": "ddim"}),
            "scheduler": ("SCHEDULER_NAME", {"default": "ddim_uniform"}),
            "base_ratio": ("FLOAT", {"default": 0.8, "min": 0.0, "max": 1.0, "step": 0.01}),
            "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
        },
            "optional": {
                "refiner_prep_steps": ("INT", {"default": 0, "min": 0, "max": 10}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "Searge/_deprecated_/Sampling"

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative,
               latent_image, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise,
               refiner_prep_steps=None):

        base_steps = int(steps * (base_ratio + 0.0001))
        refiner_steps = max(0, steps - base_steps)

        if denoise < 0.01:
            return (latent_image,)

        start_at_step = 0
        input_latent = latent_image

        if refiner_prep_steps is not None:
            if refiner_prep_steps >= base_steps:
                refiner_prep_steps = base_steps - 1

            if refiner_prep_steps > 0:
                start_at_step = refiner_prep_steps
                precondition_result = nodes.common_ksampler(refiner_model, noise_seed + 2, steps, cfg, sampler_name,
                                                            scheduler, refiner_positive, refiner_negative,
                                                            latent_image, denoise=denoise, disable_noise=False,
                                                            start_step=steps - refiner_prep_steps, last_step=steps,
                                                            force_full_denoise=False)

                input_latent = precondition_result[0]

        if base_steps >= steps:
            return nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive,
                                         base_negative, input_latent, denoise=denoise, disable_noise=False,
                                         start_step=start_at_step, last_step=steps, force_full_denoise=True)

        return sdxl_ksampler(base_model, refiner_model, noise_seed, base_steps, refiner_steps, cfg, sampler_name,
                             scheduler, base_positive, base_negative, refiner_positive, refiner_negative, input_latent,
                             denoise=denoise, disable_noise=False, start_step=start_at_step, last_step=steps,
                             force_full_denoise=True)

```
