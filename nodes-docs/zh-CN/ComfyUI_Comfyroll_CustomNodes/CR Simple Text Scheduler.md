# Documentation
- Class name: CR_SimpleTextScheduler
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleTextScheduler 是一个用于管理和调度文本输出的节点，它基于预定义的关键帧集合和动画序列中的当前帧。该节点为用户提供了一个简单的接口，用于输入一个时间表，并为给定的帧检索相应的文本，确保在动画中无缝集成动态文本元素。

# Input types
## Required
- schedule
    - schedule 参数是一个包含文本调度器关键帧信息的字符串。它对于定义整个动画中文本变化的顺序至关重要。multiline 属性允许更复杂时间表的定义，可以跨多行输入。
    - Comfy dtype: STRING
    - Python dtype: str
- current_frame
    - current_frame 参数指示动画序列中的当前位置。它对于确定在任何给定时刻应该显示时间表中的哪个文本至关重要。整数类型确保了精确的帧跟踪。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- text_out
    - text_out 参数代表当前帧计划显示的文本。这是节点的主要输出，提供了与动画进展相一致的动态文本内容。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help 参数提供了一个文档的 URL 链接，用于进一步的帮助。对于需要更多关于如何使用节点或解决故障信息的用户来说，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleTextScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'schedule': ('STRING', {'multiline': True, 'default': 'frame_number, text'}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'simple_schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def simple_schedule(self, schedule, current_frame):
        schedule_lines = list()
        if schedule == '':
            print(f'[Warning] CR Simple Text Scheduler. No lines in schedule')
            return ()
        lines = schedule.split('\n')
        for line in lines:
            schedule_lines.extend([('SIMPLE', line)])
        params = keyframe_scheduler(schedule_lines, 'SIMPLE', current_frame)
        if params == '':
            print(f'[Warning] CR Simple Text Scheduler. No schedule found for frame. Simple schedules must start at frame 0.')
        else:
            try:
                text_out = str(params)
            except ValueError:
                print(f'[Warning] CR Simple Text Scheduler. Invalid params {params} at frame {current_frame}')
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-simple-text-scheduler'
            return (text_out, show_help)
```