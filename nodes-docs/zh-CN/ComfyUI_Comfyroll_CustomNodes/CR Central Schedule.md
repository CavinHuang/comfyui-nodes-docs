# Documentation
- Class name: CR_CentralSchedule
- Category: Animation/Schedule
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

该节点通过整合多种类型的输入，包括文本、提示和模型，来创建和管理复杂的动画时间表，以生成动画执行的连贯和动态时间线。

# Input types
## Required
- schedule_1
    - 主要的调度文本，概述动画动作的顺序。它是节点操作的核心，因为它为时间表构建提供了基础。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_type1
    - 指定时间表的类型，影响节点如何解释和处理输入文本，影响动画时间表的整体结构和执行。
    - Comfy dtype: COMBO
    - Python dtype: str
- schedule_format
    - 决定最终时间表的呈现格式，影响动画时间表的可读性和可用性，以供进一步处理或审查。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- schedule_alias1
    - 第一个时间表的别名，可用于参考或标记目的，提高动画时间表的可读性和组织性。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_2
    - 补充主要时间表的额外时间表文本，允许更复杂的动画序列和动作层叠。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_type2
    - 为第二个时间表定义类型，指导节点处理并将其与主要时间表整合，形成一个全面的动画计划。
    - Comfy dtype: COMBO
    - Python dtype: str
- schedule_alias2
    - 第二个时间表的别名，有助于在动画时间线内识别和管理多个时间表。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_3
    - 第三个时间表文本，进一步扩展动画序列，使节点能够处理具有多个层和复杂时间的复杂动画。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_type3
    - 指示第三个时间表的类型，帮助节点在整体时间表内组织和执行额外的动画层。
    - Comfy dtype: COMBO
    - Python dtype: str
- schedule_alias3
    - 第三个时间表的别名，为涉及多个时间表的复杂动画序列提供清晰度和易于管理。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- SCHEDULE
    - 编译和格式化的动画时间表，以结构化格式封装动作和时间的顺序，用于动画系统中的执行。
    - Comfy dtype: SCHEDULE
    - Python dtype: Tuple[str, List[Tuple[str, str]]]
- show_text
    - 动画时间表的人类可读表示，提供序列和细节的清晰概览，供审查和参考。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_CentralSchedule:

    @classmethod
    def INPUT_TYPES(cls):
        schedule_types = ['Value', 'Text', 'Prompt', 'Prompt Weight', 'Model', 'LoRA', 'ControlNet', 'Style', 'Upscale', 'Camera', 'Job']
        return {'required': {'schedule_1': ('STRING', {'multiline': True, 'default': 'schedule'}), 'schedule_type1': (schedule_types,), 'schedule_alias1': ('STRING', {'multiline': False, 'default': ''}), 'schedule_2': ('STRING', {'multiline': True, 'default': 'schedule'}), 'schedule_type2': (schedule_types,), 'schedule_alias2': ('STRING', {'multiline': False, 'default': ''}), 'schedule_3': ('STRING', {'multiline': True, 'default': 'schedule'}), 'schedule_type3': (schedule_types,), 'schedule_alias3': ('STRING', {'multiline': False, 'default': ''}), 'schedule_format': (['CR', 'Deforum'],)}, 'optional': {'schedule': ('SCHEDULE',)}}
    RETURN_TYPES = ('SCHEDULE', 'STRING')
    RETURN_NAMES = ('SCHEDULE', 'show_text')
    FUNCTION = 'build_schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def build_schedule(self, schedule_1, schedule_type1, schedule_alias1, schedule_2, schedule_type2, schedule_alias2, schedule_3, schedule_type3, schedule_alias3, schedule_format, schedule=None):
        schedules = list()
        schedule_text = list()
        if schedule is not None:
            schedules.extend([l for l in schedule])
            (schedule_text.extend([l for l in schedule]),)
        if schedule_1 != '' and schedule_alias1 != '':
            lines = schedule_1.split('\n')
            for line in lines:
                (schedules.extend([(schedule_alias1, line)]),)
            (schedule_text.extend([schedule_alias1 + ',' + schedule_1 + '\n']),)
        if schedule_2 != '' and schedule_alias2 != '':
            lines = schedule_2.split('\n')
            for line in lines:
                (schedules.extend([(schedule_alias2, line)]),)
            (schedule_text.extend([schedule_alias2 + ',' + schedule_2 + '\n']),)
        if schedule_3 != '' and schedule_alias3 != '':
            lines = schedule_3.split('\n')
            for line in lines:
                (schedules.extend([(schedule_alias3, line)]),)
            (schedule_text.extend([schedule_alias3 + ',' + schedule_3 + '\n']),)
        show_text = ''.join(schedule_text)
        return (schedules, show_text)
```