# Documentation
- Class name: CR_CombineSchedules
- Category: Animation/Schedule
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_CombineSchedules节点旨在将多个动画时间表合并为一个单一的、连贯的时间表。它通过整合提供的日程安排，确保不同动画阶段之间的平稳过渡而不发生冲突来实现这一点。这个节点在简化动画工作流程中发挥着关键作用，特别适用于需要同步多个时间表的复杂动画。

# Input types
## Optional
- schedule_1
    - 要组合的第一个动画时间表。这是一个关键的输入，因为它为合并后的时间表设置了初始结构。节点智能地整合这个时间表，同时确保与后续输入的兼容性。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[str]
- schedule_2
    - 要合并的第二个动画时间表。这个输入允许进一步定制和扩展组合的时间表，增加更多的动画控制层。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[str]
- schedule_3
    - 第三可选动画时间表，可以包含在组合过程中。它为整个动画序列提供了额外的灵活性。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[str]
- schedule_4
    - 第四个可选动画时间表，可以集成到最终组合的时间表中。它提供了在时间表合并之前的最后一层定制。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[str]

# Output types
- SCHEDULE
    - 合并过程产生的组合时间表。它代表了准备应用的统一动画指令序列。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[str]
- show_text
    - 组合时间表的文本表示，适用于调试和可视化目的。它提供了合并后的动画指令的人类可读格式。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CombineSchedules:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'schedule_1': ('SCHEDULE',), 'schedule_2': ('SCHEDULE',), 'schedule_3': ('SCHEDULE',), 'schedule_4': ('SCHEDULE',)}}
    RETURN_TYPES = ('SCHEDULE', 'STRING')
    RETURN_NAMES = ('SCHEDULE', 'show_text')
    FUNCTION = 'combine'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def combine(self, schedule_1=None, schedule_2=None, schedule_3=None, schedule_4=None):
        schedules = list()
        schedule_text = list()
        if schedule_1 is not None:
            (schedules.extend([l for l in schedule_1]),)
            (schedule_text.extend(schedule_1),)
        if schedule_2 is not None:
            (schedules.extend([l for l in schedule_2]),)
            (schedule_text.extend(schedule_2),)
        if schedule_3 is not None:
            (schedules.extend([l for l in schedule_3]),)
            (schedule_text.extend(schedule_3),)
        if schedule_4 is not None:
            (schedules.extend([l for l in schedule_4]),)
            (schedule_text.extend(schedule_4),)
        print(f'[Debug] CR Combine Schedules: {schedules}')
        show_text = ''.join(str(schedule_text))
        return (schedules, show_text)
```