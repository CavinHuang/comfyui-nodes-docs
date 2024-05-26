# Documentation
- Class name: PromptToSchedule
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

PromptToSchedule节点的'parse'方法旨在将文本提示解析并转换为结构化的时间表格式。此方法对于管理和组织提示到可进一步处理或在系统中执行的连贯时间表至关重要。它抽象了解析的复杂性，专注于将原始文本转换为可用格式。

# Input types
## Required
- text
    - 'text'参数对于'parse'方法至关重要，因为它表示需要解析为结构化时间表的原始文本输入。它是主要的输入，决定了节点的操作和解析过程的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- settings
    - 'settings'参数是提供给'parse'方法的可选配置，用于自定义解析行为。它允许根据特定要求或约束微调解析过程。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Output types
- PROMPT_SCHEDULE
    - 'parse'方法的输出是'PROMPT_SCHEDULE'，这是输入文本的结构化表示。这个输出很重要，因为它为任何依赖于解析时间表的后续操作或分析奠定了基础。
    - Comfy dtype: PROMPT_SCHEDULE
    - Python dtype: PromptSchedule

# Usage tips
- Infra type: CPU

# Source code
```
class PromptToSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True})}}
    RETURN_TYPES = ('PROMPT_SCHEDULE',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'parse'

    def parse(self, text, settings=None):
        schedules = parse_prompt_schedules(text)
        return (schedules,)
```