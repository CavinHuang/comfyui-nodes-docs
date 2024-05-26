# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx7
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点根据输入的基本频率生成一组七个纠缠的正弦曲线，每个曲线在零和一之间振荡。它强调为信号处理或可视化中的各种应用创建复杂、同步的波形。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线的振荡速率，影响生成波形的整体模式和周期性。它对于定义输出的时间特性至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出包括七个正弦曲线，每个曲线根据输入频率表示一个独特的相位移动和振幅。这些曲线对节点的功能至关重要，为进一步分析或操作提供了丰富的数据点集。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx7(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 7

    def main(self, frequency):
        return super().main(n=7, frequency=frequency)
```