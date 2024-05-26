# Documentation
- Class name: KfSinusoidalAdjustAmplitude
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在调整正弦曲线的振幅，允许对形状进行微调，而不会改变其基本属性，如波长和相位。它强调节点在为各种应用微调曲线动态中的作用。

# Input types
## Required
- curve
    - 曲线参数是必要的，因为它定义了要调整振幅的基础正弦曲线。它直接影响输出，决定了修改后的曲线的形状和特征。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve
## Optional
- adjustment
    - 调整参数用于修改正弦曲线的振幅，允许对曲线的峰值和谷值进行精确控制。它在根据特定要求定制曲线方面起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出曲线是修改后的正弦曲线，具有调整后的振幅，代表了节点操作的结果。它很重要，因为它传达了可以用于进一步处理或分析的最终形状。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- sinusoidal_curve
    - 这个输出与修改后的曲线相同，强调节点的主要功能是在保留曲线其他属性的同时调整振幅。它对于需要最终正弦形状的应用非常有用。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalAdjustAmplitude:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE', 'SINUSOIDAL_CURVE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True}), 'adjustment': ('FLOAT', {'default': 0, 'step': 0.01})}}

    def main(self, curve, adjustment):
        (wavelength, phase, amplitude) = (curve.wavelength, curve.phase, curve.amplitude)
        amplitude += adjustment
        curve = kf.SinusoidalCurve(wavelength=wavelength, phase=phase, amplitude=amplitude)
        return (curve, curve)
```