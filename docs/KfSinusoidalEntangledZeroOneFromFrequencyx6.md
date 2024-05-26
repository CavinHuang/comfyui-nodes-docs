# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx6
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于提供的频率生成一组六个相互纠缠的正弦曲线，每个曲线在零和一之间振荡。它强调创建保持一致相位关系的相互关联波形，以促进复杂模式的生成和分析。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线的振荡速度，影响生成波形的整体节奏和周期性。它对于定义输出的时间特征至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出包含六个正弦曲线，每个曲线代表输入频率的一种独特的相位移位解释。这些曲线是节点功能的核心，为进一步分析或可视化提供了丰富的数据集。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx6(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 6

    def main(self, frequency):
        return super().main(n=6, frequency=frequency)
```