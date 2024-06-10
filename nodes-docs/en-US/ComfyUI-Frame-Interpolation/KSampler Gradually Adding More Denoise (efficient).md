---
tags:
- Sampling
---

# KSampler Gradually Adding More Denoise (efficient)
## Documentation
- Class name: `KSampler Gradually Adding More Denoise (efficient)`
- Category: `ComfyUI-Frame-Interpolation/others`
- Output node: `True`

This node specializes in generating a sequence of samples by gradually increasing the denoising strength applied to a latent image. It leverages a common sampling function to produce a series of progressively denoised images, allowing for a controlled and incremental refinement of the generated content.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model used for the sampling process. It is crucial for determining the behavior and quality of the generated samples.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`positive`**
    - Positive conditioning information that guides the generation towards desired attributes or features in the output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`negative`**
    - Negative conditioning information used to steer the generation away from certain attributes or features, complementing the positive conditioning.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`latent_image`**
    - The initial latent representation of the image to be denoised. This serves as the starting point for the gradual denoising process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Dict[str, torch.Tensor]`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - The number of steps to take in the sampling process, affecting the granularity of the denoising progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - The CFG (Classifier-Free Guidance) scale, which adjusts the influence of conditioning information on the generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - The name of the sampler algorithm to use, which determines the specific approach to sampling and denoising.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - The scheduler determines the sequence of noise levels used throughout the sampling process, influencing the progression of denoising.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_denoise`**
    - The initial denoising strength, setting the starting point for the gradual increase in denoising.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise_increment`**
    - The amount by which the denoising strength is increased at each step, controlling the pace of the denoising progression.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise_increment_steps`**
    - The total number of steps over which the denoising strength is increased, defining the length of the gradual denoising process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_vae`**
    - An optional VAE (Variational Autoencoder) model that can be used in conjunction with the primary model for additional processing or refinement of the generated samples.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The neural network model used for the sampling process, returned unchanged.
    - Python dtype: `torch.nn.Module`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning information, returned unchanged.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning information, returned unchanged.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The final latent representation of the image after the gradual denoising process.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The optional VAE model, if used, returned unchanged.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Gradually_More_Denoise_KSampler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "latent_image": ("LATENT", ),

                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    
                    "start_denoise": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    "denoise_increment": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1.0, "step": 0.1}),
                    "denoise_increment_steps": ("INT", {"default": 20, "min": 1, "max": 10000})
                     },
                "optional": { "optional_vae": ("VAE",) }
                }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", )
    RETURN_NAMES = ("MODEL", "CONDITIONING+", "CONDITIONING-", "LATENT", "VAE", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "ComfyUI-Frame-Interpolation/others"

    def sample(self, model, positive, negative, latent_image, optional_vae, 
               seed, steps, cfg, sampler_name, scheduler,start_denoise, denoise_increment, denoise_increment_steps):
        if start_denoise + denoise_increment * denoise_increment_steps > 1.0:
            raise Exception(f"Max denoise strength can't over 1.0 (start_denoise={start_denoise}, denoise_increment={denoise_increment}, denoise_increment_steps={denoise_increment_steps}")

        copied_latent = latent_image.copy()
        out_samples = []
        
        for latent_sample in copied_latent["samples"]:
            latent = {"samples": einops.rearrange(latent_sample, "c h w -> 1 c h w")}
            #Latent's shape is NCHW
            gradually_denoising_samples = [
                common_ksampler(
                    model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent, denoise=start_denoise + denoise_increment * i
                )[0]["samples"]
                for i in range(denoise_increment_steps)
            ]
            out_samples.extend(gradually_denoising_samples)

        copied_latent["samples"] = torch.cat(out_samples, dim=0)
        return (model, positive, negative, copied_latent, optional_vae)

```
