【思考】我将按照要求进行四轮翻译流程,严格遵循Example中的格式。首先参考Example,然后进行翻译、校审和定稿。最后输出的译文将包含# Documentation、# Input types、# Output types三个部分,使用Markdown代码块呈现,不会添加任何多余内容。

【翻译】


# Documentation
- Class name: KSamplerAdvanced __Inspire
- Category: InspirePack/a1111_compat
- Output node: False

此节点旨在增强生成模型中的采样过程,专为Inspire包量身定制。它在标准采样技术的基础上,融入了先进特性和优化,以提升生成样本的质量和效率。

# Input types
## Required
- model
    - 指定用于采样过程的生成模型,作为采样操作围绕的核心组件。
    - Comfy dtype: MODEL
    - Python dtype: str
- add_noise
    - 决定是否在采样过程中添加噪声,以增强生成样本的多样性和质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - 设置噪声生成的种子,确保生成样本的可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 定义采样过程中要执行的步骤数,影响输出的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 指定无条件引导尺度,影响采样过程的方向和强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 确定要使用的具体采样器算法,允许自定义采样技术。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择控制采样过程的调度器,进一步定制生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 提供正面条件引导,以指导采样朝向期望的属性或内容。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 提供负面条件引导,以引导采样远离不期望的属性或内容。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 输入一个潜在图像表示,用于在采样过程中使用或修改。
    - Comfy dtype: LATENT
    - Python dtype: str
- start_at_step
    - 指定采样过程的起始步骤,允许进行中途干预或调整。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 定义采样过程的结束步骤,设置生成的边界。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mode
    - 确定噪声生成的计算平台(GPU或CPU),影响性能和效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- return_with_leftover_noise
    - 指示是否返回带有剩余噪声的样本,提供对输出最终外观的额外控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- batch_seed_mode
    - 指定批次间种子生成的模式,影响生成样本的多样性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- variation_seed
    - 设置引入变化的种子,实现输出的可控多样性。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - 决定引入变化的强度,允许对输出多样性进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- noise_opt
    - 提供噪声自定义选项,为采样过程提供进一步控制。
    - Comfy dtype: NOISE
    - Python dtype: str

# Output types
- latent
    - 输出生成样本的潜在表示,封装了高级采样过程的结果。
    - Comfy dtype: LATENT
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvanced_inspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"model": ("MODEL",),
                     "add_noise": ("BOOLEAN", {"default": True, "label_on": "enable", "label_off": "disable"}),
                     "noise_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0, "step":0.5, "round": 0.01}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "positive": ("CONDITIONING", ),
                     "negative": ("CONDITIONING", ),
                     "latent_image": ("LATENT", ),
                     "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     "end_at_step": ("INT", {"default": 10000, "min": 0, "max": 10000}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "return_with_leftover_noise": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     },
                "optional":
                    {
                        "noise_opt": ("NOISE",),
                    }
                }

    RETURN_TYPES = ("LATENT",)
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, denoise=1.0, batch_seed_mode="comfy", variation_seed=None, variation_strength=None, noise_opt=None):
        force_full_denoise = True

        if return_with_leftover_noise:
            force_full_denoise = False

        disable_noise = False

        if not add_noise:
            disable_noise = True

        return common_ksampler(model, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image,
                               denoise=denoise, disable_noise=disable_noise, start_step=start_at_step, last_step=end_at_step,
                               force_full_denoise=force_full_denoise, noise_mode=noise_mode, incremental_seed_mode=batch_seed_mode,
                               variation_seed=variation_seed, variation_strength=variation_strength, noise=noise_opt)

```
