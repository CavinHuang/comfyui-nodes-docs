---
tags:
- Sampling
---

# KSamplerAdvanced [pipe] (inspire)
## Documentation
- Class name: `KSamplerAdvancedPipe __Inspire`
- Category: `InspirePack/a1111_compat`
- Output node: `False`

The KSamplerAdvancedInspire node is designed to enhance the inspiration process by providing advanced sampling capabilities within a pipeline. It leverages sophisticated algorithms to generate or process data, aiming to inspire creativity and innovation through its output.
## Input types
### Required
- **`basic_pipe`**
    - The 'basic_pipe' input is essential for providing the foundational components of the model, clip, vae, and conditioning elements, setting the stage for advanced sampling operations.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`add_noise`**
    - The 'add_noise' input determines whether noise should be added to the sampling process, influencing the variability and uniqueness of the generated outputs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_seed`**
    - The 'noise_seed' input specifies the seed for noise generation, ensuring reproducibility and consistency in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The 'steps' input defines the number of steps to be taken in the sampling process, affecting the depth and detail of the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The 'cfg' input sets the configuration for the sampling process, adjusting the control and guidance of the generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The 'sampler_name' input selects the specific sampler algorithm to be used, tailoring the sampling process to specific requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The 'scheduler' input specifies the scheduling algorithm for the sampling process, impacting the progression and variation of the generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_image`**
    - The 'latent_image' input provides an initial latent image to be used as a starting point for the sampling process, influencing the direction of the generation.
    - Comfy dtype: `LATENT`
    - Python dtype: `object`
- **`start_at_step`**
    - The 'start_at_step' input determines the starting step of the sampling process, allowing for customization of the generation's progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - The 'end_at_step' input defines the ending step of the sampling process, setting the bounds for the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_mode`**
    - The 'noise_mode' input selects the computational mode (GPU or CPU) for noise generation, affecting the performance and efficiency of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`return_with_leftover_noise`**
    - The 'return_with_leftover_noise' input indicates whether leftover noise should be returned, offering additional control over the output's variability.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`batch_seed_mode`**
    - The 'batch_seed_mode' input specifies the mode for seed generation in batch operations, influencing the diversity and consistency of the outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`variation_seed`**
    - The 'variation_seed' input provides a seed for generating variations, enabling nuanced adjustments to the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`variation_strength`**
    - The 'variation_strength' input controls the strength of variations applied, allowing for fine-tuning of the generation's diversity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`noise_opt`**
    - The 'noise_opt' input, if provided, specifies custom noise options for the sampling process, offering further customization.
    - Comfy dtype: `NOISE`
    - Python dtype: `object`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - This output represents the generated latent image, serving as a foundational element for further processing or visualization.
    - Python dtype: `object`
- **`vae`**
    - Comfy dtype: `VAE`
    - This output provides the variational autoencoder used in the process, facilitating additional manipulations or analyses of the generated data.
    - Python dtype: `object`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvanced_inspire_pipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"basic_pipe": ("BASIC_PIPE",),
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
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

    RETURN_TYPES = ("LATENT", "VAE", )
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, basic_pipe, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, denoise=1.0, batch_seed_mode="comfy", variation_seed=None, variation_strength=None, noise_opt=None):
        model, clip, vae, positive, negative = basic_pipe
        latent = KSamplerAdvanced_inspire().sample(model=model, add_noise=add_noise, noise_seed=noise_seed,
                                                   steps=steps, cfg=cfg, sampler_name=sampler_name, scheduler=scheduler,
                                                   positive=positive, negative=negative, latent_image=latent_image,
                                                   start_at_step=start_at_step, end_at_step=end_at_step,
                                                   noise_mode=noise_mode, return_with_leftover_noise=return_with_leftover_noise,
                                                   denoise=denoise, batch_seed_mode=batch_seed_mode, variation_seed=variation_seed,
                                                   variation_strength=variation_strength, noise_opt=noise_opt)[0]
        return (latent, vae)

```
