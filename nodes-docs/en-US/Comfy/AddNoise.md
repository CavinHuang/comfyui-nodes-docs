---
tags:
- LatentNoise
- Noise
---

# AddNoise
## Documentation
- Class name: `AddNoise`
- Category: `_for_testing/custom_sampling/noise`
- Output node: `False`

The AddNoise node introduces controlled noise to latent images in a generative model's sampling process, enhancing the diversity or realism of generated samples.
## Input types
### Required
- **`model`**
    - The generative model for which noise is being added. It plays a crucial role in the noise addition process by providing model-specific operations for processing latent images.
    - Comfy dtype: `MODEL`
    - Python dtype: `object`
- **`noise`**
    - A noise generator object responsible for creating noise to be added to the latent images.
    - Comfy dtype: `NOISE`
    - Python dtype: `object`
- **`sigmas`**
    - A sequence of sigma values determining the scale of noise to be added. It influences the intensity and variation of the noise applied.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `torch.Tensor`
- **`latent_image`**
    - The latent image to which noise will be added. It serves as the base for noise application, affecting the final output.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The modified latent image after noise has been added, reflecting the impact of the noise addition process.
    - Python dtype: `Tuple[Dict[str, torch.Tensor]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AddNoise:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "noise": ("NOISE", ),
                     "sigmas": ("SIGMAS", ),
                     "latent_image": ("LATENT", ),
                     }
                }

    RETURN_TYPES = ("LATENT",)

    FUNCTION = "add_noise"

    CATEGORY = "_for_testing/custom_sampling/noise"

    def add_noise(self, model, noise, sigmas, latent_image):
        if len(sigmas) == 0:
            return latent_image

        latent = latent_image
        latent_image = latent["samples"]

        noisy = noise.generate_noise(latent)

        model_sampling = model.get_model_object("model_sampling")
        process_latent_out = model.get_model_object("process_latent_out")
        process_latent_in = model.get_model_object("process_latent_in")

        if len(sigmas) > 1:
            scale = torch.abs(sigmas[0] - sigmas[-1])
        else:
            scale = sigmas[0]

        if torch.count_nonzero(latent_image) > 0: #Don't shift the empty latent image.
            latent_image = process_latent_in(latent_image)
        noisy = model_sampling.noise_scaling(scale, noisy, latent_image)
        noisy = process_latent_out(noisy)
        noisy = torch.nan_to_num(noisy, nan=0.0, posinf=0.0, neginf=0.0)

        out = latent.copy()
        out["samples"] = noisy
        return (out,)

```
