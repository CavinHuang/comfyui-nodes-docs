# Documentation
- Class name: PCApplySettings
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

PCApplySettings节点的'apply'方法旨在通过应用一组设置来修改和增强提示计划的功能。它在系统内定制提示的行为中发挥关键作用，允许基于用户定义的参数进行定制化的响应和交互。

# Input types
## Required
- prompt_schedule
    - 参数'prompt_schedule'对于定义提示的结构和时间至关重要。它决定了提示在系统中的传递方式和时间，显著影响整体用户体验和交互流程。
    - Comfy dtype: PromptSchedule
    - Python dtype: PromptSchedule
- settings
    - 参数'settings'对于定制提示计划的行为至关重要。它允许用户调整各种方面，如过滤器、开始时间和默认值，以满足特定的需求或偏好。
    - Comfy dtype: SCHEDULE_SETTINGS
    - Python dtype: Dict[str, Any]

# Output types
- modified_prompt_schedule
    - 输出'modified_prompt_schedule'反映了应用设置后的更新提示计划。它标志着将指导系统中随后的提示传递和交互的新配置。
    - Comfy dtype: PromptSchedule
    - Python dtype: PromptSchedule

# Usage tips
- Infra type: CPU

# Source code
```
class PCApplySettings:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt_schedule': ('PROMPT_SCHEDULE',), 'settings': ('SCHEDULE_SETTINGS',)}}
    RETURN_TYPES = ('PROMPT_SCHEDULE',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, prompt_schedule, settings):
        return (prompt_schedule.with_filters(defaults=settings),)
```