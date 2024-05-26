# Documentation
- Class name: KfSinusoidalAdjustFrequency
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点允许对正弦曲线的频率进行微调，提供对振荡速度的控制，而不会改变波形的整体形状。

# Input types
## Required
- curve
    - 输入曲线参数是必不可少的，因为它定义了将要调整频率的基础正弦曲线。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve
## Optional
- adjustment
    - 调整参数用于通过指定的值修改曲线的频率，影响整体的振荡速度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出是调整后的正弦曲线，反映了基于输入参数的频率变化。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.SinusoidalCurve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalAdjustFrequency:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE', 'SINUSOIDAL_CURVE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True}), 'adjustment': ('FLOAT', {'default': 0, 'step': 0.01})}}

    def main(self, curve, adjustment):
        (wavelength, phase, amplitude) = (curve.wavelength, curve.phase, curve.amplitude)
        frequency = 1 / wavelength
        frequency += adjustment
        wavelength = 1 / frequency
        curve = kf.SinusoidalCurve(wavelength=wavelength, phase=phase, amplitude=amplitude)
        return (curve, curve)
```