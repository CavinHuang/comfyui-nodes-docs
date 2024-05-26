# Documentation
- Class name: KfSinusoidalGetPhase
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在从正弦曲线中提取相位信息，这对于理解振荡模式中的时间定位和位置至关重要。

# Input types
## Required
- curve
    - 曲线参数至关重要，因为它定义了将从中提取相位的正弦波形，直接影响节点的输出。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: keyframed.SinusoidalCurve

# Output types
- phase
    - 输出的相位代表了正弦波的时间偏移量，这对于对齐或比较振荡模式具有重要意义。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalGetPhase:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('FLOAT',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True})}}

    def main(self, curve):
        return (curve.phase,)
```