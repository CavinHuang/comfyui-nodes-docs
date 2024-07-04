
# Documentation
- Class name: KSamplerAdvancedProgress __Inspire
- Category: InspirePack/analysis
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

本节点设计用于使用高级KSampler算法渐进式地采样图像，专为Inspire包量身定制。它通过一系列输入参数和条件，在每一步迭代中细致调整和增强图像生成过程，从而实现图像的逐步优化。

# Input types
## Required
- model
    - 指定用于采样的生成模型，对生成图像的质量和风格起着至关重要的作用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- add_noise
    - 决定是否在采样过程开始时添加噪声，影响初始状态并可能增加生成图像的多样性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- noise_seed
    - 为噪声生成提供种子，确保在添加噪声时生成的图像具有可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 指定采样过程中要执行的步骤数，直接影响生成图像的精细度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 采样过程的配置设置，允许根据特定要求自定义生成过程。
    - Comfy dtype: FLOAT
    - Python dtype: dict
- sampler_name
    - 标识要使用的特定采样器算法，允许在高级KSampler框架内选择不同的采样策略。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 定义控制采样过程的调度算法，影响图像生成的进展和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive
    - 用于引导图像生成朝向期望属性或主题的正面提示或条件。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 用于引导图像生成远离某些属性或主题的负面提示或条件，用于优化输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - 开始采样的初始潜在图像，为渐进式优化过程设置基准。
    - Comfy dtype: LATENT
    - Python dtype: dict
- start_at_step
    - 开始采样过程的步骤，允许从生成过程的特定点开始优化。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 采样过程结束的最后一步，定义渐进式优化的范围。
    - Comfy dtype: INT
    - Python dtype: int
- noise_mode
    - 指定采样过程中噪声应用的模式，影响生成图像的纹理和细节。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- return_with_leftover_noise
    - 指示是否在返回的样本中包含剩余噪声，可能增加图像的多样性和真实感。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- interval
    - 捕获和返回中间样本的间隔，允许观察整个采样过程的进展。
    - Comfy dtype: INT
    - Python dtype: int
- omit_start_latent
    - 如果设置为true，则从结果中省略初始潜在图像，将输出重点放在采样过程中取得的进展上。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- prev_progress_latent_opt
    - 可选的先前进度潜在图像，可与当前采样结果连接，实现跨多个采样会话的连续进展。
    - Comfy dtype: LATENT
    - Python dtype: dict

# Output types
- latent
    - 采样过程完成后的最终潜在图像，代表渐进式优化的最终成果。
    - Comfy dtype: LATENT
    - Python dtype: dict
- progress_latent
    - 在采样过程中按指定间隔捕获的潜在图像集合，展示图像生成的进展和演变。
    - Comfy dtype: LATENT
    - Python dtype: dict


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSamplerAdvanced_progress(a1111_compat.KSamplerAdvanced_inspire):
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
                     "interval": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "omit_start_latent": ("BOOLEAN", {"default": False, "label_on": "True", "label_off": "False"}),
                     },
                "optional": {"prev_progress_latent_opt": ("LATENT",), }
                }

    FUNCTION = "sample"

    CATEGORY = "InspirePack/analysis"

    RETURN_TYPES = ("LATENT", "LATENT")
    RETURN_NAMES = ("latent", "progress_latent")

    def sample(self, model, add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, start_at_step, end_at_step, noise_mode, return_with_leftover_noise, interval, omit_start_latent, prev_progress_latent_opt=None):
        sampler = a1111_compat.KSamplerAdvanced_inspire()

        if omit_start_latent:
            result = []
        else:
            result = [latent_image['samples']]

        for i in range(start_at_step, min(end_at_step+1, steps+1)):
            cur_add_noise = i == start_at_step and add_noise
            cur_return_with_leftover_noise = i != steps or return_with_leftover_noise
            latent_image = sampler.sample(model, cur_add_noise, noise_seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, i, i+1, noise_mode, cur_return_with_leftover_noise)[0]
            if i % interval == 0 or i == steps:
                result.append(latent_image['samples'])

        if len(result) > 0:
            result = torch.cat(result)
            result = {'samples': result}
        else:
            result = latent_image

        if prev_progress_latent_opt is not None:
            result['samples'] = torch.cat((prev_progress_latent_opt['samples'], result['samples']), dim=0)

        return (latent_image, result)

```
