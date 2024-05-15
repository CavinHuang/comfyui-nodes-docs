# Documentation
- Class name: PPFNCrossHatchSettings
- Category: Power Noise Suite/Sampling/Settings
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

PPFNCrossHatchSettings节点旨在为交叉阴影图案生成过程配置设置。它封装了影响图案频率、八度和持续性的参数，以及颜色属性（如公差、颜色数量）和风格化方面（如角度、亮度、对比度和模糊度）。该节点在确定生成的交叉阴影图案的视觉特征和美学质量方面起着关键作用。

# Input types
## Required
- frequency
    - 频率参数决定了生成交叉阴影图案的基本速率。这是一个基本设置，影响图案的粒度和细节级别。频率值越高，图案越精细；值越低，图案越粗糙。
    - Comfy dtype: FLOAT
    - Python dtype: float
- octaves
    - 八度决定了用于创建交叉阴影图案的层数或迭代次数。八度越多，图案越复杂和详细；八度越少，图案越简单，细节越少。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 持续性控制每个八度对最终图案的影响。持续性值越高，每个八度的贡献越显著，导致图案更复杂。值越低，每个八度的影响越小，简化了图案。
    - Comfy dtype: FLOAT
    - Python dtype: float
- color_tolerance
    - 颜色公差是衡量颜色必须有多接近才能被视为同一交叉阴影图案的一部分。它影响图案内的颜色混合和整体颜色和谐。
    - Comfy dtype: FLOAT
    - Python dtype: float
- num_colors
    - 颜色数量参数指定在交叉阴影图案中使用多少种不同的颜色。这影响图案的颜色多样性和最终图案的活力。
    - Comfy dtype: INT
    - Python dtype: int
- angle_degrees
    - 角度度数指定绘制交叉阴影线的角度。此设置影响图案的方向，并可以根据其值创建不同的视觉效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度调整交叉阴影图案的整体明暗程度。根据设定的值，可以使图案看起来更生动或更柔和。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 对比度影响交叉阴影图案中明暗区域之间的差异。对比度值越高，图案越醒目，差异越明显；值越低，效果越柔和。
    - Comfy dtype: FLOAT
    - Python dtype: float
- blur
    - 模糊度决定了应用于交叉阴影图案的模糊量。它可以软化边缘，创造出更平滑、更分散的外观。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- ch_settings
    - ch_settings输出封装了交叉阴影图案生成的配置设置。它包括输入到节点的所有参数，并用于指导后续的图案生成过程。
    - Comfy dtype: CH_SETTINGS
    - Python dtype: Dict[str, Union[float, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class PPFNCrossHatchSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'frequency': ('FLOAT', {'default': 320.0, 'max': 1024.0, 'min': 0.001, 'step': 0.001}), 'octaves': ('INT', {'default': 12, 'max': 32, 'min': 1, 'step': 1}), 'persistence': ('FLOAT', {'default': 1.5, 'max': 2.0, 'min': 0.001, 'step': 0.001}), 'num_colors': ('INT', {'default': 16, 'max': 256, 'min': 2, 'step': 1}), 'color_tolerance': ('FLOAT', {'default': 0.05, 'max': 1.0, 'min': 0.001, 'step': 0.001}), 'angle_degrees': ('FLOAT', {'default': 45.0, 'max': 360.0, 'min': 0.0, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.001}), 'contrast': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.001}), 'blur': ('FLOAT', {'default': 2.5, 'max': 1024, 'min': 0, 'step': 0.01})}}
    RETURN_TYPES = ('CH_SETTINGS',)
    RETURN_NAMES = ('ch_settings',)
    FUNCTION = 'cross_hatch_settings'
    CATEGORY = 'Power Noise Suite/Sampling/Settings'

    def cross_hatch_settings(self, frequency, octaves, persistence, color_tolerance, num_colors, angle_degrees, brightness, contrast, blur):
        return ({'frequency': frequency, 'octaves': octaves, 'persistence': persistence, 'color_tolerance': color_tolerance, 'num_colors': num_colors, 'angle_degrees': angle_degrees, 'brightness': brightness, 'contrast': contrast, 'blur': blur},)
```