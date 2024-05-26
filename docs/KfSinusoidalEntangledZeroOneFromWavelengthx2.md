# Documentation
- Class name: KfSinusoidalEntangledZeroOneFromWavelengthx2
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点根据给定的波长生成一对纠缠的正弦曲线，旨在创建复杂且同步的模式。它强调波长与生成波形之间的相互作用，专注于生成曲线的和谐与节奏。

# Input types
## Required
- wavelength
    - 波长参数决定了正弦曲线的周期，影响生成波形的整体模式和频率。它在确定输出的美学和功能质量方面至关重要。
    - Comfy dtype: float
    - Python dtype: float

# Output types
- KEYFRAMED_CURVE
    - 输出包含两个纠缠且同步的正弦曲线，丰富地展示了输入波长的属性。这些曲线可用于需要节奏性和周期性模式的各种应用中。
    - Comfy dtype: COMBO[kf.SinusoidalCurve]
    - Python dtype: List[kf.SinusoidalCurve]

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalEntangledZeroOneFromWavelengthx2(KfSinusoidalEntangledZeroOneFromWavelength):
    RETURN_TYPES = ('KEYFRAMED_CURVE',) * 2

    def main(self, wavelength):
        return super().main(n=2, wavelength=wavelength)
```