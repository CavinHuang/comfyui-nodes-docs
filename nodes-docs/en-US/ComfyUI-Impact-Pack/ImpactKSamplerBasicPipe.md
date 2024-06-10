---
tags:
- Sampling
---

# KSampler (pipe)
## Documentation
- Class name: `ImpactKSamplerBasicPipe`
- Category: `sampling`
- Output node: `False`

The ImpactKSamplerBasicPipe node is designed for sampling operations within a basic pipeline, utilizing a variety of samplers and schedulers to process and transform latent images. It encapsulates the complexity of sampling algorithms, providing a streamlined interface for generating or modifying latent representations based on specified configurations and inputs.
## Input types
### Required
- **`basic_pipe`**
    - Represents the core components required for the sampling process, including models and configurations essential for the operation.
    - Comfy dtype: `BASIC_PIPE`
    - Python dtype: `tuple`
- **`seed`**
    - Determines the randomness seed for sampling, affecting the reproducibility and variation of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Specifies the number of steps to perform in the sampling process, impacting the detail and quality of the generated latent image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the configuration for the sampling algorithm, influencing the behavior and outcomes of the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to use, allowing for customization of the sampling technique.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling process, affecting the progression and adaptation of sampling steps.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_image`**
    - The initial latent image to be processed or transformed by the sampling operation.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`denoise`**
    - Adjusts the level of denoising applied to the latent image, fine-tuning the clarity and quality of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`basic_pipe`**
    - Comfy dtype: `BASIC_PIPE`
    - Returns the basic pipeline components, including the model and configurations used in the sampling process.
    - Python dtype: `tuple`
- **`latent`**
    - Comfy dtype: `LATENT`
    - The processed or transformed latent image resulting from the sampling operation.
    - Python dtype: `torch.Tensor`
- **`vae`**
    - Comfy dtype: `VAE`
    - The variational autoencoder used in the process, essential for encoding and decoding latent images.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - Reroute
    - [ImpactKSamplerBasicPipe](../../ComfyUI-Impact-Pack/Nodes/ImpactKSamplerBasicPipe.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)



## Source code
```python
class KSamplerBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"basic_pipe": ("BASIC_PIPE",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (core.SCHEDULERS, ),
                     "latent_image": ("LATENT", ),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("BASIC_PIPE", "LATENT", "VAE")
    FUNCTION = "sample"

    CATEGORY = "sampling"

    def sample(self, basic_pipe, seed, steps, cfg, sampler_name, scheduler, latent_image, denoise=1.0):
        model, clip, vae, positive, negative = basic_pipe
        latent = impact_sample(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise)
        return basic_pipe, latent, vae

```
