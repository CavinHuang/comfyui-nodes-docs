# Documentation
- Class name: CR_GradientFloat
- Category: Comfyroll/Animation/Interpolate
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_GradientFloat节点旨在在指定的持续时间内生成两个浮点值之间的平滑过渡。它根据开始和结束值、过渡开始的帧以及过渡的总持续时间计算当前值。这个节点特别适用于在时间上为动画参数创建动态变化。

# Input types
## Required
- start_value
    - 开始值参数定义了渐变的初始值。它对于设置过渡开始的基点至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_value
    - 结束值参数指定了渐变在过渡结束时将达到的最终值。它对于确定变化的范围至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_frame
    - 开始帧参数指示渐变过渡将开始的帧号。它对于定时动画效果的开始很重要。
    - Comfy dtype: INT
    - Python dtype: int
- frame_duration
    - 帧持续时间参数决定了渐变过渡发生的帧数。它影响过渡的速度。
    - Comfy dtype: INT
    - Python dtype: int
- current_frame
    - 当前帧参数表示序列中的当前帧号。它用于计算此时点渐变的当前状态。
    - Comfy dtype: INT
    - Python dtype: int
- gradient_profile
    - 渐变配置文件参数定义了用于渐变的插值方法类型。它影响开始和结束之间值的计算方式。
    - Comfy dtype: COMBO['Lerp']
    - Python dtype: str

# Output types
- FLOAT
    - FLOAT输出提供了当前帧渐变的计算值，代表过渡的当前状态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - show_help输出提供了指向节点文档页面的URL，提供有关其用法的额外信息和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_GradientFloat:

    @classmethod
    def INPUT_TYPES(s):
        gradient_profiles = ['Lerp']
        return {'required': {'start_value': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 0.01}), 'end_value': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 0.01}), 'start_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'frame_duration': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'gradient_profile': (gradient_profiles,)}}
    RETURN_TYPES = ('FLOAT', 'STRING')
    RETURN_NAMES = ('FLOAT', 'show_help')
    FUNCTION = 'gradient'
    CATEGORY = icons.get('Comfyroll/Animation/Interpolate')

    def gradient(self, start_value, end_value, start_frame, frame_duration, current_frame, gradient_profile):
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Interpolation-Nodes#cr-gradient-float'
        if current_frame < start_frame:
            return (start_value, show_help)
        if current_frame > start_frame + frame_duration:
            return (end_value, show_help)
        step = (end_value - start_value) / frame_duration
        current_step = current_frame - start_frame
        float_out = start_value + current_step * step
        return (float_out, show_help)
```