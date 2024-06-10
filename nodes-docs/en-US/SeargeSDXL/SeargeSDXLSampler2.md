---
tags:
- Sampling
---

# SDXL Sampler v2 (Searge)
## Documentation
- Class name: `SeargeSDXLSampler2`
- Category: `Searge/_deprecated_/Sampling`
- Output node: `False`

The SeargeSDXLSampler2 node is designed to facilitate the sampling process within the SDXL framework, providing mechanisms to generate or refine samples based on given inputs. It integrates legacy functionalities, ensuring compatibility and extending the capabilities of the SDXL sampling process with additional features or optimizations.
## Input types
### Required
- **`base_model`**
    - The 'base_model' parameter specifies the foundational model used for sampling, playing a critical role in defining the initial state and characteristics of the sample.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`base_positive`**
    - The 'base_positive' parameter influences the sampling process by providing positive conditioning, guiding the generation towards desired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`base_negative`**
    - The 'base_negative' parameter offers negative conditioning, helping to steer away the sampling process from undesired attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - The 'refiner_model' parameter is used to refine the initial samples, enhancing details or correcting aspects based on the refinement model.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_positive`**
    - Similar to 'base_positive', the 'refiner_positive' parameter provides positive conditioning for the refinement stage, further shaping the sample's attributes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - The 'refiner_negative' parameter applies negative conditioning in the refinement stage, aiding in the removal or reduction of undesired features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - The 'latent_image' parameter represents the initial latent space representation to be refined or manipulated during the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`noise_seed`**
    - The 'noise_seed' parameter allows for the reproducibility of the sampling process by setting a specific seed for noise generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The 'steps' parameter determines the number of steps or iterations the sampling process will undergo, affecting the detail and quality of the final sample.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The 'cfg' parameter controls the configuration strength, influencing the adherence to the conditioning provided and impacting the sample's fidelity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The 'sampler_name' parameter specifies the sampling algorithm to be used, affecting the approach and method of sample generation.
    - Comfy dtype: `SAMPLER_NAME`
    - Python dtype: `str`
- **`scheduler`**
    - The 'scheduler' parameter determines the scheduling algorithm for the sampling process, impacting the progression and dynamics of sample refinement.
    - Comfy dtype: `SCHEDULER_NAME`
    - Python dtype: `str`
- **`base_ratio`**
    - The 'base_ratio' parameter adjusts the balance between the base model and refiner model contributions, fine-tuning the final sample's appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - The 'denoise' parameter applies a denoising effect to the sample, potentially enhancing clarity and reducing noise artifacts.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`refiner_prep_steps`**
    - The 'refiner_prep_steps' parameter specifies the number of preparatory steps for the refiner model, setting the stage for refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_offset`**
    - The 'noise_offset' parameter adjusts the starting point of noise application, influencing the randomness and variation in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`refiner_strength`**
    - The 'refiner_strength' parameter determines the intensity of the refinement process, directly affecting the level of detail and fidelity in the refined sample.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The 'latent' output represents the result of the sampling process, encapsulating the generated or refined sample in a latent space format. It is crucial for subsequent image generation or further refinement steps.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeSDXLSampler2:
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
                "noise_offset": ("INT", {"default": 1, "min": 0, "max": 1}),
                "refiner_strength": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 1.0, "step": 0.05}),
            },
        }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "Searge/_deprecated_/Sampling"

    def sample(self, base_model, base_positive, base_negative, refiner_model, refiner_positive, refiner_negative,
               latent_image, noise_seed, steps, cfg, sampler_name, scheduler, base_ratio, denoise,
               refiner_prep_steps=None, noise_offset=None, refiner_strength=None):

        base_steps = int(steps * (base_ratio + 0.0001))

        if noise_offset is None:
            noise_offset = 1

        if refiner_strength is None:
            refiner_strength = 1.0

        if refiner_strength < 0.01:
            refiner_strength = 0.01

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

        base_result = nodes.common_ksampler(base_model, noise_seed, steps, cfg, sampler_name, scheduler, base_positive,
                                            base_negative, input_latent, denoise=denoise, disable_noise=False,
                                            start_step=start_at_step, last_step=base_steps, force_full_denoise=True)

        return nodes.common_ksampler(refiner_model, noise_seed + noise_offset, steps, cfg, sampler_name, scheduler,
                                     refiner_positive, refiner_negative, base_result[0],
                                     denoise=denoise * refiner_strength, disable_noise=False, start_step=base_steps,
                                     last_step=steps, force_full_denoise=True)

```
