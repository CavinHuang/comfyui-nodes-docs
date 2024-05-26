# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx9
- Category: core
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfSinusoidalEntangledZeroOneFromWavelengthx9节点基于给定的波长生成一组九个正弦曲线，这些曲线相互纠缠，在零和一之间振荡。此节点特别适用于创建需要多个交织频率的复杂模式。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦波振荡的周期，对于设置生成曲线的频率至关重要。它直接影响输出模式的总体形状和周期性。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- KEYFRAMED_CURVE
    - 此节点的输出是九个关键帧正弦曲线的元组。每条曲线都被设计为对复合波形提供独特的贡献，提供丰富的振荡组合。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: Tuple[kf.SinusoidalCurve, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx9(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 9

    def main(self, wavelength):
        return super().main(n=9, wavelength=wavelength)
```