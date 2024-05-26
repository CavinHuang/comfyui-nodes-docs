# Documentation
- Class name: FilterSchedule
- Category: promptcontrol
- Output node: False
- Repo Ref: https://github.com/asagi4/comfyui-prompt-control.git

FilterSchedule类提供了一种根据指定条件细化和缩小一组提示的方法，提高了选择过程的精确性，并确保输出与期望的参数一致。

# Input types
## Required
- prompt_schedule
    - prompt_schedule参数是必要的，它定义了将要被过滤的提示的基本集。它是过滤过程的起点，决定了将要进行精炼选择的内容池。
    - Comfy dtype: PROMPT_SCHEDULE
    - Python dtype: <class 'lark.parser.Parser'>
## Optional
- tags
    - tags参数作为一个过滤器，允许用户指定用于缩小提示选择的特定关键词。它在将输出引向更有针对性的内容集方面发挥着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str
- start
    - start参数用于定义选择提示的范围的开始。它与end参数一起工作，限制选择过程，确保只考虑指定范围内的提示。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end
    - end参数与start参数一起使用，设置了可以选择的提示范围的上限。它通过专注于内容的特定子集来进一步细化输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- filtered_prompt_schedule
    - 输出filtered_prompt_schedule是将过滤条件应用于原始提示计划的结果。它代表了一组经过精炼且更符合用户指定偏好的提示。
    - Comfy dtype: PROMPT_SCHEDULE
    - Python dtype: <class 'lark.parser.Parser'>

# Usage tips
- Infra type: CPU

# Source code
```
class FilterSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'prompt_schedule': ('PROMPT_SCHEDULE',)}, 'optional': {'tags': ('STRING', {'default': ''}), 'start': ('FLOAT', {'min': 0.0, 'max': 1.0, 'default': 0.0, 'step': 0.01}), 'end': ('FLOAT', {'min': 0.0, 'max': 1.0, 'default': 1.0, 'step': 0.01})}}
    RETURN_TYPES = ('PROMPT_SCHEDULE',)
    CATEGORY = 'promptcontrol'
    FUNCTION = 'apply'

    def apply(self, prompt_schedule, tags='', start=0.0, end=1.0):
        p = prompt_schedule.with_filters(tags, start=start, end=end)
        log.debug(f'Filtered {prompt_schedule.parsed_prompt} with: ({tags}, {start}, {end}); the result is %s', p.parsed_prompt)
        return (p,)
```