# Documentation
- Class name: CR_PromptScheduler
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_PromptScheduler 是一个用于管理和根据关键帧或预定义的时间表调度提示的节点。它允许用户设置默认提示，插值提示之间，并自定义调度格式以满足各种需求。该节点的功能集中在为动画或其他基于时间的应用程序提供一种处理动态提示的无缝方式。

# Input types
## Required
- mode
    - 模式决定了节点使用的调度方法。它决定了是应用默认提示，遵循关键帧列表，还是实现了更复杂的调度。
    - Comfy dtype: COMBO['Default Prompt', 'Keyframe List', 'Schedule']
    - Python dtype: str
- current_frame
    - 当前帧是调度器确定要应用哪个提示的参考点。它对节点的执行至关重要，因为它直接影响根据提供的时间表选择提示。
    - Comfy dtype: INT
    - Python dtype: int
- default_prompt
    - 默认提示在当前帧没有安排特定提示时作为备用文本。它确保即使在没有定义的时间表的情况下，也总是有一个可用的提示。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_format
    - 时间表格式指定了输入时间表数据的结构。它很重要，因为它通知节点如何解释和处理用户提供的时间表信息。
    - Comfy dtype: COMBO['CR', 'Deforum']
    - Python dtype: str
- interpolate_prompt
    - 插值提示确定节点是否应该在提示之间进行插值，以实现更平滑的过渡。这可以增强使用提示的动画或应用程序的流畅性。
    - Comfy dtype: COMBO['Yes', 'No']
    - Python dtype: str
## Optional
- keyframe_list
    - 关键帧列表提供多行输入，用于定义关键帧及其关联的提示。当模式设置为'关键帧列表'时使用，对于创建特定帧的提示至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prepend_text
    - 前置文本允许用户在提示前添加自定义文本。这对于在主要提示旁边包含额外的上下文或信息非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- append_text
    - 追加文本允许在提示后添加自定义文本。它提供了灵活性，可以扩展提示以包含更多详细信息，或者用特定的结尾结束提示。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- current_prompt
    - 当前提示代表根据调度器的评估当前处于活动状态的提示。它是在应用程序或动画中直接使用的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- next_prompt
    - 下一个提示指示下一帧将处于活动状态的提示。这对于预览或准备提示序列中即将发生的变化非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - 权重是一个浮点值，代表提示之间的过渡进度。当插值提示设置为'是'时，它特别相关，表示插值的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - 显示帮助提供与节点相关联的文档或帮助页面的URL链接。它作为用户寻求有关节点的更多信息或帮助的快速参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_PromptScheduler:

    @classmethod
    def INPUT_TYPES(s):
        modes = ['Default Prompt', 'Keyframe List', 'Schedule']
        return {'required': {'mode': (modes,), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'default_prompt': ('STRING', {'multiline': False, 'default': 'default prompt'}), 'schedule_format': (['CR', 'Deforum'],), 'interpolate_prompt': (['Yes', 'No'],)}, 'optional': {'schedule': ('SCHEDULE',), 'schedule_alias': ('STRING', {'default prompt': '', 'multiline': False}), 'keyframe_list': ('STRING', {'multiline': True, 'default': 'keyframe list'}), 'prepend_text': ('STRING', {'multiline': True, 'default': 'prepend text'}), 'append_text': ('STRING', {'multiline': True, 'default': 'append text'})}}
    RETURN_TYPES = ('STRING', 'STRING', 'FLOAT', 'STRING')
    RETURN_NAMES = ('current_prompt', 'next_prompt', 'weight', 'show_help')
    FUNCTION = 'schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def schedule(self, mode, prepend_text, append_text, current_frame, schedule_alias, default_prompt, schedule_format, interpolate_prompt, keyframe_list='', schedule=None):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-prompt-scheduler'
        schedule_lines = list()
        if mode == 'Default Prompt':
            print(f'[Info] CR Prompt Scheduler: Scheduler {schedule_alias} is disabled')
            return (default_prompt, default_prompt, 1.0, show_help)
        if mode == 'Keyframe List':
            if keyframe_list == '':
                print(f'[Error] CR Prompt Scheduler: No keyframe list found.')
                return ()
            else:
                lines = keyframe_list.split('\n')
                for line in lines:
                    if schedule_format == 'Deforum':
                        line = line.replace(':', ',')
                        line = line.rstrip(',')
                        line = line.lstrip()
                    if not line.strip():
                        print(f'[Warning] CR Simple Prompt Scheduler. Skipped blank line at line {i}')
                        continue
                    schedule_lines.extend([(schedule_alias, line)])
                schedule = schedule_lines
        if mode == 'Schedule':
            if schedule is None:
                print(f'[Error] CR Prompt Scheduler: No schedule found.')
                return ()
            if schedule_format == 'Deforum':
                for item in schedule:
                    (alias, line) = item
                    line = line.replace(':', ',')
                    line = line.rstrip(',')
                    schedule_lines.extend([(schedule_alias, line)])
                schedule = schedule_lines
        (current_prompt, next_prompt, current_keyframe, next_keyframe) = prompt_scheduler(schedule, schedule_alias, current_frame)
        if current_prompt == '':
            print(f'[Warning] CR Simple Prompt Scheduler. No prompt found for frame. Schedules should start at frame 0.')
        else:
            try:
                current_prompt_out = prepend_text + ', ' + str(current_prompt) + ', ' + append_text
                next_prompt_out = prepend_text + ', ' + str(next_prompt) + ', ' + append_text
                from_index = int(current_keyframe)
                to_index = int(next_keyframe)
            except ValueError:
                print(f'[Warning] CR Simple Text Scheduler. Invalid keyframe at frame {current_frame}')
        if from_index == to_index or interpolate_prompt == 'No':
            weight_out = 1.0
        else:
            weight_out = (to_index - current_frame) / (to_index - from_index)
        return (current_prompt_out, next_prompt_out, weight_out, show_help)
```