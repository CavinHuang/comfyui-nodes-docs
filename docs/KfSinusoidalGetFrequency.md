# Documentation
- Class name: KfSinusoidalGetFrequency
- Category: ROOT_CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点从正弦曲线中提取基本频率，提供了其振荡速率的度量。

# Input types
## Required
- curve
    - 输入曲线参数是必需的，因为它是提取频率的数据源。
    - Comfy dtype: SINUSOIDAL_CURVE
    - Python dtype: kf.Keyframed

# Output types
- frequency
    - 输出代表输入正弦曲线的基本频率。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class KfSinusoidalGetFrequency:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('FLOAT',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'curve': ('SINUSOIDAL_CURVE', {'forceInput': True})}}

    def main(self, curve):
        return (1 / curve.wavelength,)
```