# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx8
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点根据给定的波长生成一组八个正弦曲线，每个曲线都有不同的相位偏移。主要目的是创建一个在指定波长内振荡的零和一值的纠缠模式，为生成各种应用的复杂波形提供便利。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线一个完整周期的长度。它非常重要，因为它直接影响生成波形的频率和周期，从而影响曲线的整体模式和行为。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出包括八个正弦曲线，每个曲线在指定波长内代表一个独特的相位偏移。这些曲线对节点的功能至关重要，因为它们为下游过程中的进一步分析或操作提供了基础。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx8(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 8

    def main(self, wavelength):
        return super().main(n=8, wavelength=wavelength)
```