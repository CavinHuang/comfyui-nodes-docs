# Documentation
- Class name: CR_ValueScheduler
- Category: Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_ValueScheduler是一个用于在动画工作流中管理值调度的节点。它允许选择默认值或根据当前帧应用计划值。该节点提供了一种灵活的方式来处理不同的值分配模式，确保根据指定的计划或默认设置正确设置动画参数。

# Input types
## Required
- mode
    - 模式参数决定节点是否应该使用默认值或计划值。它对于定义调度程序的操作模式至关重要，并影响动画中值的分配方式。
    - Comfy dtype: COMBO['Default Value', 'Schedule']
    - Python dtype: str
- current_frame
    - 当前帧参数指定动画时间轴中的当前帧。它对于节点确定从计划中应用的正确值或在当前帧没有计划值时使用默认值至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- default_value
    - 默认值参数设置节点将在模式设置为“默认值”或当前帧没有可用的计划值时使用的值。它在确保动画具有一致的起始点或后备值方面起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- schedule_alias
    - 计划别名参数用于引用动画中的特定计划。当节点以“计划”模式运行时，它很重要，因为它有助于识别应考虑哪些关键帧和参数进行值分配。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_format
    - 计划格式参数定义节点将解释的计划格式。它对于确保节点正确理解并处理计划数据很重要，计划数据可能在不同的格式中。
    - Comfy dtype: COMBO['CR', 'Deforum']
    - Python dtype: str
- schedule
    - 计划参数为节点提供了将用于确定当前帧值的实际计划数据。当节点处于“计划”模式时，它非常重要，因为它直接影响被分配的值。
    - Comfy dtype: SCHEDULE
    - Python dtype: Schedule

# Output types
- int_out
    - int_out参数表示节点输出的整数值，可以是应用计划或默认值的结果。对于需要整数值的动画参数来说，它很重要。
    - Comfy dtype: INT
    - Python dtype: int
- float_out
    - float_out参数表示节点输出的浮点数值，也可以是应用计划或默认值的结果。对于需要浮点精度的动画参数来说，它很关键。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - show_help参数提供了指向节点文档的URL链接，可用于进一步指导或了解如何有效地使用该节点。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_ValueScheduler:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Default Value', 'Schedule']
        return {'required': {'mode': (modes,), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'schedule_alias': ('STRING', {'default': '', 'multiline': False}), 'default_value': ('FLOAT', {'default': 1.0, 'min': -9999.0, 'max': 9999.0, 'step': 0.01}), 'schedule_format': (['CR', 'Deforum'],)}, 'optional': {'schedule': ('SCHEDULE',)}}
    RETURN_TYPES = ('INT', 'FLOAT', 'STRING')
    RETURN_NAMES = ('INT', 'FLOAT', 'show_help')
    FUNCTION = 'schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def schedule(self, mode, current_frame, schedule_alias, default_value, schedule_format, schedule=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-value-scheduler'
        if mode == 'Default Value':
            print(f'[Info] CR Value Scheduler: Scheduler {schedule_alias} is disabled')
            (int_out, float_out) = (int(default_value), float(default_value))
            return (int_out, float_out, show_help)
        params = keyframe_scheduler(schedule, schedule_alias, current_frame)
        if params == '':
            if current_frame == 0:
                print(f'[Warning] CR Value Scheduler. No frame 0 found in schedule. Starting with default value at frame 0')
            (int_out, float_out) = (int(default_value), float(default_value))
        else:
            try:
                value = float(params)
                (int_out, float_out) = (int(value), float(value))
            except ValueError:
                print(f'[Warning] CR Value Scheduler. Invalid params: {params}')
                return ()
        return (int_out, float_out, show_help)
```