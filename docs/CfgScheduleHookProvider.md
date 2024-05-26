# Documentation
- Class name: CfgScheduleHookProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

CfgScheduleHookProvider节点旨在管理和提供迭代过程的配置进度表。它通过提供一个简单的接口来检索基于指定迭代和目标配置的钩子，从而抽象化了处理不同调度策略的复杂性。

# Input types
## Required
- schedule_for_iteration
    - schedule_for_iteration参数决定了迭代过程将使用哪个进度表。它至关重要，因为它决定了配置随时间调整的方法，影响整个过程的最终结果。
    - Comfy dtype: STRING
    - Python dtype: str
- target_cfg
    - target_cfg参数设置了过程旨在达到的期望配置值。它很重要，因为它直接影响迭代过程中应用的最终配置。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- hook
    - hook输出提供了一个配置好的钩子对象，可以在迭代过程中用于管理调度。它封装了随时间调整配置所需的逻辑。
    - Comfy dtype: PK_HOOK
    - Python dtype: PixelKSampleHook

# Usage tips
- Infra type: CPU

# Source code
```
class CfgScheduleHookProvider:
    schedules = ['simple']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule_for_iteration': (s.schedules,), 'target_cfg': ('FLOAT', {'default': 3.0, 'min': 0.0, 'max': 100.0})}}
    RETURN_TYPES = ('PK_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, schedule_for_iteration, target_cfg):
        hook = None
        if schedule_for_iteration == 'simple':
            hook = hooks.SimpleCfgScheduleHook(target_cfg)
        return (hook,)
```