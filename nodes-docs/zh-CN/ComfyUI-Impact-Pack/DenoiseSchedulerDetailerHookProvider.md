# Documentation
- Class name: DenoiseSchedulerDetailerHookProvider
- Category: ImpactPack/Detailer
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DenoiseSchedulerDetailerHookProvider节点旨在管理细化过程的去噪计划。它提供了一种机制，在过程的不同阶段调整应用的去噪水平，确保从有噪声到详细状态的平滑过渡。

# Input types
## Required
- schedule_for_cycle
    - schedule_for_cycle参数决定了细化周期内要遵循的去噪计划。它至关重要，因为它决定了去噪步骤的顺序，从而影响最终输出的质量。
    - Comfy dtype: STRING
    - Python dtype: str
- target_denoise
    - target_denoise参数指定了所需的去噪水平。它很重要，因为它直接影响最终输出的清晰度和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- DETAILER_HOOK
    - DenoiseSchedulerDetailerHookProvider的输出是一个封装了去噪计划的细化钩子。它很重要，因为它直接影响细化器在去噪过程中的行为。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: DetailerHook

# Usage tips
- Infra type: CPU

# Source code
```
class DenoiseSchedulerDetailerHookProvider:
    schedules = ['simple']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule_for_cycle': (s.schedules,), 'target_denoise': ('FLOAT', {'default': 0.3, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('DETAILER_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Detailer'

    def doit(self, schedule_for_cycle, target_denoise):
        hook = hooks.SimpleDetailerDenoiseSchedulerHook(target_denoise)
        return (hook,)
```