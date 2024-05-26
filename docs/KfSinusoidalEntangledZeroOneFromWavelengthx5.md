# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx5
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于提供的波长生成五组正弦波形的关键帧曲线，将零和一的值以有节奏的模式纠缠在一起。它强调创建周期性、振荡的数据结构，这些数据结构在指定的高低值之间平滑过渡。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线的周期，影响了整体振荡模式和连续峰值之间的距离。它对于定义生成曲线的频率和重复性至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- curves
    - 输出包括五条关键帧正弦曲线，每条曲线代表基于输入波长生成的正弦模式的独特部分。这些曲线对于节点的功能至关重要，提供了振荡的视觉和数值表示。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx5(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 5

    def main(self, wavelength):
        return super().main(n=5, wavelength=wavelength)
```