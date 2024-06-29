---
tags:
- Sampling
---

# PreSampling (Custom)
## Documentation
- Class name: `easy preSamplingCustom`
- Category: `EasyUse/PreSampling`
- Output node: `True`

The `easy preSamplingCustom` node is designed for custom pre-sampling configurations within a generative pipeline, allowing for tailored manipulation of latent spaces and sampling parameters to achieve specific image generation outcomes.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration, including model, positive and negative prompts, and other settings, serving as the foundation for the pre-sampling process.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`guider`**
    - Determines the guiding strategy for the sampling process, offering options like CFG, DualCFG, and others, with a default of 'Basic'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`cfg`**
    - Controls the conditioning factor, influencing the strength of the condition applied during sampling, with a default value and range provided.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`cfg_negative`**
    - Specifies the negative conditioning factor, adjusting the influence of negative conditions during sampling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Selects the specific sampler to be used during the pre-sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Chooses the scheduler for controlling the sampling steps, affecting the progression of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`steps`**
    - Defines the number of steps to be taken during the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_max`**
    - Sets the maximum value of sigma for noise adjustment in the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_min`**
    - Determines the minimum value of sigma, setting the lower bound for noise adjustment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`rho`**
    - Adjusts the rho parameter, influencing the sampling dynamics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`beta_d`**
    - Controls the beta_d parameter, affecting the diffusion process during sampling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`beta_min`**
    - Sets the minimum value of beta, influencing the lower bound of the diffusion process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`eps_s`**
    - Specifies the eps_s parameter, adjusting the step size in the sampling process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`flip_sigmas`**
    - Enables or disables the flipping of sigma values, altering the noise pattern during sampling.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`denoise`**
    - Adjusts the denoising factor, affecting the clarity and quality of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`add_noise`**
    - Enables or disables the addition of noise, influencing the texture and details of the generated images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`seed`**
    - Sets the seed for random number generation, ensuring reproducibility of the sampling process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image_to_latent`**
    - Converts an input image to a latent representation, integrating it into the pre-sampling process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `object`
- **`latent`**
    - Provides a latent representation to be used directly in the pre-sampling process.
    - Comfy dtype: `LATENT`
    - Python dtype: `object`
- **`optional_sampler`**
    - Optionally specifies an alternative sampler for the pre-sampling process.
    - Comfy dtype: `SAMPLER`
    - Python dtype: `str`
- **`optional_sigmas`**
    - Optionally provides a custom set of sigma values for noise adjustment.
    - Comfy dtype: `SIGMAS`
    - Python dtype: `list`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the modified pipeline configuration, now including custom pre-sampling settings, ready for further processing or image generation.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class samplerCustomSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"pipe": ("PIPE_LINE",),
                     "guider": (['CFG','DualCFG','IP2P+DualCFG','Basic'],{"default":"Basic"}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "cfg_negative": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS + ['inversed_euler'],),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS + ['karrasADV','exponentialADV','polyExponential', 'sdturbo', 'vp', 'alignYourSteps'],),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "sigma_max": ("FLOAT", {"default": 14.614642, "min": 0.0, "max": 1000.0, "step": 0.01, "round": False}),
                     "sigma_min": ("FLOAT", {"default": 0.0291675, "min": 0.0, "max": 1000.0, "step": 0.01, "round": False}),
                     "rho": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0, "step": 0.01, "round": False}),
                     "beta_d": ("FLOAT", {"default": 19.9, "min": 0.0, "max": 1000.0, "step": 0.01, "round": False}),
                     "beta_min": ("FLOAT", {"default": 0.1, "min": 0.0, "max": 1000.0, "step": 0.01, "round": False}),
                     "eps_s": ("FLOAT", {"default": 0.001, "min": 0.0, "max": 1.0, "step": 0.0001, "round": False}),
                     "flip_sigmas": ("BOOLEAN", {"default": False}),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "add_noise": (["enable", "disable"], {"default": "enable"}),
                     "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
                     },
                "optional": {
                    "image_to_latent": ("IMAGE",),
                    "latent": ("LATENT",),
                    "optional_sampler":("SAMPLER",),
                    "optional_sigmas":("SIGMAS",),
                },
                "hidden":
                    {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
                }

    RETURN_TYPES = ("PIPE_LINE", )
    RETURN_NAMES = ("pipe",)
    OUTPUT_NODE = True

    FUNCTION = "settings"
    CATEGORY = "EasyUse/PreSampling"

    def ip2p(self, positive, negative, vae=None, pixels=None, latent=None):
        if latent is not None:
            concat_latent = latent
        else:
            x = (pixels.shape[1] // 8) * 8
            y = (pixels.shape[2] // 8) * 8

            if pixels.shape[1] != x or pixels.shape[2] != y:
                x_offset = (pixels.shape[1] % 8) // 2
                y_offset = (pixels.shape[2] % 8) // 2
                pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]

            concat_latent = vae.encode(pixels)

        out_latent = {}
        out_latent["samples"] = torch.zeros_like(concat_latent)

        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                d["concat_latent_image"] = concat_latent
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], out_latent)

    def get_inversed_euler_sampler(self):
        @torch.no_grad()
        def sample_inversed_euler(model, x, sigmas, extra_args=None, callback=None, disable=None, s_churn=0., s_tmin=0.,
                                  s_tmax=float('inf'), s_noise=1.):
            """Implements Algorithm 2 (Euler steps) from Karras et al. (2022)."""
            extra_args = {} if extra_args is None else extra_args
            s_in = x.new_ones([x.shape[0]])
            for i in trange(1, len(sigmas), disable=disable):
                sigma_in = sigmas[i - 1]

                if i == 1:
                    sigma_t = sigmas[i]
                else:
                    sigma_t = sigma_in

                denoised = model(x, sigma_t * s_in, **extra_args)

                if i == 1:
                    d = (x - denoised) / (2 * sigmas[i])
                else:
                    d = (x - denoised) / sigmas[i - 1]

                dt = sigmas[i] - sigmas[i - 1]
                x = x + d * dt
                if callback is not None:
                    callback(
                        {'x': x, 'i': i, 'sigma': sigmas[i], 'sigma_hat': sigmas[i], 'denoised': denoised})
            return x / sigmas[-1]

        ksampler = comfy.samplers.KSAMPLER(sample_inversed_euler)
        return (ksampler,)

    def get_custom_cls(self, sampler_name):
        try:
            cls = custom_samplers.__dict__[sampler_name]
            return cls()
        except:
            raise Exception(f"Custom sampler {sampler_name} not found, Please updated your ComfyUI")

    def settings(self, pipe, guider, cfg, cfg_negative, sampler_name, scheduler, steps, sigma_max, sigma_min, rho, beta_d, beta_min, eps_s, flip_sigmas, denoise, add_noise, seed, image_to_latent=None, latent=None, optional_sampler=None, optional_sigmas=None, prompt=None, extra_pnginfo=None, my_unique_id=None):

        # 图生图转换
        vae = pipe["vae"]
        model = pipe["model"]
        positive = pipe['positive']
        negative = pipe['negative']
        batch_size = pipe["loader_settings"]["batch_size"] if "batch_size" in pipe["loader_settings"] else 1
        _guider, sigmas = None, None
        if image_to_latent is not None:
            if guider == "IP2P+DualCFG":
                positive, negative, latent = self.ip2p(pipe['positive'], pipe['negative'], vae, image_to_latent)
                samples = latent
            else:
                samples = {"samples": vae.encode(image_to_latent[:, :, :, :3])}
                samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
            images = image_to_latent
        elif latent is not None:
            if guider == "IP2P+DualCFG":
                positive, negative, latent = self.ip2p(pipe['positive'], pipe['negative'], latent=latent)
                samples = latent
            else:
                samples = latent
            images = pipe["images"]
        else:
            samples = pipe["samples"]
            images = pipe["images"]

        # guider
        if guider == 'CFG':
            _guider, = self.get_custom_cls('CFGGuider').get_guider(model, positive, negative, cfg)
        elif guider in ['DualCFG', 'IP2P+DualCFG']:
            _guider, =  self.get_custom_cls('DualCFGGuider').get_guider(model, positive, negative, pipe['negative'], cfg, cfg_negative)
        else:
            _guider, = self.get_custom_cls('BasicGuider').get_guider(model, positive)

        # sampler
        if optional_sampler:
            sampler = optional_sampler
        else:
            if sampler_name == 'inversed_euler':
                sampler, = self.get_inversed_euler_sampler()
            else:
                sampler, = self.get_custom_cls('KSamplerSelect').get_sampler(sampler_name)

        # sigmas
        if optional_sigmas is not None:
            sigmas = optional_sigmas
        else:
            match scheduler:
                case 'vp':
                    sigmas, = self.get_custom_cls('VPScheduler').get_sigmas(steps, beta_d, beta_min, eps_s)
                case 'karrasADV':
                    sigmas, = self.get_custom_cls('KarrasScheduler').get_sigmas(steps, sigma_max, sigma_min, rho)
                case 'exponentialADV':
                    sigmas, = self.get_custom_cls('ExponentialScheduler').get_sigmas(steps, sigma_max, sigma_min)
                case 'polyExponential':
                    sigmas, = self.get_custom_cls('PolyexponentialScheduler').get_sigmas(steps, sigma_max, sigma_min, rho)
                case 'sdturbo':
                    sigmas, = self.get_custom_cls('SDTurboScheduler').get_sigmas(model, steps, denoise)
                case 'alignYourSteps':
                    try:
                        model_type = get_sd_version(model)
                        if model_type == 'unknown':
                            raise Exception("This Model not supported")
                        sigmas, = alignYourStepsScheduler().get_sigmas(model_type.upper(), steps, denoise)
                    except:
                        raise Exception("Please update your ComfyUI")
                case _:
                    sigmas, = self.get_custom_cls('BasicScheduler').get_sigmas(model, scheduler, steps, denoise)

            # filp_sigmas
            if flip_sigmas:
                sigmas, = self.get_custom_cls('FlipSigmas').get_sigmas(sigmas)
        # noise
        if add_noise == 'disable':
            noise, = self.get_custom_cls('DisableNoise').get_noise()
        else:
            noise, = self.get_custom_cls('RandomNoise').get_noise(seed)

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
                "custom": {
                    "noise": noise,
                    "guider": _guider,
                    "sampler": sampler,
                    "sigmas": sigmas,
                }
            }
        }

        del pipe

        return {"ui": {"value": [seed]}, "result": (new_pipe,)}

```
