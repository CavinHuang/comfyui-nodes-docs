# Documentation
- Class name: Comfyroll_ScheduleInputSwitch
- Category: Comfyroll/Animation/Schedule
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

Comfyroll_ScheduleInputSwitch 节点旨在根据输入值在两个不同的时间表之间进行选择。它允许在工作流程中进行条件执行，使用户能够根据提供的输入指导操作流程。此节点在编排复杂动画中发挥关键作用，通过确定要遵循的时间表来实现。

# Input types
## Required
- Input
    - ‘Input’参数对于确定将执行哪个时间表至关重要。它根据其值决定动画的流程，该值可以是1到2。此参数对于节点的决策过程至关重要，直接影响操作的结果。
    - Comfy dtype: INT
    - Python dtype: int
- schedule1
    - ‘schedule1’参数代表节点可以选择的第一个时间表。它是节点决策过程中的关键组成部分，当输入值为1时，为动画序列提供替代路径。
    - Comfy dtype: SCHEDULE
    - Python dtype: Schedule
- schedule2
    - ‘schedule2’参数是节点可用的第二个时间表选项。当输入值不为1时，它变得重要，并根据此时间表指导动画的后续步骤。
    - Comfy dtype: SCHEDULE
    - Python dtype: Schedule

# Output types
- SCHEDULE
    - ‘SCHEDULE’输出是基于提供给节点的输入选定的时间表。它是节点操作的核心结果，指导动画工作流中的后续步骤。
    - Comfy dtype: SCHEDULE
    - Python dtype: Schedule
- show_help
    - 'show_help'输出提供了一个指向wiki页面的URL，该页面提供了关于节点功能的额外指导和信息。它作为寻求如何有效使用节点的用户的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class Comfyroll_ScheduleInputSwitch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'Input': ('INT', {'default': 1, 'min': 1, 'max': 2}), 'schedule1': ('SCHEDULE',), 'schedule2': ('SCHEDULE',)}}
    RETURN_TYPES = ('SCHEDULE', 'STRING')
    RETURN_NAMES = ('SCHEDULE', 'show_help')
    OUTPUT_NODE = True
    FUNCTION = 'switch'
    CATEGORY = icons.get('Comfyroll/Animation/Schedule')

    def switch(self, Input, schedule1, schedule2):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-schedule-input-switch'
        if Input == 1:
            return (schedule1, show_help)
        else:
            return (schedule2, show_help)
```