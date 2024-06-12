---
tags:
- Sampling
---

# KSampler
## Documentation
- Class name: `KSampler`
- Category: `sampling`
- Output node: `False`

The KSampler node is designed for advanced sampling operations within generative models, allowing for the customization of sampling processes through various parameters. It facilitates the generation of new data samples by manipulating latent space representations, leveraging conditioning, and adjusting noise levels.
## Input types
### Required
- **`model`**
    - Specifies the generative model to be used for sampling, playing a crucial role in determining the characteristics of the generated samples.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`seed`**
    - Controls the randomness of the sampling process, ensuring reproducibility of results when set to a specific value.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Determines the number of steps to be taken in the sampling process, affecting the detail and quality of the generated samples.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Adjusts the conditioning factor, influencing the direction and strength of the conditioning applied during sampling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampling algorithm to be used, impacting the behavior and outcome of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduling algorithm for controlling the sampling process, affecting the progression and dynamics of sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Defines positive conditioning to guide the sampling towards desired attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
- **`negative`**
    - Specifies negative conditioning to steer the sampling away from certain attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `dict`
- **`latent_image`**
    - Provides a latent space representation to be used as a starting point or reference for the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`denoise`**
    - Controls the level of denoising applied to the samples, affecting the clarity and sharpness of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - Represents the latent space output of the sampling process, encapsulating the generated samples.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [LatentUpscaleBy](../../Comfy/Nodes/LatentUpscaleBy.md)
    - [VAEDecodeTiled](../../Comfy/Nodes/VAEDecodeTiled.md)
    - Reroute
    - [LatentComposite](../../Comfy/Nodes/LatentComposite.md)
    - NNLatentUpscale
    - [LatentUpscale](../../Comfy/Nodes/LatentUpscale.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - workflow/front
    - SetNode



## Source code
```python
class KSampler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.1, "round": 0.01}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "latent_image": ("LATENT", ),
                    "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "sampling"

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=1.0):
        return common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise=denoise)

```
