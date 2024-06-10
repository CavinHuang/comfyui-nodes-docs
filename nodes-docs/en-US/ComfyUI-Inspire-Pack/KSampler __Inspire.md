---
tags:
- Sampling
---

# KSampler (inspire)
## Documentation
- Class name: `KSampler __Inspire`
- Category: `InspirePack/a1111_compat`
- Output node: `False`

The KSampler __Inspire node is designed to facilitate the generation of creative content by sampling from a model in a manner that is inspired by specific inputs. It abstracts the complexity of sampling algorithms, providing an interface for generating novel outputs based on positive and negative prompts, style guidance, and other parameters.
## Input types
### Required
- **`model`**
    - Specifies the model from which to sample, serving as the foundation for generating outputs.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`seed`**
    - Sets the initial seed for random number generation, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps to perform in the sampling process, affecting the detail and quality of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configures the conditioning-free guidance scale, influencing the strength of the conditioning on the generation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampling algorithm to use, tailoring the generation process to the desired characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, further customizing the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Specifies the positive conditioning to guide the generation towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Defines the negative conditioning that the generation should avoid, steering the output away from undesired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - Provides an initial latent image to be modified or enhanced through the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the level of denoising applied during the generation, affecting the clarity and coherence of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mode`**
    - Selects the mode of noise application, influencing the texture and details of the generated output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_seed_mode`**
    - Determines the mode for seed generation and application throughout the batch processing, affecting the variability of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`variation_seed`**
    - Specifies a seed for introducing variations, adding an additional layer of randomness to the generation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`variation_strength`**
    - Controls the strength of the variations introduced by the variation seed, influencing the diversity of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Produces a latent representation of the generated content, encapsulating the desired attributes influenced by the input conditioning.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class KSampler_inspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "latent_image": ("LATENT", ),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, batch_seed_mode="comfy", variation_seed=None, variation_strength=None):
        return common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength)

```
