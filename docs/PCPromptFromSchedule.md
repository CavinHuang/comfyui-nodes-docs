# Documentation
- Class name: PCPromptFromSchedule
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

该节点旨在根据指定的时间点从预定义的时间表中提取并应用提示，确保生成的提示在上下文中相关且及时。

# Input types
## Required
- prompt_schedule
    - 提示时间表是关键输入，概述了随时间变化的提示的结构和内容。这对于节点的正确功能和产生有意义的输出至关重要。
    - Comfy dtype: PROMPT_SCHEDULE
    - Python dtype: <class 'lark.prompt_schedule.PromptSchedule'>
- at
    - 'at' 参数精确指定了从时间表中提取提示的时间点。它直接影响选择的提示及其相关性。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- tags
    - 'tags' 参数允许根据特定标签过滤提示时间表，这可以细化输出以针对特定主题或类别。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- prompt
    - 输出 'prompt' 是在指定时间从时间表中选择的提示，它作为进一步处理或分析的基础。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PCPromptFromSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt_schedule': ('PROMPT_SCHEDULE',), 'at': ('FLOAT', {'min': 0.0, 'max': 1.0, 'step': 0.01})}, 'optional': {'tags': ('STRING', {'default': ''})}}
    RETURN_TYPES = ('STRING',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, prompt_schedule, at, tags=''):
        p = prompt_schedule.with_filters(tags, start=at, end=at).parsed_prompt[-1][1]
        log.info('Prompt at %s:\n%s', at, p['prompt'])
        log.info('LoRAs: %s', p['loras'])
        return (p['prompt'],)
```