# Documentation
- Class name: DenoiseScheduleHookProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

DenoiseScheduleHookProvider节点旨在管理和应用去噪计划到图像处理任务中。它提供了一个简单的计划，在放大过程中调整去噪级别以提高图像质量。

# Input types
## Required
- schedule_for_iteration
    - schedule_for_iteration参数决定了在放大过程中应用哪种去噪计划。对于选择正确的策略以提高图像质量至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- target_denoise
    - target_denoise参数设置要达到的期望去噪级别。它是放大图像最终质量的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- hook
    - hook输出提供了配置好的去噪计划钩子，用于控制放大过程中的去噪级别。
    - Comfy dtype: PK_HOOK
    - Python dtype: PixelKSampleHook

# Usage tips
- Infra type: CPU

# Source code
```
class DenoiseScheduleHookProvider:
    schedules = ['simple']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule_for_iteration': (s.schedules,), 'target_denoise': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('PK_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, schedule_for_iteration, target_denoise):
        hook = None
        if schedule_for_iteration == 'simple':
            hook = hooks.SimpleDenoiseScheduleHook(target_denoise)
        return (hook,)
```