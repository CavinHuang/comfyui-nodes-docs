# Documentation
- Class name: BasicScheduler
- Category: sampling/custom_sampling/schedulers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

BasicScheduler节点旨在管理和计算生成图像的扩散过程中使用的sigma值的时间表。它抽象地处理确定每个步骤适当sigmas的复杂性，确保平滑且连贯的采样过程。

# Input types
## Required
- model
    - 模型参数至关重要，因为它代表了用于采样的基础模型。它影响调度器如何计算sigmas，并且对节点的执行至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- scheduler
    - 调度器参数定义了用于sigma计算的计划类型。它是采样过程中的关键决定因素，直接影响输出的sigmas。
    - Comfy dtype: STRING
    - Python dtype: str
- steps
    - 步骤参数指定采样过程中要采取的步骤数量。它是控制采样粒度的重要组成部分，影响生成图像的质量。
    - Comfy dtype: INT
    - Python dtype: int
- denoise
    - 去噪参数调整采样过程中应用的噪声减少水平。它通过影响输出的清晰度和细节，在最终图像质量中起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- sigmas
    - sigmas输出提供了采样过程中每个步骤的计算时间表sigma值。这些值对于扩散过程至关重要，直接影响最终图像的质量。
    - Comfy dtype: FLOAT[1]
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class BasicScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'scheduler': (comfy.samplers.SCHEDULER_NAMES,), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('SIGMAS',)
    CATEGORY = 'sampling/custom_sampling/schedulers'
    FUNCTION = 'get_sigmas'

    def get_sigmas(self, model, scheduler, steps, denoise):
        total_steps = steps
        if denoise < 1.0:
            if denoise <= 0.0:
                return (torch.FloatTensor([]),)
            total_steps = int(steps / denoise)
        sigmas = comfy.samplers.calculate_sigmas(model.get_model_object('model_sampling'), scheduler, total_steps).cpu()
        sigmas = sigmas[-(steps + 1):]
        return (sigmas,)
```