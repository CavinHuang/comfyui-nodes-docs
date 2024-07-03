
# Documentation
- Class name: easy preSamplingCustom
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy preSamplingCustom 节点专门用于在生成管道中进行自定义预采样配置，允许对潜在空间和采样参数进行定制化操作，以实现特定的图像生成效果。

# Input types
## Required
- pipe
    - 指定管道配置，包括模型、正面和负面提示词以及其他设置，作为预采样过程的基础。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- guider
    - 决定采样过程的引导策略，提供如CFG、DualCFG等选项，默认为'Basic'。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- cfg
    - 控制条件因子，影响采样过程中应用条件的强度，提供默认值和范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- cfg_negative
    - 指定负面条件因子，调整采样过程中负面条件的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择预采样过程中使用的具体采样器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择控制采样步骤的调度器，影响采样过程的进展。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 定义采样过程中要采取的步骤数。
    - Comfy dtype: INT
    - Python dtype: int
- sigma_max
    - 设置采样过程中噪声调整的最大sigma值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sigma_min
    - 确定最小sigma值，设置噪声调整的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- rho
    - 调整rho参数，影响采样动态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- beta_d
    - 控制beta_d参数，影响采样过程中的扩散过程。
    - Comfy dtype: FLOAT
    - Python dtype: float
- beta_min
    - 设置beta的最小值，影响扩散过程的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- eps_s
    - 指定eps_s参数，调整采样过程中的步长。
    - Comfy dtype: FLOAT
    - Python dtype: float
- flip_sigmas
    - 启用或禁用sigma值的翻转，改变采样过程中的噪声模式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- denoise
    - 调整去噪因子，影响生成图像的清晰度和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- add_noise
    - 启用或禁用噪声添加，影响生成图像的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- seed
    - 设置随机数生成的种子，确保采样过程的可重复性。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- image_to_latent
    - 将输入图像转换为潜在表示，并将其整合到预采样过程中。
    - Comfy dtype: IMAGE
    - Python dtype: object
- latent
    - 提供直接用于预采样过程的潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: object
- optional_sampler
    - 可选择指定预采样过程的替代采样器。
    - Comfy dtype: SAMPLER
    - Python dtype: str
- optional_sigmas
    - 可选择提供用于噪声调整的自定义sigma值集。
    - Comfy dtype: SIGMAS
    - Python dtype: list

# Output types
- pipe
    - 返回修改后的管道配置，现包含自定义预采样设置，准备进行进一步处理或图像生成。
    - Comfy dtype: PIPE_LINE
    - Python dtype: tuple


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
