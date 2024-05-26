# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx3
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于输入的波长生成一组三个相互纠缠的正弦曲线，创建一个在零和一之间振荡的复杂模式。它旨在引入适合需要复杂波形的应用的高度周期性变化。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线的周期，影响生成模式的整体复杂性和频率。这是一个关键输入，因为它直接影响曲线的空间特性。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- curves
    - 输出包含三条正弦曲线，每条曲线都有其独特的相位和振幅，这些是从输入波长派生出来的。这些曲线是节点功能的核心，代表了处理的主要结果。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx3(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 3

    def main(self, wavelength):
        return super().main(n=3, wavelength=wavelength)
```