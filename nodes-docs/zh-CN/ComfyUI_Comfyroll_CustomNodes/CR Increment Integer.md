# Documentation
- Class name: CR_IncrementInteger
- Category: Comfyroll/Animation/Interpolate
- Output node: True
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_IncrementInteger 节点旨在在指定的帧持续时间内从一个给定的帧开始递增一个整数值。它特别适用于创建动画，其中数值需要随时间逐步增加。

# Input types
## Required
- start_value
    - start_value 参数定义了递增开始的初始整数值。它对于设置动画序列的起始点至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- step
    - step 参数指定了每个帧start_value递增的量。它决定了整个动画中整数值的变化速率。
    - Comfy dtype: INT
    - Python dtype: int
- start_frame
    - start_frame 参数指示递增开始的帧号。它对于定时动画的开始至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- frame_duration
    - frame_duration 参数设置了递增发生的帧数。它决定了动画序列的长度。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - current_frame 参数代表动画中的当前帧号。它用于根据帧的进展计算整数值的当前值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- INT
    - INT 输出提供了递增后的当前整数值，反映了当前帧动画的进度。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - show_help 输出是一个包含指向节点文档URL的字符串，提供有关其用法的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_IncrementInteger:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'start_value': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'step': ('INT', {'default': 1.0, 'min': -9999.0, 'max': 9999.0, 'step': 1.0}), 'start_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'frame_duration': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    OUTPUT_NODE = True
    FUNCTION = 'increment'
    CATEGORY = icons.get('Comfyroll/Animation/Interpolate')

    def increment(self, start_value, step, start_frame, frame_duration, current_frame):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-increment-integer'
        if current_frame < start_frame:
            return (start_value, show_help)
        current_value = start_value + (current_frame - start_frame) * step
        if current_frame <= start_frame + frame_duration:
            current_value += step
            return (current_value, show_help)
        return (current_value, show_help)
```