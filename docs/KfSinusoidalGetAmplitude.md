# Documentation
- Class name: KfSinusoidalGetAmplitude
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点从弦曲线中提取振幅，提供了曲线偏离平均值的峰值偏差的度量。这对于理解曲线中振荡的强度至关重要。

# Input types
## Required
- curve
    - 输入的曲线参数代表从中提取振幅的正弦数据结构。它对节点的运行至关重要，因为它直接影响输出结果。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: keyframed.SinusoidalCurve

# Output types
- amplitude
    - 输出提供输入正弦曲线的振幅，表明其振荡的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalGetAmplitude:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('FLOAT',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True})}}

    def main(self, curve):
        return (curve.amplitude,)
```