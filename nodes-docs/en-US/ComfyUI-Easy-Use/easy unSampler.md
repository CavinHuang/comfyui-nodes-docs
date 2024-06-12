---
tags:
- Sampling
---

# EasyUnSampler
## Documentation
- Class name: `easy unSampler`
- Category: `EasyUse/Sampler`
- Output node: `False`

The `easy unSampler` node is designed for the reverse sampling process in generative models, allowing for the exploration of latent spaces and the refinement of generated images by stepping back through the model's layers. It provides a flexible interface for adjusting the sampling parameters and integrating with different sampler and scheduler types.
## Input types
### Required
- **`steps`**
    - Specifies the number of steps to take in the reverse sampling process, affecting the granularity of the exploration or refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_at_step`**
    - Determines the final step of the reverse sampling process, enabling partial reversals and targeted refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Controls the conditioning factor, influencing the strength of conditioning on the input prompt or image features during reverse sampling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to use for the reverse sampling process, allowing for customization of the sampling strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling steps, impacting the progression and dynamics of the reverse sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`normalize`**
    - Enables or disables normalization, affecting the handling of input data and the stability of the reverse sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
### Optional
- **`pipe`**
    - The pipeline configuration for the reverse sampling process, including model and conditioning settings.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`optional_model`**
    - Optionally specifies a model to use for the reverse sampling, overriding the default.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`optional_positive`**
    - Optionally adds positive conditioning to the reverse sampling process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`optional_negative`**
    - Optionally adds negative conditioning to the reverse sampling process.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`optional_latent`**
    - Optionally specifies a latent representation to use as a starting point for the reverse sampling.
    - Comfy dtype: `LATENT`
    - Python dtype: `dict`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the modified pipeline after the reverse sampling process, including any changes to the latent space or generated images.
    - Python dtype: `dict`
- **`latent`**
    - Comfy dtype: `LATENT`
    - Outputs the latent representation obtained or modified during the reverse sampling process, providing insight into the model's internal state.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class unsampler:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
             "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
             "end_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
             "cfg": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0}),
             "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
             "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
             "normalize": (["disable", "enable"],),

             },
            "optional": {
                "pipe": ("PIPE_LINE",),
                "optional_model": ("MODEL",),
                "optional_positive": ("CONDITIONING",),
                "optional_negative": ("CONDITIONING",),
                "optional_latent": ("LATENT",),
            }
        }

    RETURN_TYPES = ("PIPE_LINE", "LATENT",)
    RETURN_NAMES = ("pipe", "latent",)
    FUNCTION = "unsampler"

    CATEGORY = "EasyUse/Sampler"

    def unsampler(self, cfg, sampler_name, steps, end_at_step, scheduler, normalize, pipe=None, optional_model=None, optional_positive=None, optional_negative=None,
                  optional_latent=None):

        model = optional_model if optional_model is not None else pipe["model"]
        positive = optional_positive if optional_positive is not None else pipe["positive"]
        negative = optional_negative if optional_negative is not None else pipe["negative"]
        latent_image = optional_latent if optional_latent is not None else pipe["samples"]

        normalize = normalize == "enable"
        device = comfy.model_management.get_torch_device()
        latent = latent_image
        latent_image = latent["samples"]

        end_at_step = min(end_at_step, steps - 1)
        end_at_step = steps - end_at_step

        noise = torch.zeros(latent_image.size(), dtype=latent_image.dtype, layout=latent_image.layout, device="cpu")
        noise_mask = None
        if "noise_mask" in latent:
            noise_mask = comfy.sample.prepare_mask(latent["noise_mask"], noise.shape, device)


        noise = noise.to(device)
        latent_image = latent_image.to(device)

        _positive = comfy.sampler_helpers.convert_cond(positive)
        _negative = comfy.sampler_helpers.convert_cond(negative)
        models, inference_memory = comfy.sampler_helpers.get_additional_models({"positive": _positive, "negative": _negative}, model.model_dtype())


        comfy.model_management.load_models_gpu([model] + models, model.memory_required(noise.shape) + inference_memory)

        model_patcher = comfy.model_patcher.ModelPatcher(model.model, load_device=device, offload_device=comfy.model_management.unet_offload_device())

        sampler = comfy.samplers.KSampler(model_patcher, steps=steps, device=device, sampler=sampler_name,
                                          scheduler=scheduler, denoise=1.0, model_options=model.model_options)

        sigmas = sampler.sigmas.flip(0) + 0.0001

        pbar = comfy.utils.ProgressBar(steps)

        def callback(step, x0, x, total_steps):
            pbar.update_absolute(step + 1, total_steps)

        samples = sampler.sample(noise, positive, negative, cfg=cfg, latent_image=latent_image,
                                 force_full_denoise=False, denoise_mask=noise_mask, sigmas=sigmas, start_step=0,
                                 last_step=end_at_step, callback=callback)
        if normalize:
            # technically doesn't normalize because unsampling is not guaranteed to end at a std given by the schedule
            samples -= samples.mean()
            samples /= samples.std()
        samples = samples.cpu()

        comfy.sample.cleanup_additional_models(models)

        out = latent.copy()
        out["samples"] = samples

        if pipe is None:
            pipe = {}

        new_pipe = {
            **pipe,
            "samples": out
        }

        return (new_pipe, out,)

```
