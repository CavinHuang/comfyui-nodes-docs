# Documentation
- Class name: KfSinusoidalWithFrequency
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点生成具有可调节频率、相位和振幅的正弦曲线，模拟周期性运动模式。它旨在为用户在项目中创建平滑、振荡的过渡提供多功能工具。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线振荡的速率，较高的值会导致更快、更频繁的周期。这对于设置动画的节奏和节奏至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- phase
    - 相位参数沿着时间线移动正弦曲线，允许控制振荡的起始点。这对于将动作与动画中的特定事件或动作对齐至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅参数控制振荡的范围，决定了正弦曲线的峰值和谷值。它影响动作的整体强度和幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出是一个包含正弦模式的关键帧曲线对象，可以用于各种动画和模拟场景。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.SinusoidalCurve
- sinusoidal_curve
    - 该输出以可以直接应用于视觉元素的格式提供了正弦曲线，提供了振荡的平滑且动态的表示。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: keyframed.SinusoidalCurve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalWithFrequency:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE', 'SINUSOIDAL_CURVE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'frequency': ('FLOAT', {'default': 1 / 12, 'step': 0.01}), 'phase': ('FLOAT', {'default': 0.0, 'step': 0.1308996939}), 'amplitude': ('FLOAT', {'default': 1, 'step': 0.01})}}

    def main(self, frequency, phase, amplitude):
        curve = kf.SinusoidalCurve(frequency=frequency, phase=phase, amplitude=amplitude)
        return (curve, curve)
```