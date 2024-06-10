---
tags:
- Sampling
---

# KSampler Advanced Progress (Inspire)
## Documentation
- Class name: `KSamplerAdvancedProgress __Inspire`
- Category: `InspirePack/analysis`
- Output node: `False`

This node is designed to progressively sample images using an advanced KSampler algorithm, tailored for the Inspire pack. It iteratively refines the image generation process, allowing for detailed adjustments and enhancements at each step, based on a set of input parameters and conditions.
## Input types
### Required
- **`model`**
    - The model parameter specifies the generative model to be used for sampling, playing a crucial role in determining the quality and style of the generated images.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`add_noise`**
    - Determines whether noise should be added at the start of the sampling process, affecting the initial state and potentially the diversity of the generated images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`noise_seed`**
    - Provides a seed for the noise generation, ensuring reproducibility and consistency in the images generated with added noise.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Specifies the number of steps to perform in the sampling process, directly influencing the refinement and detail of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration settings for the sampling process, allowing for customization of the generation according to specific requirements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `dict`
- **`sampler_name`**
    - Identifies the specific sampler algorithm to be used, enabling the selection of different sampling strategies within the advanced KSampler framework.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Defines the scheduling algorithm for controlling the sampling process, impacting the progression and quality of image generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Positive prompts or conditions to guide the image generation towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative prompts or conditions to steer the image generation away from certain attributes or themes, refining the output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - The initial latent image to start the sampling from, setting the baseline for the progressive refinement process.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
- **`start_at_step`**
    - The step at which to begin the sampling process, allowing for starting the refinement from a specific point in the generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - The final step at which the sampling process concludes, defining the extent of the progressive refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`noise_mode`**
    - Specifies the mode of noise application during the sampling process, affecting the texture and details of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`return_with_leftover_noise`**
    - Indicates whether to include leftover noise in the returned samples, potentially adding to the diversity and realism of the images.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`interval`**
    - The interval at which to capture and return intermediate samples, allowing for observation of the progression throughout the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`omit_start_latent`**
    - If set to true, the initial latent image is omitted from the results, focusing the output on the progression made during the sampling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`prev_progress_latent_opt`**
    - Optional previous progress latent to be concatenated with the current sampling results, enabling continuous progression across multiple sampling sessions.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The final latent image after the completion of the sampling process, representing the culmination of the progressive refinement.
    - Python dtype: `dict`
- **`progress_latent`**
    - Comfy dtype: `LATENT`
    - A collection of latent images captured at specified intervals during the sampling process, showcasing the progression and evolution of the image generation.
    - Python dtype: `dict`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvanced_progress(a1111_compat.KSamplerAdvanced_inspire):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "latent_image": ("LATENT", ),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "return_with_leftover_noise": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                     "interval": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "omit_start_latent": ("BOOLEAN", {"default": False, "label_on": "True", "label_off": "False"}),
                     },
                "optional": {"prev_progress_latent_opt": ("LATENT",), }
                }

    FUNCTION = "sample"

    CATEGORY = "InspirePack/analysis"

    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("latent", "progress_latent")

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, interval, omit_start_latent, prev_progress_latent_opt=None):
        sampler = a1111_compat.KSamplerAdvanced_inspire()

        if omit_start_latent:
            result = []
        else:
            result = [latent_image['samples']]

        for i in range(start_at_step, min(end_at_step+1, steps+1)):
            cur_add_noise = i == start_at_step and add_noise
            cur_return_with_leftover_noise = i != steps or return_with_leftover_noise
            latent_image = sampler.sample(model, cur_add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, i, i+1, noise_mode, cur_return_with_leftover_noise)[0]
            if i % interval == 0 or i == steps:
                result.append(latent_image['samples'])

        if len(result) > 0:
            result = torch.cat(result)
            result = {'samples': result}
        else:
            result = latent_image

        if prev_progress_latent_opt is not None:
            result['samples'] = torch.cat((prev_progress_latent_opt['samples'], result['samples']), dim=0)

        return (latent_image, result)

```
