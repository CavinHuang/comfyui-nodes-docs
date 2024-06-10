---
tags:
- Sampling
---

# Unsampler
## Documentation
- Class name: `BNK_Unsampler`
- Category: `sampling`
- Output node: `False`

The Unsampler node is designed to reverse the sampling process in generative models, allowing for the manipulation or refinement of latent images through specific configurations and steps. It integrates with various sampling and scheduling strategies to achieve desired outcomes.
## Input types
### Required
- **`model`**
    - Specifies the generative model to be used for the unsampling process, central to determining the transformation applied to the latent image.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`steps`**
    - Defines the number of steps to execute in the unsampling process, directly impacting the extent of transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Specifies the final step at which the unsampling should conclude, allowing for partial unsampling sequences.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configuration parameter influencing the unsampling behavior, potentially adjusting aspects like strength or direction of the process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Determines the sampling strategy to be employed, affecting how the latent image is processed during unsampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Selects the scheduling algorithm to control the progression of steps in the unsampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normalize`**
    - Indicates whether to apply normalization to the latent image during unsampling, affecting the output's characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`positive`**
    - Positive conditioning text to guide the unsampling towards generating specific features or themes in the output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative conditioning text to steer the unsampling away from certain features or themes, refining the output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - The initial latent image to be transformed through the unsampling process, serving as the starting point.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The transformed latent image resulting from the unsampling process, reflecting the applied configurations and steps.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class Unsampler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                    "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    "end_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                    "cfg": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                    "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
                    "normalize": (["disable", "enable"], ),
                    "positive": ("CONDITIONING", ),
                    "negative": ("CONDITIONING", ),
                    "latent_image": ("LATENT", ),
                    }}
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "unsampler"

    CATEGORY = "sampling"
        
    def unsampler(self, model, cfg, sampler_name, steps, end_at_step, scheduler, normalize, positive, negative, latent_image):
        normalize = normalize == "enable"
        device = comfy.model_management.get_torch_device()
        latent = latent_image
        latent_image = latent["samples"]

        end_at_step = min(end_at_step, steps-1)
        end_at_step = steps - end_at_step
        
        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device="cpu")
        noise_mask = None
        if "noise_mask" in latent:
            noise_mask = comfy.sampler_helpers.prepare_mask(latent["noise_mask"], noise.shape, device)

        noise = noise.to(device)
        latent_image = latent_image.to(device)

        conds0 = \
            {"positive": comfy.sampler_helpers.convert_cond(positive),
             "negative": comfy.sampler_helpers.convert_cond(negative)}

        conds = {}
        for k in conds0:
            conds[k] = list(map(lambda a: a.copy(), conds0[k]))

        models, inference_memory = comfy.sampler_helpers.get_additional_models(conds, model.model_dtype())
        
        comfy.model_management.load_models_gpu([model] + models, model.memory_required(noise.shape) + inference_memory)

        sampler = comfy.samplers.KSampler(model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)

        sigmas = sampler.sigmas.flip(0) + 0.0001

        pbar = comfy.utils.ProgressBar(steps)
        def callback(step, x0, x, total_steps):
            pbar.update_absolute(step + 1, total_steps)

        samples = sampler.sample(noise, positive, negative, cfg=cfg, latent_image=latent_image, force_full_denoise=False, denoise_mask=noise_mask, sigmas=sigmas, start_step=0, last_step=end_at_step, callback=callback)
        if normalize:
            #technically doesn't normalize because unsampling is not guaranteed to end at a std given by the schedule
            samples -= samples.mean()
            samples /= samples.std()
        samples = samples.cpu()
        
        comfy.sampler_helpers.cleanup_additional_models(models)

        out = latent.copy()
        out["samples"] = samples
        return (out, )

```
