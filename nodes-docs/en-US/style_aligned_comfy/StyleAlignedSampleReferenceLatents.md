---
tags:
- Sampling
---

# StyleAligned Sample Reference Latents
## Documentation
- Class name: `StyleAlignedSampleReferenceLatents`
- Category: `style_aligned`
- Output node: `False`

This node is designed to sample reference latents in a style-aligned manner, capturing the essence of a given style through the manipulation of latents. It focuses on generating a set of reference latents that are aligned with the desired style attributes, facilitating the creation of content that is stylistically coherent.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model that will be used for sampling. It is crucial for defining the architecture and parameters that will be utilized in the generation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `ModelPatcher`
- **`noise_seed`**
    - The noise_seed parameter is used to initialize the random noise generation, ensuring reproducibility and consistency in the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - This parameter specifies the configuration settings for the sampling process, dictating how the model should interpret and manipulate the input latents.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive`**
    - The positive parameter indicates the positive guidance text or attributes that should be emphasized in the generated content, steering the style alignment towards these characteristics.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - The negative parameter specifies the negative guidance text or attributes that should be minimized or avoided in the generated content, helping to refine the style alignment by excluding undesired elements.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`sampler`**
    - The sampler parameter determines the specific sampling strategy or algorithm to be used in generating the reference latents, affecting the diversity and quality of the output.
    - Comfy dtype: `SAMPLER`
    - Python dtype: `Sampler`
- **`sigmas`**
    - The sigmas parameter controls the variance of the noise added during the sampling process, influencing the exploration of the latent space and the resulting style alignment.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `torch.Tensor`
- **`latent_image`**
    - This parameter represents the initial latent image that serves as a starting point for the sampling process, providing a basis for the generation and alignment of reference latents.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
## Output types
- **`ref_latents`**
    - Comfy dtype: `STEP_LATENTS`
    - The ref_latents output contains the generated reference latents that are aligned with the specified style, ready for further processing or utilization.
    - Python dtype: `torch.Tensor`
- **`noised_output`**
    - Comfy dtype: `LATENT`
    - The noised_output includes the noised version of the generated latents, offering an alternative representation of the style-aligned reference latents.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class StyleAlignedSampleReferenceLatents:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "sampler": ("SAMPLER", ),
                    "sigmas": ("SIGMAS", ),
                    "latent_image": ("LATENT", ),
                     }
                }

    RETURN_TYPES = ("STEP_LATENTS","LATENT")
    RETURN_NAMES = ("ref_latents", "noised_output")

    FUNCTION = "sample"

    CATEGORY = "style_aligned"

    def sample(self, model, noise_seed, cfg, positive, negative, sampler, sigmas, latent_image):
        sigmas = sigmas.flip(0)
        if sigmas[0] == 0:
            sigmas[0] = 0.0001

        latent = latent_image
        latent_image = latent["samples"]
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device="cpu")

        noise_mask = None
        if "noise_mask" in latent:
            noise_mask = latent["noise_mask"]

        ref_latents = []
        def callback(step: int, x0: T, x: T, steps: int):
            ref_latents.insert(0, x[0])
        
        disable_pbar = not comfy.utils.PROGRESS_BAR_ENABLED
        samples = comfy.sample.sample_custom(model, noise, cfg, sampler, sigmas, positive, negative, latent_image, noise_mask=noise_mask, callback=callback, disable_pbar=disable_pbar, seed=noise_seed)

        out = latent.copy()
        out["samples"] = samples
        out_noised = out

        ref_latents = torch.stack(ref_latents)

        return (ref_latents, out_noised)

```
