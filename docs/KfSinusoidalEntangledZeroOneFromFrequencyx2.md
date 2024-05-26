# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx2
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于提供的频率生成一对纠缠的正弦曲线，这些曲线从零过渡到一再回到零。它强调创建表现出特定周期行为的平滑、周期性函数，对于需要振荡模式的各种应用非常有用。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线的周期性，影响了曲线振荡的速度以及峰值之间的距离。它对于定义生成曲线的整体节奏和速度非常关键。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出包含两个纠缠的关键帧正弦曲线，它们展示了从零到一的振荡模式。这些曲线是节点功能的核心，代表了处理的主要结果。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx2(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 2

    def main(self, frequency):
        return super().main(n=2, frequency=frequency)
```