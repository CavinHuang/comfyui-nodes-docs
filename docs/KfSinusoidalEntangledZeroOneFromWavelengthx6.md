# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx6
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点根据给定的波长生成一组六个具有不同相位差的纠缠正弦曲线。它强调创建在系统中过渡于零和一的复杂、和谐模式，便于分析振荡行为。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线的周期，影响了生成模式的频率和整体结构。它在定义振荡特性和峰值之间的间隔方面至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- curves
    - 输出包括六个正弦曲线，每个曲线代表振荡模式中的唯一相位。这些曲线对于理解节点对系统动态行为的贡献至关重要。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx6(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 6

    def main(self, wavelength):
        return super().main(n=6, wavelength=wavelength)
```