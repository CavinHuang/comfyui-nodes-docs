# Documentation
- Class name: KfSinusoidalAdjustWavelength
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

此类节点提供了一种调整正弦曲线波长的方法，有效地改变了其周期，而不影响相位或振幅等其他特性。调整以一种保持曲线整体形状的方式应用，确保平滑连续的变换，适用于需要微调曲线时间特性的各种应用场景。

# Input types
## Required
- curve
    - 输入曲线参数是必要的，它定义了要调整波长的基正弦曲线。该参数直接影响到节点处理的输入，决定了在进行任何调整之前曲线的起始特性。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve
## Optional
- adjustment
    - 调整参数作为波长调整的乘数，允许精确控制应用于曲线的变化程度。它在微调正弦曲线的时间特性方面起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- curve
    - 输出代表调整后的正弦曲线，反映了节点处理的结果。它很重要，因为它提供了可以用于后续操作或可视化的更新曲线。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.KeyframedCurve
- sinusoidal_curve
    - 此输出与'curve'输出相同，提供了进一步使用的调整后的正弦曲线。它确保用户能够访问到以其新形式的修改曲线，适合集成到各种工作流程中。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.SinusoidalCurve

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalAdjustWavelength:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE', 'SINUSOIDAL_CURVE')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True}), 'adjustment': ('FLOAT', {'default': 0.0, 'step': 0.5})}}

    def main(self, curve, adjustment):
        (wavelength, phase, amplitude) = (curve.wavelength, curve.phase, curve.amplitude)
        wavelength += adjustment
        curve = kf.SinusoidalCurve(wavelength=wavelength, phase=phase, amplitude=amplitude)
        return (curve, curve)
```