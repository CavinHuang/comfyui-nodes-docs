# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx4
- Category: core
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfSinusoidalEntangledZeroOneFromFrequencyx4节点旨在根据给定频率生成多个纠缠的正弦曲线。它通过创建四个不同的正弦曲线来操作，每个曲线都有从输入频率派生的独特相位偏移和振幅。该节点特别适用于需要生成复杂、相互关联波形的应用。

# Input types
## Required
- frequency
    - 频率参数对于确定正弦曲线振荡的基本速率至关重要。它直接影响节点的输出，影响生成曲线的形状和周期性。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- KEYFRAMED_CURVE
    - 节点的输出是一组四个关键帧正弦曲线。每条曲线代表一个独特的振荡模式，与其他曲线相互纠缠，形成一个复杂的波形结构。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx4(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 4

    def main(self, frequency):
        return super().main(n=4, frequency=frequency)
```