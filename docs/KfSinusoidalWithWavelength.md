# Documentation
- Class name: KfSinusoidalWithWavelength
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点生成具有可定制波长、相位和振幅的正弦曲线，便于为各种应用创建周期性波形。

# Input types
## Required
- wavelength
    - 波长决定了正弦曲线的周期，影响其整体长度和峰值之间的间距。
    - Comfy dtype: FLOAT
    - Python dtype: float
- phase
    - 相位沿时间线移动正弦曲线，改变其峰值和低谷相对于起点的时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅控制正弦曲线峰值和低谷的大小，影响其振荡的程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出是一个代表正弦波形的关键帧曲线对象，可供进一步操作或可视化。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.KfCurve
- sinusoidal_curve
    - 这是根据输入参数派生出的正弦曲线，封装了生成的波形，以便在各种上下文中使用。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: keyframed.SinusoidalCurve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalWithWavelength:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE', 'SINUSOIDAL_CURVE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'wavelength': ('FLOAT', {'default': 12, 'step': 0.5}), 'phase': ('FLOAT', {'default': 0.0, 'step': 0.1308996939}), 'amplitude': ('FLOAT', {'default': 1, 'step': 0.01})}}

    def main(self, wavelength, phase, amplitude):
        curve = kf.SinusoidalCurve(wavelength=wavelength, phase=phase, amplitude=amplitude)
        return (curve, curve)
```