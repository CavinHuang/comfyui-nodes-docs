# Documentation
- Class name: BatchValueSchedule
- Category: FizzNodes 📅🅕🅝/BatchScheduleNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

BatchValueSchedule节点旨在管理和插值指定帧范围内的关键帧值。它处理表示关键帧的文本输入，并为每个帧插值，直到达到最大帧数，提供指定值之间的平滑过渡。这个节点特别适用于创建动态序列，其中每个帧的确切值不是预先确定的，而是基于给定的关键帧进行计算。

# Input types
## Required
- text
    - text参数是一个定义动画关键帧的字符串。它至关重要，因为它直接影响将在帧序列中进行插值的值。格式应该正确结构化，以确保准确的插值。
    - Comfy dtype: STRING
    - Python dtype: str
- max_frames
    - max_frames参数指定要考虑插值的帧数的上限。它是一个重要的参数，因为它决定了关键帧值分布的范围。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- print_output
    - print_output参数是一个可选的布尔值，设置为True时，将打印插值结果到控制台。这对于调试很有帮助，可以验证插值的输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- interpolated_values
    - interpolated_values输出提供了基于关键帧和插值方法计算的每个帧的值。这个输出很重要，因为它代表了节点生成的最终值序列。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- frame_numbers
    - frame_numbers输出是与插值值相对应的帧号列表。它对于将生成的值映射回各自的帧以进行进一步处理或分析很有用。
    - Comfy dtype: INT
    - Python dtype: List[int]

# Usage tips
- Infra type: CPU

# Source code
```
class BatchValueSchedule:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'text': ('STRING', {'multiline': True, 'default': defaultValue}), 'max_frames': ('INT', {'default': 120.0, 'min': 1.0, 'max': 999999.0, 'step': 1.0}), 'print_output': ('BOOLEAN', {'default': False})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'animate'
    CATEGORY = 'FizzNodes 📅🅕🅝/BatchScheduleNodes'

    def animate(self, text, max_frames, print_output):
        t = batch_get_inbetweens(batch_parse_key_frames(text, max_frames), max_frames)
        if print_output is True:
            print('ValueSchedule: ', t)
        return (t, list(map(int, t)))
```