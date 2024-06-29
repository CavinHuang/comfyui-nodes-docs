---
tags:
- Sampling
---

# PreSampling (SDTurbo)
## Documentation
- Class name: `easy preSamplingSdTurbo`
- Category: `EasyUse/PreSampling`
- Output node: `True`

The `easy preSamplingSdTurbo` node is designed to facilitate the pre-sampling process for image generation tasks, leveraging the SDTurbo scheduler for efficient sampling. It integrates various components such as model selection, step configuration, and denoise settings to prepare and optimize the sampling pipeline, aiming to enhance the quality and efficiency of generated images.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration to be used for pre-sampling, including model, sampling steps, and other relevant settings.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict`
- **`steps`**
    - Determines the number of steps to be used in the SDTurbo scheduler for the sampling process, affecting the detail and quality of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - Configures the conditioning factor for the sampling process, influencing the adherence to the input conditions and the overall image quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to be used in conjunction with the SDTurbo scheduler, impacting the sampling strategy and output characteristics.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`eta`**
    - Adjusts the eta parameter for the sampling process, influencing the randomness and variability of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`s_noise`**
    - Specifies the seed noise level for the sampling process, affecting the initial randomness of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`upscale_ratio`**
    - Determines the upscale ratio for image enhancement during the pre-sampling process, affecting the resolution and clarity of the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_step`**
    - Specifies the starting step for the sampling process, allowing for finer control over the generation progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_step`**
    - Defines the end step for the sampling process, setting the limit for the generation progression.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`upscale_n_step`**
    - Sets the number of steps for the upscaling process, affecting the detail and quality of the upscaled images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`unsharp_kernel_size`**
    - Configures the kernel size for the unsharp mask applied during image enhancement, affecting the sharpness and clarity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`unsharp_sigma`**
    - Sets the sigma value for the unsharp mask, influencing the edge enhancement during the image upscaling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`unsharp_strength`**
    - Adjusts the strength of the unsharp mask, fine-tuning the contrast and detail enhancement during upscaling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`seed`**
    - Sets the random seed for the sampling process, ensuring reproducibility of the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the modified pipeline configuration after the pre-sampling process, including updated model, sampling settings, and generated samples.
    - Python dtype: `Dict`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class sdTurboSettings:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
                    "pipe": ("PIPE_LINE",),
                    "steps": ("INT", {"default": 1, "min": 1, "max": 10}),
                    "cfg": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 100.0}),
                    "sampler_name": (comfy.samplers.SAMPLER_NAMES,),
                    "eta": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01, "round": False}),
                    "s_noise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01, "round": False}),
                    "upscale_ratio": ("FLOAT", {"default": 2.0, "min": 0.0, "max": 16.0, "step": 0.01, "round": False}),
                    "start_step": ("INT", {"default": 5, "min": 0, "max": 1000, "step": 1}),
                    "end_step": ("INT", {"default": 15, "min": 0, "max": 1000, "step": 1}),
                    "upscale_n_step": ("INT", {"default": 3, "min": 0, "max": 1000, "step": 1}),
                    "unsharp_kernel_size": ("INT", {"default": 3, "min": 1, "max": 21, "step": 1}),
                    "unsharp_sigma": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 10.0, "step": 0.01, "round": False}),
                    "unsharp_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 10.0, "step": 0.01, "round": False}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
               },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def settings(self, pipe, steps, cfg, sampler_name, eta, s_noise, upscale_ratio, start_step, end_step, upscale_n_step, unsharp_kernel_size, unsharp_sigma, unsharp_strength, seed, prompt=None, extra_pnginfo=None, my_unique_id=None):
        model = pipe['model']
        # sigma
        timesteps = torch.flip(torch.arange(1, 11) * 100 - 1, (0,))[:steps]
        sigmas = model.model.model_sampling.sigma(timesteps)
        sigmas = torch.cat([sigmas, sigmas.new_zeros([1])])

        #sampler
        sample_function = None
        extra_options = {
                "eta": eta,
                "s_noise": s_noise,
                "upscale_ratio": upscale_ratio,
                "start_step": start_step,
                "end_step": end_step,
                "upscale_n_step": upscale_n_step,
                "unsharp_kernel_size": unsharp_kernel_size,
                "unsharp_sigma": unsharp_sigma,
                "unsharp_strength": unsharp_strength,
            }
        match sampler_name:
            case "euler_ancestral":
                sample_function = sample_euler_ancestral
            case "dpmpp_2s_ancestral":
                sample_function = sample_dpmpp_2s_ancestral
            case "dpmpp_2m_sde":
                sample_function = sample_dpmpp_2m_sde
            case "lcm":
                sample_function = sample_lcm

        if sample_function is not None:
            unsharp_kernel_size = unsharp_kernel_size if unsharp_kernel_size % 2 == 1 else unsharp_kernel_size + 1
            extra_options["unsharp_kernel_size"] = unsharp_kernel_size
            _sampler = comfy.samplers.KSAMPLER(sample_function, extra_options)
        else:
            _sampler = comfy.samplers.sampler_object(sampler_name)
            extra_options = None

        new_pipe = {
            "model": pipe['model'],
            "positive": pipe['positive'],
            "negative": pipe['negative'],
            "vae": pipe['vae'],
            "clip": pipe['clip'],

            "samples": pipe["samples"],
            "images": pipe["images"],
            "seed": seed,

            "loader_settings": {
                **pipe["loader_settings"],
                "extra_options": extra_options,
                "sampler": _sampler,
                "sigmas": sigmas,
                "steps": steps,
                "cfg": cfg,
                "add_noise": "enabled"
            }
        }

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
