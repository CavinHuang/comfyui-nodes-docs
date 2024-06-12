# Documentation
- Class name: PromptScheduleNodeFlow
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

该节点旨在根据给定的帧数操作和调度字符串。它允许用户在特定的帧间隔添加或修改文本内容，这对于需要对信息进行时间结构化的应用至关重要。

# Input types
## Required
- text
    - ‘text’参数对于定义要添加到日程中的内容至关重要。它影响信息在指定帧中的结构和呈现方式。
    - Comfy dtype: STRING
    - Python dtype: str
- num_frames
    - ‘num_frames’参数表示执行操作时的当前帧数。它对于计算添加或修改文本后的新的最大帧数至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- in_text
    - 可选的‘in_text’参数允许修改日程中现有的文本条目。它在更新日程时起着重要作用，避免了重复创建。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - ‘max_frames’参数用于指定应该添加或修改文本的最大帧数。它直接影响文本在日程中的时间位置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- new_max
    - ‘new_max’输出表示添加或修改文本后更新的最大帧数。它标志着日程中的新时间边界。
    - Comfy dtype: INT
    - Python dtype: int
- new_text
    - ‘new_text’输出是添加或修改后日程的更新文本内容。它反映了在指定帧上对文本所做的更改。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptScheduleNodeFlow:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True}), 'num_frames': ('INT', {'default': 24.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}, 'optional': {'in_text': ('STRING', {'multiline': False}), 'max_frames': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0})}}
    RETURN_TYPES = ('INT', 'STRING')
    FUNCTION = 'addString'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def addString(self, text, in_text='', max_frames=0, num_frames=0):
        if in_text:
            in_text = in_text.rstrip(',')
        new_max = num_frames + max_frames
        if max_frames == 0:
            new_text = in_text + (', ' if in_text else '') + f'"{max_frames}": "{text}"'
        else:
            new_text = in_text + (', ' if in_text else '') + f'"{new_max}": "{text}"'
        return (new_max, new_text)
```