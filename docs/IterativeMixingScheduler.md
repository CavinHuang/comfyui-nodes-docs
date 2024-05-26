# Documentation
- Class name: IterativeMixingScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

迭代混合调度器节点旨在生成一系列噪声水平，即sigmas，这些在从模型采样的迭代混合过程中使用。它利用调度器控制噪声水平的进展，并且能够根据去噪参数调整步数，以微调采样过程。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了从中抽取样本的生成模型。它是决定采样过程底层结构和能力的基石组件。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- scheduler
    - 调度器参数定义了在采样过程中调整噪声水平的策略。它在确定生成样本的质量和收敛性方面起着重要作用。
    - Comfy dtype: SCHEDULER_NAMES
    - Python dtype: str
- steps
    - 步数参数指定了采样过程中的迭代次数。它直接影响噪声水平的粒度，进而影响最终样本的细节和准确性。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 去噪参数通过调整去除噪声的速率，允许对采样过程进行微调。它可能显著影响生成样本的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sigmas
    - sigmas输出提供了指导迭代采样过程的计算出的噪声水平序列。这是一个关键的输出，直接影响最终样本的生成。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IterativeMixingScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'scheduler': (comfy.samplers.SCHEDULER_NAMES,), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    @torch.no_grad()
    def get_sigmas(self, model, scheduler, steps, denoise):
        sigmas = None
        cs = comfy.samplers.calculate_sigmas_scheduler
        if denoise is None or denoise > 0.9999:
            sigmas = cs(model.model, scheduler, steps).cpu()
        else:
            new_steps = int(steps / denoise)
            sigmas = cs(model.model, scheduler, new_steps).cpu()
            sigmas = sigmas[-(steps + 1):]
        return (sigmas,)
```