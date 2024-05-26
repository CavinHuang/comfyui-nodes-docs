# Documentation
- Class name: KfSinusoidalGetWavelength
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

KfSinusoidalGetWavelength 节点旨在从一个正弦曲线中提取特征波长。它在分析和理解曲线的周期性质中扮演着关键角色，为信号处理和波形分析等应用提供了一个基本参数，这在各种应用中至关重要。

# Input types
## Required
- curve
    - ‘curve’参数对于节点的操作至关重要，因为它代表了将从中派生波长的正弦曲线。这是一个必需的输入，它直接影响节点的输出，决定了获得的波长值的准确性和相关性。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: Keyframed sinusoidal curve object

# Output types
- wavelength
    - 'wavelength' 输出参数表示正弦曲线一个完整周期的长度。这是一个关键的信息片段，可以用于进一步分析或在节点被使用的应用程序的上下文中做出明智的决策。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalGetWavelength:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('FLOAT',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True})}}

    def main(self, curve):
        return (curve.wavelength,)
```