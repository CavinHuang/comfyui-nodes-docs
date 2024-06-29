# Documentation
- Class name: CR_SimpleSchedule
- Category: Comfyroll/Animation/Schedule
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimpleSchedule 是一个用于管理和组织动画工作流程中各种任务的时间表的节点。它处理输入的时间表，根据类型对它们进行分类，并为在不同上下文中使用进行格式化，确保了在 Comfyroll 中安排时间表的流程化方法。

# Input types
## Required
- schedule
    - ‘schedule’参数对于定义时间表的内容至关重要。它应该是一个包含多行的字符串，每行代表一个不同的时间表项目。此输入通过提供将被处理和格式化的原始数据来驱动节点的核心功能。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_type
    - ‘schedule_type’参数决定了时间表项的类别。它是一个关键组件，因为它决定了时间表在系统中的解释和使用方式。每种类型可能对应不同的处理机制或处理逻辑。
    - Comfy dtype: COMBO['Value', 'Text', 'Prompt', 'Prompt Weight', 'Model', 'LoRA', 'ControlNet', 'Style', 'Upscale', 'Camera', 'Job']
    - Python dtype: str
## Optional
- schedule_alias
    - ‘schedule_alias’参数为时间表提供了一个替代名称或标识符，这对于在更大的工作流程中引用或组织时间表非常有用。虽然不是必需的，但它为调度过程增加了一层灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- schedule_format
    - ‘schedule_format’参数指定了时间表的期望输出格式。它允许用户在不同的格式化样式之间进行选择，这对于与各种系统的兼容性或用户偏好至关重要。
    - Comfy dtype: COMBO['CR', 'Deforum']
    - Python dtype: str

# Output types
- SCHEDULE
    - ‘SCHEDULE’输出是包含元组的列表，每个元组包含一个时间表别名和输入时间表的相应行。此输出代表已处理和格式化的时间表，可供下游应用程序或系统使用。
    - Comfy dtype: LIST[Tuple[str, str]]
    - Python dtype: List[Tuple[str, str]]
- show_help
    - ‘show_help’输出提供了一个指向文档的URL链接，以获取更多帮助。对于需要更多关于如何使用节点或了解其功能信息的用户来说，这非常有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimpleSchedule:

    @classmethod
    def INPUT_TYPES(s):
        schedule_types = ['Value', 'Text', 'Prompt', 'Prompt Weight', 'Model', 'LoRA', 'ControlNet', 'Style', 'Upscale', 'Camera', 'Job']
        return {'required': {'schedule': ('STRING', {'multiline': True, 'default': 'frame_number, item_alias, [attr_value1, attr_value2]'}), 'schedule_type': (schedule_types,), 'schedule_alias': ('STRING', {'default': '', 'multiline': False}), 'schedule_format': (['CR', 'Deforum'],)}}
    RETURN_TYPES = ('SCHEDULE', 'STRING')
    RETURN_NAMES = ('SCHEDULE', 'show_help')
    FUNCTION = 'send_schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def send_schedule(self, schedule, schedule_type, schedule_alias, schedule_format):
        schedule_lines = list()
        if schedule != '' and schedule_alias != '':
            lines = schedule.split('\n')
            for line in lines:
                if not line.strip():
                    print(f'[Warning] CR Simple Schedule. Skipped blank line: {line}')
                    continue
                schedule_lines.extend([(schedule_alias, line)])
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-simple-schedule'
        return (schedule_lines, show_help)
```