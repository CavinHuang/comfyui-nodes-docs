
# Documentation
- Class name: KSamplerProgress __Inspire
- Category: InspirePack/analysis
- Output node: False
- Repo Ref: https://github.com/ZHO-ZHO-ZHO/ComfyUI-Inspire-Pack

KSamplerProgress __Inspire 节点设计用于对潜在图像进行迭代采样和优化，过程分为多个步骤，实现采样过程的渐进式可视化。它利用先进的采样技术来提升生成图像的质量和多样性，适用于需要详细图像进展分析的应用场景。

# Input types
## Required
- model
    - 指定用于采样的模型，是决定生成图像特征和质量的核心。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 定义噪声生成的种子，确保采样结果的可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 确定采样过程的步骤数，直接影响潜在图像的优化和进展。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 采样过程的配置设置，用于调整采样器的行为和参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 标识要使用的特定采样器，影响采样策略和结果图像特征。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 指定控制采样过程的调度器，影响图像生成的进展和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 正面提示，引导采样向期望的图像属性发展，提高相关性和特异性。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负面提示，用于引导采样远离不希望的图像属性，提升输出质量。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 初始潜在图像，作为进展的起点，通过采样过程进行优化。
    - Comfy dtype: LATENT
    - Python dtype: dict
- denoise
    - 指定采样过程中应用的去噪因子，影响生成图像的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - 采样过程中噪声应用的模式，影响生成图像的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- interval
    - 捕获和返回潜在图像的时间间隔，便于渐进式可视化。
    - Comfy dtype: INT
    - Python dtype: int
- omit_start_latent
    - 指示是否从结果中排除起始潜在图像，为进展输出提供灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent
    - 采样过程完成后的最终潜在图像，代表渐进优化的最终结果。
    - Comfy dtype: LATENT
    - Python dtype: dict
- progress_latent
    - 在采样过程中按指定间隔捕获的潜在图像集合，展示图像优化的进展过程。
    - Comfy dtype: LATENT
    - Python dtype: dict


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSampler_progress(a1111_compat.KSampler_inspire):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "latent_image": ("LATENT", ),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "interval": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "omit_start_latent": ("BOOLEAN", {"default": True, "label_on": "True", "label_off": "False"}),
                     }
                }

    CATEGORY = "InspirePack/analysis"

    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("latent", "progress_latent")

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, interval, omit_start_latent):
        adv_steps = int(steps / denoise)

        sampler = a1111_compat.KSamplerAdvanced_inspire()

        if omit_start_latent:
            result = []
        else:
            result = [latent_image['samples']]

        for i in range(0, adv_steps+1):
            add_noise = i == 0
            return_with_leftover_noise = i != adv_steps
            latent_image = sampler.sample(model, add_noise, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, i, i+1, noise_mode, return_with_leftover_noise)[0]
            if i % interval == 0 or i == adv_steps:
                result.append(latent_image['samples'])

        if len(result) > 0:
            result = torch.cat(result)
            result = {'samples': result}
        else:
            result = latent_image

        return (latent_image, result)

```
