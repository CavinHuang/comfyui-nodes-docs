# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx9
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfSinusoidalEntangledZeroOneFromFrequencyx9节点旨在生成一组九个正弦曲线，这些曲线相互纠缠，在零和一之间振荡。它利用keyframed库创建平滑且连续的转换。该节点的目的是提供一个多功能工具，用于生成可以在各种应用中使用的复杂波形，例如动画、信号处理或任何需要正弦波模式的场景。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线振荡的速率。它是形成节点生成的波形整体行为的关键要素。频率的变化将直接影响振荡的周期性和速度。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- KEYFRAMED_CURVE
    - KfSinusoidalEntangledZeroOneFromFrequencyx9节点的输出是九个关键帧正弦曲线的元组。每条曲线代表了纠缠波形内的一个独特振荡，作为整体复杂模式的一部分。这些曲线可以进一步操作或在下游流程中使用。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: Tuple[kf.SinusoidalCurve, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx9(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 9

    def main(self, frequency):
        return super().main(n=9, frequency=frequency)
```