---
tags:
- Sampling
---

# SamplerCustomAdvanced
## Documentation
- Class name: `SamplerCustomAdvanced`
- Category: `sampling/custom_sampling`
- Output node: `False`

The SamplerCustomAdvanced node is designed to provide advanced custom sampling functionalities within a generative modeling framework. It enables the creation and utilization of custom samplers, offering a flexible approach to sampling strategies that can be tailored to specific needs or experimental setups.
## Input types
### Required
- **`noise`**
    - Specifies the type of noise to be added to the latent image, affecting the variability and characteristics of the generated samples.
    - Comfy dtype: `NOISE`
    - Python dtype: `Noise`
- **`guider`**
    - Defines the guiding mechanism for the sampling process, influencing the direction and quality of the generated outputs based on specified conditions.
    - Comfy dtype: `GUIDER`
    - Python dtype: `Guider`
- **`sampler`**
    - Determines the sampling strategy to be used, impacting the exploration of the latent space and the diversity of the generated samples.
    - Comfy dtype: `SAMPLER`
    - Python dtype: `Sampler`
- **`sigmas`**
    - Sets the scale of noise to be applied, playing a crucial role in the denoising process and the final quality of the generated images.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `List[float]`
- **`latent_image`**
    - The initial latent representation to be transformed, serving as the starting point for the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Latent`
## Output types
- **`output`**
    - Comfy dtype: `LATENT`
    - The modified latent representation after the sampling process.
    - Python dtype: `Latent`
- **`denoised_output`**
    - Comfy dtype: `LATENT`
    - The denoised version of the latent representation, offering a cleaner version of the sampled output.
    - Python dtype: `Latent`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SamplerCustomAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"noise": ("NOISE", ),
                    "guider": ("GUIDER", ),
                    "sampler": ("SAMPLER", ),
                    "sigmas": ("SIGMAS", ),
                    "latent_image": ("LATENT", ),
                     }
                }

    RETURN_TYPES = ("LATENT","LATENT")
    RETURN_NAMES = ("output", "denoised_output")

    FUNCTION = "sample"

    CATEGORY = "sampling/custom_sampling"

    def sample(self, noise, guider, sampler, sigmas, latent_image):
        latent = latent_image
        latent_image = latent["samples"]

        noise_mask = None
        if "noise_mask" in latent:
            noise_mask = latent["noise_mask"]

        x0_output = {}
        callback = latent_preview.prepare_callback(guider.model_patcher, sigmas.shape[-1] - 1, x0_output)

        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = guider.sample(noise.generate_noise(latent), latent_image, sampler, sigmas, denoise_mask=noise_mask, callback=callback, disable_pbar=disable_pbar, seed=noise.seed)
        samples = samples.to(comfy.model_management.intermediate_device())

        out = latent.copy()
        out["samples"] = samples
        if "x0" in x0_output:
            out_denoised = latent.copy()
            out_denoised["samples"] = guider.model_patcher.model.process_latent_out(x0_output["x0"].cpu())
        else:
            out_denoised = out
        return (out, out_denoised)

```
