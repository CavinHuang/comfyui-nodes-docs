---
tags:
- Sampling
---

# SamplerCustom
## Documentation
- Class name: `SamplerCustom`
- Category: `sampling/custom_sampling`
- Output node: `False`

The SamplerCustom node is designed to provide a customizable sampling framework within a generative model pipeline, allowing for the integration of various sampling strategies and configurations to tailor the generation process according to specific requirements or preferences.
## Input types
### Required
- **`model`**
    - Specifies the generative model to be used for sampling, serving as the foundation for the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`add_noise`**
    - Determines whether noise should be added to the sampling process, affecting the texture and details of the generated output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_seed`**
    - Sets the seed for noise generation, ensuring consistency in the noise pattern when adding noise to the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, adjusting the influence of specified conditions on the generation outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive`**
    - Specifies positive conditioning to guide the generation towards desired attributes or content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Specifies negative conditioning to steer the generation away from undesired attributes or content.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`sampler`**
    - Selects the specific sampling strategy to be employed, allowing for customization of the sampling behavior.
    - Comfy dtype: `SAMPLER`
    - Python dtype: `str`
- **`sigmas`**
    - Defines the noise levels to be used at each step of the sampling process, influencing the detail and quality of the generated output.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `list`
- **`latent_image`**
    - Provides the initial latent image to be transformed through the sampling process, serving as the starting point for generation.
    - Comfy dtype: `LATENT`
    - Python dtype: `str`
## Output types
- **`output`**
    - Comfy dtype: `LATENT`
    - Produces a latent representation of the generated content, encapsulating the result of the sampling process.
    - Python dtype: `str`
- **`denoised_output`**
    - Comfy dtype: `LATENT`
    - Provides a denoised version of the generated content, offering an alternative representation with potentially clearer details.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [Preview Chooser](../../cg-image-picker/Nodes/Preview Chooser.md)
    - [LatentUpscaleBy](../../Comfy/Nodes/LatentUpscaleBy.md)



## Source code
```python
class SamplerCustom:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "add_noise": ("BOOLEAN", {"default": True}),
                    "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "sampler": ("SAMPLER", ),
                    "sigmas": ("SIGMAS", ),
                    "latent_image": ("LATENT", ),
                     }
                }

    RETURN_TYPES = ("LATENT","LATENT")
    RETURN_NAMES = ("output", "denoised_output")

    FUNCTION = "sample"

    CATEGORY = "sampling/custom_sampling"

    def sample(self, model, add_noise, noise_seed, cfg, positive, negative, sampler, sigmas, latent_image):
        latent = latent_image
        latent_image = latent["samples"]
        if not add_noise:
            noise = Noise_EmptyNoise().generate_noise(latent)
        else:
            noise = Noise_RandomNoise(noise_seed).generate_noise(latent)

        noise_mask = None
        if "noise_mask" in latent:
            noise_mask = latent["noise_mask"]

        x0_output = {}
        callback = latent_preview.prepare_callback(model, sigmas.shape[-1] - 1, x0_output)

        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = comfy.sample.sample_custom(model, noise, cfg, sampler, sigmas, positive, negative, latent_image, noise_mask=noise_mask, callback=callback, disable_pbar=disable_pbar, seed=noise_seed)

        out = latent.copy()
        out["samples"] = samples
        if "x0" in x0_output:
            out_denoised = latent.copy()
            out_denoised["samples"] = model.model.process_latent_out(x0_output["x0"].cpu())
        else:
            out_denoised = out
        return (out, out_denoised)

```
