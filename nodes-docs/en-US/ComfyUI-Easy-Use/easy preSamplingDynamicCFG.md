---
tags:
- Sampling
---

# PreSampling (DynamicCFG)
## Documentation
- Class name: `easy preSamplingDynamicCFG`
- Category: `EasyUse/PreSampling`
- Output node: `True`

The 'easy preSamplingDynamicCFG' node is designed to apply dynamic control flow graph (CFG) based pre-sampling techniques to adjust the sampling process dynamically based on specified conditions. This node aims to enhance the quality and relevance of generated samples by adjusting the sampling parameters in real-time, leveraging advanced CFG techniques to optimize the sampling process.
## Input types
### Required
- **`pipe`**
    - Represents the pipeline through which the sampling process is executed, serving as the conduit for applying dynamic CFG adjustments.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `PipeLine`
- **`steps`**
    - Specifies the number of steps in the sampling process, directly influencing the granularity of the dynamic CFG adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Defines the configuration for the dynamic CFG adjustments, setting the intensity and scope of the sampling modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_mode`**
    - Determines the mode of CFG adjustments, influencing the overall strategy for dynamic sampling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cfg_scale_min`**
    - Establishes the minimum scale for CFG adjustments, setting a lower bound for the dynamic sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampler to be used, dictating the method of sampling within the dynamic CFG framework.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for the sampling process, coordinating the timing and sequence of dynamic CFG adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`denoise`**
    - Sets the level of denoising to be applied, affecting the clarity and quality of the sampled output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Provides a seed value for the sampling process, ensuring reproducibility and consistency in the dynamic CFG adjustments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_to_latent`**
    - Optional input that specifies an image to be converted into a latent representation for sampling.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`latent`**
    - Optional input that provides a latent representation to be used directly in the sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `Latent`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the modified pipeline after applying dynamic CFG-based pre-sampling, reflecting the adjusted sampling parameters.
    - Python dtype: `PipeLine`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class dynamicCFGSettings:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"pipe": ("PIPE_LINE",),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "cfg_mode": (DynThresh.Modes,),
                     "cfg_scale_min": ("FLOAT", {"default": 3.5, "min": 0.0, "max": 100.0, "step": 0.5}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                     },
                "optional":{
                    "image_to_latent": ("IMAGE",),
                    "latent": ("LATENT",)
                },
                "hidden":
                    {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def settings(self, pipe, steps, cfg, cfg_mode, cfg_scale_min,sampler_name, scheduler, denoise, seed, image_to_latent=None, latent=None, prompt=None, extra_pnginfo=None, my_unique_id=None):


        dynamic_thresh = DynThresh(7.0, 1.0,"CONSTANT", 0, cfg_mode, cfg_scale_min, 0, 0, 999, False,
                                   "MEAN", "AD", 1)

        def sampler_dyn_thresh(args):
            input = args["input"]
            cond = input - args["cond"]
            uncond = input - args["uncond"]
            cond_scale = args["cond_scale"]
            time_step = args["timestep"]
            dynamic_thresh.step = 999 - time_step[0]

            return input - dynamic_thresh.dynthresh(cond, uncond, cond_scale, None)

        model = pipe['model']

        m = model.clone()
        m.set_model_sampler_cfg_function(sampler_dyn_thresh)

        # 图生图转换
        vae = pipe["vae"]
        batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1
        if image_to_latent is not None:
            samples = {"samples": vae.encode(image_to_latent[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image_to_latent
        elif latent is not None:
            samples = RepeatLatentBatch().repeat(latent, batch_size)[0]
            images = pipe["images"]
        else:
            samples = pipe["samples"]
            images = pipe["images"]

        new_pipe = {
            "model": m,
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
                "denoise": denoise
            },
        }

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
