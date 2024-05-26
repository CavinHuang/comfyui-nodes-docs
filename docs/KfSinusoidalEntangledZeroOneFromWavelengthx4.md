# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx4
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于输入的波长生成一组四个正弦曲线，这些曲线相互纠缠，创造出在零和一之间振荡的模式。它旨在为需要周期性但复杂波形的各种应用生成复杂的波形。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线的周期，影响生成波形的频率和整体形状。这是一个关键输入，因为它直接影响振荡的模式和规律性。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出包括四个纠缠的正弦曲线，每个曲线代表输入波长振荡模式的独特部分。这个输出非常重要，因为它为各种应用中的进一步分析或操作提供了基础。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx4(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 4

    def main(self, wavelength):
        return super().main(n=4, wavelength=wavelength)
```