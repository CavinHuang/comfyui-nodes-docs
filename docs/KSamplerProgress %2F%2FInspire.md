# Documentation
- Class name: KSampler_progress
- Category: InspirePack/analysis
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

KSampler_progress节点旨在通过逐步引入噪声并在指定的步数内细化潜在表示来促进模型的采样过程。它增强了对模型潜在空间的探索，并提供了模型在不同噪声条件下行为的洞察。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了要探索的潜在空间的来源。它是节点操作的基础，决定了可以生成和分析的样本类型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子用于初始化随机数生成器，确保采样过程可复现和一致，对保持实验结果的完整性起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步数参数决定了采样过程将经历的迭代次数。它直接影响到潜在空间探索的深度和结果的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置参数，通常表示为'cfg'，用于调整采样过程的设置。它在微调节点操作以实现期望的结果方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数指定了在采样过程中要使用的采样器类型。它决定了用于遍历潜在空间的策略，并对样本的质量有着显著影响。
    - Comfy dtype: ENUM
    - Python dtype: str
- scheduler
    - 调度器参数定义了采样过程的调度策略。它在管理噪声引入的进展和采样迭代的步调方面至关重要。
    - Comfy dtype: ENUM
    - Python dtype: str
- positive
    - positive参数用于向模型提供正向调节数据，可以引导采样过程朝着期望的特发展。这对于将输出引向特定结果至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- negative
    - negative参数用于提供负向调节数据，有助于避免采样过程中不希望出现的特征。它对于提高生成样本的质量至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Any
- latent_image
    - latent_image参数是包含采样过程初始样本或种子的输入。它为探索设置了起点，对于生成后续的潜在样本至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]
- denoise
    - denoise参数控制采样过程中应用的噪声减少水平。它在平衡潜在空间探索与结果样本清晰度之间的权衡中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - noise_mode参数决定了噪声处理的计算模式，无论是GPU还是CPU。它对于优化采样过程的性能和效率非常重要。
    - Comfy dtype: ENUM
    - Python dtype: str
- interval
    - 间隔参数指定了在采样过程中收集中间样本的频率。它影响了捕获的数据点的密度和进度跟踪的细节。
    - Comfy dtype: INT
    - Python dtype: int
- omit_start_latent
    - omit_start_latent参数决定是否在最终输出中包含初始潜在样本。它有助于管理结果的范围，专注于样本随时间的演变。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- latent
    - 潜在输出代表了采样过程后最终精炼的潜在样本。它封装了探索的结果，并作为进一步分析或生成图像的基础。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any
- progress_latent
    - progress_latent输出在采样过程的指定间隔提供了潜在样本的中间表示。它提供了样本随时间进展和转变的洞察。
    - Comfy dtype: LATENT
    - Python dtype: List[Dict[str, Any]]

# Usage tips
- Infra type: GPU

# Source code
```
class KSampler_progress(a1111_compat.KSampler_inspire):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'noise_mode': (['GPU(=A1111)', 'CPU'],), 'interval': ('INT', {'default': 1, 'min': 1, 'max': 10000}), 'omit_start_latent': ('BOOLEAN', {'default': True, 'label_on': 'True', 'label_off': 'False'})}}
    CATEGORY = 'InspirePack/analysis'
    RETURN_TYPES = ('LATENT', 'LATENT')
    RETURN_NAMES = ('latent', 'progress_latent')

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, interval, omit_start_latent):
        adv_steps = int(steps / denoise)
        sampler = a1111_compat.KSamplerAdvanced_inspire()
        if omit_start_latent:
            result = []
        else:
            result = [latent_image['samples']]
        for i in range(0, adv_steps + 1):
            add_noise = i == 0
            return_with_leftover_noise = i != adv_steps
            latent_image = sampler.sample(model, add_noise, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, i, i + 1, noise_mode, return_with_leftover_noise)[0]
            if i % interval == 0 or i == adv_steps:
                result.append(latent_image['samples'])
        if len(result) > 0:
            result = torch.cat(result)
            result = {'samples': result}
        else:
            result = latent_image
        return (latent_image, result)
```