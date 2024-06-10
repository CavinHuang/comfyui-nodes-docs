---
tags:
- Sampling
---

# KSampler [pipe] (inspire)
## Documentation
- Class name: `KSamplerPipe __Inspire`
- Category: `InspirePack/a1111_compat`
- Output node: `False`

The KSamplerPipe node is designed to facilitate the generation of inspirational content through a specialized sampling process. It integrates advanced sampling techniques to produce creative and novel outputs, leveraging the Inspire Pack's capabilities to enhance the creative process.
## Input types
### Required
- **`basic_pipe`**
    - Represents the foundational components required for the sampling process, including models and configurations essential for generating the output.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`seed`**
    - Specifies the seed for the sampling process, ensuring reproducibility and control over the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps in the sampling process, affecting the depth and detail of the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configures the conditioning factor, influencing the creativity and coherence of the generated content.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to use, tailoring the sampling process to achieve desired effects.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, optimizing the generation flow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_image`**
    - Provides an initial latent image to be used as a starting point for the sampling process, enabling more targeted and specific content generation.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`denoise`**
    - Adjusts the level of denoising applied to the output, balancing between clarity and creative distortion.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mode`**
    - Specifies the mode of noise application, affecting the texture and overall appearance of the generated content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`batch_seed_mode`**
    - Defines the seed mode for batch processing, ensuring consistency and variability across generated outputs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`variation_seed`**
    - Optional seed for introducing variations, enhancing the diversity of the generated content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`variation_strength`**
    - Determines the strength of variations introduced, allowing for subtle to significant changes in the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the generated content, encapsulating the creative essence and potential for further processing.
    - Python dtype: `torch.Tensor`
- **`vae`**
    - Comfy dtype: `VAE`
    - The variational autoencoder used in the process, instrumental in transforming and refining the generated content.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSampler_inspire_pipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"basic_pipe": ("BASIC_PIPE",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "latent_image": ("LATENT", ),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("LATENT", "VAE")
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, basic_pipe, seed, steps, cfg, sampler_name, scheduler, latent_image, denoise, noise_mode, batch_seed_mode="comfy", variation_seed=None, variation_strength=None):
        model, clip, vae, positive, negative = basic_pipe
        latent = common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength)[0]
        return (latent, vae)

```
