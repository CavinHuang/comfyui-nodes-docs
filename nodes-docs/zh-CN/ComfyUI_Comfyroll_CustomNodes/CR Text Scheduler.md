# Documentation
- Class name: CR_TextScheduler
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_TextScheduler是一个用于管理和根据时间表插值文本提示的节点。它允许用户定义默认文本和时间表格式，从而能够根据预定义的关键帧列表，创建随项目或场景进展而变化的动态提示。此节点对于生成能够适应项目或场景进展的上下文感知文本至关重要。

# Input types
## Required
- mode
    - 模式参数决定调度器是在默认文本模式下运行还是在调度模式下运行。这个选择影响节点如何处理输入以生成输出文本。
    - Comfy dtype: COMBO['Default Text', 'Schedule']
    - Python dtype: str
- current_frame
    - 当前帧参数指定了需要生成文本提示的时间点或动画的当前点。对于调度器来说，根据关键帧列表确定正确的文本至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- schedule_alias
    - 时间表别名参数用于在调度器中识别特定时间表。当同时管理多个时间表时，这一点尤其重要。
    - Comfy dtype: STRING
    - Python dtype: str
- default_text
    - 默认文本参数设置了在当前帧没有安排特定文本时使用的初始或备用文本。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_format
    - 时间表格式参数决定了时间表数据的结构和语法。对于正确解析和解释关键帧列表至关重要。
    - Comfy dtype: COMBO['CR', 'Deforum']
    - Python dtype: str
- schedule
    - 时间表参数包含了定义调度器要遵循的时间线和相关文本提示的关键帧列表。
    - Comfy dtype: SCHEDULE
    - Python dtype: List[str]

# Output types
- text_out
    - text_out参数代表了调度器根据当前帧和定义的时间表生成的文本提示的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- show_help
    - show_help参数提供了一个指向与节点操作相关的文档或帮助页面的URL链接，为用户提供了额外的指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_TextScheduler:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Default Text', 'Schedule']
        return {'required': {'mode': (modes,), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'schedule_alias': ('STRING', {'default': '', 'multiline': False}), 'default_text': ('STRING', {'multiline': False, 'default': 'default text'}), 'schedule_format': (['CR', 'Deforum'],)}, 'optional': {'schedule': ('SCHEDULE',)}}
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('STRING', 'show_help')
    FUNCTION = 'schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def schedule(self, mode, current_frame, schedule_alias, default_text, schedule_format, schedule=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-text-scheduler'
        if mode == 'Default Text':
            print(f'[Info] CR Text Scheduler: Scheduler {schedule_alias} is disabled')
            text_out = default_text
            return (text_out, show_help)
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
        if params == '':
            if current_frame == 0:
                print(f'[Warning] CR Text Scheduler. No frame 0 found in schedule. Starting with default value at frame 0')
            text_out = (default_value,)
        else:
            try:
                text_out = params
            except ValueError:
                print(f'[Warning] CR Text Scheduler. Invalid params: {params}')
                return ()
        return (text_out, show_help)
```