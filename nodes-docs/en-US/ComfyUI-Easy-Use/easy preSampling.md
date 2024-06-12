---
tags:
- Sampling
---

# PreSampling
## Documentation
- Class name: `easy preSampling`
- Category: `EasyUse/PreSampling`
- Output node: `True`

The 'easy preSampling' node is designed to facilitate the pre-sampling process in generative models, providing a simplified interface for configuring and executing pre-sampling operations. It abstracts the complexities involved in pre-sampling settings, allowing users to easily adjust parameters such as sampling steps, configuration gradients, and noise levels to influence the generation process.
## Input types
### Required
- **`pipe`**
    - The 'pipe' parameter represents the pipeline configuration, including model, sampler, and other settings, serving as the foundation for the pre-sampling process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`steps`**
    - Specifies the number of steps to be used in the pre-sampling process, affecting the detail and quality of the generated output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the configuration gradient, influencing the strength of the conditioning on the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Determines the sampling algorithm to be used, impacting the generation's diversity and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduling algorithm for the sampling process, affecting the progression of noise reduction.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Adjusts the denoising level applied during sampling, fine-tuning the clarity of the generated output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the random seed for the sampling process, ensuring reproducibility of the results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_to_latent`**
    - Optional parameter to provide an image for conversion to latent space, enabling direct manipulation of latent representations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`latent`**
    - Optional parameter to directly provide a latent representation for sampling, offering advanced control over the generation process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the updated pipeline configuration, including the results of the pre-sampling process and any modifications to the settings.
    - Python dtype: `Tuple[Dict[str, Any]]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class samplerSettings:

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
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                     },
                "optional": {
                    "image_to_latent": ("IMAGE",),
                    "latent": ("LATENT",),
                },
                "hidden":
                    {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("PIPE_LINE", )
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def settings(self, pipe, steps, cfg, sampler_name, scheduler, denoise, seed, image_to_latent=None, latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
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
                "denoise": denoise,
                "add_noise": "enabled"
            }
        }

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
