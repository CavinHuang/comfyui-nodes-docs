---
tags:
- Sampling
---

# PreSampling (Advanced)
## Documentation
- Class name: `easy preSamplingAdvanced`
- Category: `EasyUse/PreSampling`
- Output node: `True`

This node facilitates advanced pre-sampling operations within a generative pipeline, offering customizable settings for fine-tuning the sampling process. It allows for the adjustment of various parameters to optimize the generation of images or other media, catering to specific needs or experimental setups.
## Input types
### Required
- **`pipe`**
    - Represents the generative pipeline through which the data flows, serving as the foundation for the pre-sampling process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict`
- **`steps`**
    - Specifies the number of steps to be taken in the sampling process, affecting the granularity and quality of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, influencing the adherence of the generated output to the given conditions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampling algorithm to be used, allowing for customization of the sampling behavior.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduling algorithm for the sampling process, affecting the progression of steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_at_step`**
    - Defines the starting step for the sampling process, allowing for control over the phase of generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Sets the ending step for the sampling process, determining the final phase of generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`add_noise`**
    - Enables or disables the addition of noise during the sampling process, affecting the texture and details of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`seed`**
    - Sets the initial seed for the random number generator, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`return_with_leftover_noise`**
    - Determines whether to return the output with leftover noise, impacting the visual characteristics of the generated media.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`image_to_latent`**
    - Optionally converts an image to a latent representation, integrating it into the pre-sampling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Image]`
- **`latent`**
    - Optionally provides a latent representation to be used directly in the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Optional[Latent]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the enhanced generative pipeline, enriched with the applied pre-sampling configurations.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class samplerSettingsAdvanced:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"pipe": ("PIPE_LINE",),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS + ['align_your_steps'],),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "add_noise": (["enable", "disable"],),
                     "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                     "return_with_leftover_noise": (["disable", "enable"], ),
                     },
                "optional": {
                    "image_to_latent": ("IMAGE",),
                    "latent": ("LATENT",)
                },
                "hidden":
                    {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("PIPE_LINE", )
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def settings(self, pipe, steps, cfg, sampler_name, scheduler, start_at_step, end_at_step, add_noise, seed, return_with_leftover_noise, image_to_latent=None, latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        # 图生图转换
        vae = pipe["vae"]
        batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1
        if image_to_latent is not None:
            samples = {"samples": vae.encode(image_to_latent[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image_to_latent
        elif latent is not None:
            samples = latent
            images = pipe["images"]
        else:
            samples = pipe["samples"]
            images = pipe["images"]

        force_full_denoise = True
        if return_with_leftover_noise == "enable":
            force_full_denoise = False

        new_pipe = {
            "model": pipe['model'],
            "positive": pipe['positive'],
            "negative": pipe['negative'],
            "vae": pipe['vae'],
            "clip": pipe['clip'],

            "samples": samples,
            "images": images,
            "seed": seed,

            "loader_settings": {
                **pipe["loader_settings"],
                "steps": steps,
                "cfg": cfg,
                "sampler_name": sampler_name,
                "scheduler": scheduler,
                "start_step": start_at_step,
                "last_step": end_at_step,
                "denoise": 1.0,
                "add_noise": add_noise,
                "force_full_denoise": force_full_denoise
            }
        }

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
