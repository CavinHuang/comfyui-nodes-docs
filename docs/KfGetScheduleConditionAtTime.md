# Documentation
- Class name: KfGetScheduleConditionAtTime
- Category: RootCategory
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在从给定时间点的调度中提取和处理条件数据，提供了一种无缝分析和利用该时刻调度状态的方法。

# Input types
## Required
- schedule
    - 调度参数至关重要，因为它包含了节点确定指定时间条件状态所需的结构化数据和配置。它是驱动节点操作的主要输入。
    - Comfy dtype: SCHEDULE
    - Python dtype: dict
- time
    - 时间参数是必不可少的，它指示节点需要评估调度的具体时间。它通过确定将提取和处理哪组条件直接影响输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- CONDITIONING
    - 输出提供了一组详细的条件数据，反映了指定时间调度的状态。它是进一步分析和决策过程中的关键信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple

# Usage tips
- Infra type: CPU

# Source code
```
class KfGetScheduleConditionAtTime:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('CONDITIONING',)

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'schedule': ('SCHEDULE', {}), 'time': ('FLOAT', {})}}

    def main(self, schedule, time):
        lerped_cond = evaluate_schedule_at_time(schedule, time)
        return (lerped_cond,)
```