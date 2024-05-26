# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromFrequencyx5
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点基于给定频率生成五组纠缠的正弦曲线，代表从零到一的复杂值模式。它强调为需要周期性、非线性变换的应用创建复杂的波形。

# Input types
## Required
- frequency
    - 频率参数决定了正弦曲线的振荡速度，影响生成波形的整体节奏和周期性。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- output
    - 输出包含五个正弦曲线，每个曲线代表将输入频率转换到零到一值范围的独特变换。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromFrequencyx5(KfSinusoidalEntangledZeroOneFromFrequency):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 5

    def main(self, frequency):
        return super().main(n=5, frequency=frequency)
```