# Documentation
- Class name: CR_SimpleValueScheduler
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleValueScheduler 是一个用于管理和插值关键帧时间表的节点，用于值的调度。它在创建帧之间的平滑过渡和动态变化中起着关键作用，为用户提供了一种简单直接的方式来安排和随时间变化地操作值。

# Input types
## Required
- schedule
    - schedule 输入对于定义随时间变化的关键帧值至关重要。它允许在不同帧上指定不同的值，使节点能够在它们之间进行插值。
    - Comfy dtype: STRING
    - Python dtype: str
- current_frame
    - current_frame 参数指示动画时间线中的当前位置。它对于确定在任何给定时刻应用哪个预定值至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- INT
    - INT 输出提供了当前帧预定值的整数表示，可以用于动画流水线中的数值运算。
    - Comfy dtype: INT
    - Python dtype: int
- FLOAT
    - FLOAT 输出提供了预定值的浮点数解释，适用于动画过程中更精确的计算和调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - show_help 输出提供了文档链接，以便在使用 CR_SimpleValueScheduler 节点时获得进一步的指导和帮助。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleValueScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule': ('STRING', {'multiline': True, 'default': 'frame_number, value'}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('INT', 'FLOAT', 'show_help')
    FUNCTION = 'simple_schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def simple_schedule(self, schedule, current_frame):
        schedule_lines = list()
        if schedule == '':
            print(f'[Warning] CR Simple Value Scheduler. No lines in schedule')
            return ()
        lines = schedule.split('\n')
        for line in lines:
            schedule_lines.extend([('SIMPLE', line)])
        params = keyframe_scheduler(schedule_lines, 'SIMPLE', current_frame)
        if params == '':
            print(f'[Warning] CR Simple Value Scheduler. No schedule found for frame. Simple schedules must start at frame 0.')
        else:
            try:
                int_out = int(params.split('.')[0])
                float_out = float(params)
            except ValueError:
                print(f'[Warning] CR Simple Value Scheduler. Invalid params {params} at frame {current_frame}')
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-simple-value-scheduler'
            return (int_out, float_out, show_help)
```