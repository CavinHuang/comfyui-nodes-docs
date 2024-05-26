# Documentation
- Class name: IterativeMixingSchedulerAdvanced
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/ttulttul/ComfyUI-Iterative-Mixer

IterativeMixingSchedulerAdvanced节点旨在为迭代采样过程生成一系列噪声水平，即sigmas。它根据去噪参数智能调整采样步骤，确保输出精细调整到所需的噪声减少水平。该节点在控制高级迭代采样技术的采样计划中发挥关键作用，有助于提高采样过程的整体质量和效率。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了将要应用调度器的生成模型。它直接影响生成的sigmas的质量和类型，这对于采样过程至关重要。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- scheduler
    - 调度器参数决定了采样过程中将使用的调度策略。它是计算sigmas的关键因素，因此影响迭代采样的整体性能。
    - Comfy dtype: SCHEDULER_NAMES
    - Python dtype: str
- steps
    - steps参数指定了采样过程中要进行的迭代次数或步骤数。它是控制采样计划持续时间和粒度的重要因素。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - start_at_step参数允许自定义采样计划的起始点。它可以用来跳过初始步骤或在过程的特定点开始采样。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - end_at_step参数定义了采样计划的终点。它可以用来限制执行的步骤数，在预定点停止采样过程。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - denoise参数在采样过程中调整噪声减少的水平。它是确定最终输出质量的关键因素，通过控制去噪步骤的强度来实现。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sigmas
    - sigmas输出代表了节点生成的噪声水平序列。这些值在迭代采样过程中起着指导作用，引导模型产生更高质量的输出。
    - Comfy dtype: SIGMAS
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class IterativeMixingSchedulerAdvanced:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'scheduler': (comfy.samplers.SCHEDULER_NAMES,), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'start_at_step': ('INT', {'default': 0, 'min': 0, 'max': 10000}), 'end_at_step': ('INT', {'default': 10000, 'min': 0, 'max': 10000}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    @torch.no_grad()
    def get_sigmas(self, model, scheduler, steps, start_at_step, end_at_step, denoise):
        sigmas = None
        cs = comfy.samplers.calculate_sigmas_scheduler
        if denoise is None or denoise > 0.9999:
            sigmas = cs(model.model, scheduler, steps).cpu()
        else:
            new_steps = int(steps / denoise)
            sigmas = cs(model.model, scheduler, new_steps).cpu()
            sigmas = sigmas[-(steps + 1):]
        if end_at_step is not None and end_at_step < len(sigmas) - 1:
            sigmas = sigmas[:end_at_step + 1]
        if start_at_step is not None:
            if start_at_step < len(sigmas) - 1:
                sigmas = sigmas[start_at_step:]
            else:
                return torch.Tensor([])
        return (sigmas,)
```