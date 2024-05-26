# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx3
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于给定的频率生成一组三个正弦曲线，这些曲线以零一模式交织在一起。它强调创建在零和一之间平滑过渡的周期性波形，重点是使用频率参数来控制曲线的周期性和整体形状。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线的周期性，影响波形峰谷的间距和重复。这对于定义生成曲线的节奏和韵律至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出是三个正弦曲线，每个曲线代表零一交织中的一个独特相位移动。这些曲线是节点功能的核心，作为处理的主要结果。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx3(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 3

    def main(self, frequency):
        return super().main(n=3, frequency=frequency)
```