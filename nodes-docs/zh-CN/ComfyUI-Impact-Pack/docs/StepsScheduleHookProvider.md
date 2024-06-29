# Documentation
- Class name: StepsScheduleHookProvider
- Category: ImpactPack/Upscale
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

StepsScheduleHookProvider节点旨在促进创建和管理迭代过程的调度钩子。它抽象了定义计划的复杂性，允许用户指定迭代过程的计划类型和目标步骤。该节点的主要作用是根据用户的选择实例化适当的调度钩子，从而简化了设置迭代工作流程的过程。

# Input types
## Required
- schedule_for_iteration
    - 参数'schedule_for_iteration'对于确定要使用的调度钩子类型至关重要。它通过从预定义的计划中选择来决定迭代过程的行为。此参数直接影响节点的执行策略和生成的调度模式。
    - Comfy dtype: STRING
    - Python dtype: str
- target_steps
    - 参数'target_steps'定义了迭代过程中要采取的步骤数。它是控制过程持续时间和范围的关键因素。此参数对于调整节点的操作以满足当前任务的特定要求或约束至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- hook
    - 输出'hook'是一个调度钩子对象，它封装了根据指定的计划和目标步骤管理迭代过程的逻辑。它很重要，因为它代表了节点的主要输出，用于控制迭代工作流程。
    - Comfy dtype: PK_HOOK
    - Python dtype: PixelKSampleHook

# Usage tips
- Infra type: CPU

# Source code
```
class StepsScheduleHookProvider:
    schedules = ['simple']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule_for_iteration': (s.schedules,), 'target_steps': ('INT', {'default': 20, 'min': 1, 'max': 10000})}}
    RETURN_TYPES = ('PK_HOOK',)
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Upscale'

    def doit(self, schedule_for_iteration, target_steps):
        hook = None
        if schedule_for_iteration == 'simple':
            hook = hooks.SimpleStepsScheduleHook(target_steps)
        return (hook,)
```