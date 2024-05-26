# Documentation
- Class name: ValueSchedule
- Category: FizzNodes 📅🅕🅝/ScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

ValueSchedule节点旨在根据给定的关键帧文本表示来动画化和插值。它通过解析输入文本来确定关键帧值，然后在这些关键帧之间进行插值，以在指定的帧数上产生平滑的值过渡。

# Input types
## Required
- text
    - ‘text’参数是一个包含用于动画化值的关键帧定义的字符串。它对节点的操作至关重要，因为它直接影响输出动画序列。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- max_frames
    - ‘max_frames’参数指定动画发生的总帧数。它对于确定插值范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - ‘current_frame’参数表示动画序列中的当前位置。它对于计算动画当前状态的插值非常重要。
    - Comfy dtype: INT
    - Python dtype: int
- print_output
    - 当设置为True时，‘print_output’参数启用将当前帧及其插值打印到控制台。这对于调试非常有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- value
    - ‘value’输出代表当前帧的插值。这是节点的主要输出，对于继续动画或进一步处理至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_number
    - ‘frame_number’输出提供动画序列中的当前帧索引。它可以用于跟踪动画的进度。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ValueSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultValue}), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/ScheduleNodes'

    def animate(self, text, max_frames, current_frame, print_output):
        current_frame = current_frame % max_frames
        t = get_inbetweens(parse_key_frames(text, max_frames), max_frames)
        if print_output is True:
            print('ValueSchedule: ', current_frame, '\n', 'current_frame: ', current_frame)
        return (t[current_frame], int(t[current_frame]))
```