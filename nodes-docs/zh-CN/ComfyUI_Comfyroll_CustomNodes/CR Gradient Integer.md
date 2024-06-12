# Documentation
- Class name: CR_GradientInteger
- Category: Comfyroll/Animation/Interpolate
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_GradientInteger节点提供了一种方法，用于在指定的持续时间内，通过起始帧和帧持续时间，对两个整数值进行插值。它旨在提供从起始值到结束值的平滑过渡，这在动画和基于时间的视觉效果中特别有用。

# Input types
## Required
- start_value
    - 起始整数值，插值从这个值开始。它对于建立过渡的初始条件至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- end_value
    - 插值旨在达到的结束整数值。它定义了帧持续时间过后过渡的最终状态。
    - Comfy dtype: INT
    - Python dtype: int
- start_frame
    - 插值应该开始的帧号。它对于将过渡与动画或序列的时间线同步至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- frame_duration
    - 插值发生的总帧数。它决定了起始值和结束值之间过渡的长度。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - 要进行插值的序列中的当前帧。它用于计算过渡过程中的当前步骤。
    - Comfy dtype: INT
    - Python dtype: int
- gradient_profile
    - 插值配置文件，定义了起始值和结束值之间变化的速率。它影响过渡随时间的进展方式。
    - Comfy dtype: COMBO['Lerp']
    - Python dtype: str

# Output types
- INT
    - 当前帧的插值整数值，是起始值和结束值之间过渡的结果。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - 提供对插值过程的附加文档或帮助的URL字符串。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_GradientInteger:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ['Lerp']
        return {'required': {'start_value': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'end_value': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'start_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'frame_duration': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'gradient_profile': (gradient_profiles,)}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    FUNCTION = 'gradient'
    CATEGORY = icons.get('Comfyroll/Animation/Interpolate')

    def gradient(self, start_value, end_value, start_frame, frame_duration, current_frame, gradient_profile):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-gradient-integer'
        if current_frame < start_frame:
            return (start_value, show_help)
        if current_frame > start_frame + frame_duration:
            return (end_value, show_help)
        step = (end_value - start_value) / frame_duration
        current_step = current_frame - start_frame
        int_out = start_value + int(current_step * step)
        return (int_out, show_help)
```