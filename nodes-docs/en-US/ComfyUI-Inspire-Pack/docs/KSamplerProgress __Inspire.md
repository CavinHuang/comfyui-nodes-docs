---
tags:
- Sampling
---

# KSampler Progress (Inspire)
## Documentation
- Class name: `KSamplerProgress __Inspire`
- Category: `InspirePack/analysis`
- Output node: `False`

The KSamplerProgressInspire node is designed to iteratively sample and refine latent images over a series of steps, allowing for progressive visualization of the sampling process. It leverages advanced sampling techniques to enhance the quality and diversity of generated images, catering to applications that require detailed image progression analysis.
## Input types
### Required
- **`model`**
    - Specifies the model used for sampling, central to determining the characteristics and quality of the generated images.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`seed`**
    - Defines the seed for noise generation, ensuring reproducibility and consistency in the sampling outcomes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps in the sampling process, directly influencing the refinement and progression of the latent image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration settings for the sampling process, tailoring the behavior and parameters of the sampler.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampler to use, affecting the sampling strategy and resultant image characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for controlling the sampling process, impacting the progression and quality of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Positive prompts guiding the sampling towards desired image attributes, enhancing relevance and specificity.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative prompts used to steer away the sampling from undesired image attributes, refining the output quality.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - The initial latent image to be refined through the sampling process, serving as the starting point for progression.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`denoise`**
    - Specifies the denoising factor applied during the sampling process, affecting the clarity and detail of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_mode`**
    - The mode of noise application during sampling, influencing the texture and detail of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`interval`**
    - The interval at which to capture and return latent images, facilitating progressive visualization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`omit_start_latent`**
    - Indicates whether to exclude the starting latent image from the results, allowing for flexibility in the progression output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The final latent image after the completion of the sampling process, representing the culmination of the progressive refinement.
    - Python dtype: `dict`
- **`progress_latent`**
    - Comfy dtype: `LATENT`
    - A collection of latent images captured at specified intervals during the sampling process, illustrating the progression of image refinement.
    - Python dtype: `dict`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSampler_progress(a1111_compat.KSampler_inspire):
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
                     "interval": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "omit_start_latent": ("BOOLEAN", {"default": True, "label_on": "True", "label_off": "False"}),
                     }
                }

    CATEGORY = "InspirePack/analysis"

    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("latent", "progress_latent")

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, interval, omit_start_latent):
        adv_steps = int(steps / denoise)

        sampler = a1111_compat.KSamplerAdvanced_inspire()

        if omit_start_latent:
            result = []
        else:
            result = [latent_image['samples']]

        for i in range(0, adv_steps+1):
            add_noise = i == 0
            return_with_leftover_noise = i != adv_steps
            latent_image = sampler.sample(model, add_noise, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, i, i+1, noise_mode, return_with_leftover_noise)[0]
            if i % interval == 0 or i == adv_steps:
                result.append(latent_image['samples'])

        if len(result) > 0:
            result = torch.cat(result)
            result = {'samples': result}
        else:
            result = latent_image

        return (latent_image, result)

```
