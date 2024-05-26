# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx7
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点根据输入的波长生成一组七个独特的正弦曲线，每个曲线的相位偏移用于表示从波长派生的二进制序列。它强调创建一个结构化模式，该模式基于波长参数调整频率，在零和一之间振荡。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线的频率，影响生成序列的整体模式。它对节点的运行至关重要，因为它决定了二进制表示的粒度和周期性。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- KEYFRAMED_CURVE
    - 输出是七个正弦曲线的集合，每个曲线代表二进制序列中的唯一相位。这些曲线的组合提供了基于输入波长的纠缠零一模式的视觉和数值表示。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx7(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 7

    def main(self, wavelength):
        return super().main(n=7, wavelength=wavelength)
```