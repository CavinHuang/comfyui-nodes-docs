# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx8
- Category: math
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfSinusoidalEntangledZeroOneFromFrequencyx8节点根据给定的频率生成八个纠缠的正弦曲线。每条曲线都被设计为在零和一之间振荡，具有相位偏移以确保它们的纠缠。该节点的目的是创建一个复杂的振荡模式，可以用于需要同步但不同波形的各种应用。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线振荡的速率。它对于设置曲线的整体模式至关重要，并影响每个振荡的周期和振幅。频率越高，振荡就越快。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- KEYFRAMED_CURVE
    - KfSinusoidalEntangledZeroOneFromFrequencyx8节点的输出是八个关键帧正弦曲线。每条曲线代表一个独特的振荡模式，与其他曲线纠缠，为进一步的操作或分析提供了丰富的波形集。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx8(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 8

    def main(self, frequency):
        return super().main(n=8, frequency=frequency)
```