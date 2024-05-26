# Documentation
- Class name: KfSinusoidalAdjustPhase
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在修改正弦曲线的相位，允许对波的时机进行调整，而不会改变其基本特征，如波长和振幅。

# Input types
## Required
- curve
    - 输入曲线参数是必要的，因为它定义了将要被节点操作调整相位的基础正弦曲线。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve
## Optional
- adjustment
    - 调整参数是一个浮点值，它影响应用于输入曲线的相位移位的程度，影响波的时机。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出代表相位已调整的修改后的正弦曲线，它可以在需要动态波调整的各种应用中进一步使用。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- sinusoidal_curve
    - 这个输出与修改后的正弦曲线相同，为下游过程提供了相位调整波的一致表示。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalAdjustPhase:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE', 'SINUSOIDAL_CURVE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True}), 'adjustment': ('FLOAT', {'default': 0.0, 'step': 0.1308996939})}}

    def main(self, curve, adjustment):
        (wavelength, phase, amplitude) = (curve.wavelength, curve.phase, curve.amplitude)
        phase += adjustment
        curve = kf.SinusoidalCurve(wavelength=wavelength, phase=phase, amplitude=amplitude)
        return (curve, curve)
```