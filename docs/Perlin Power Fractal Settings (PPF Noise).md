# Documentation
- Class name: PPFNoiseSettings
- Category: Power Noise Suite/Sampling/Settings
- Output node: False
- Repo Ref: https://github.com/WASasquatch/PowerNoiseSuite

该节点旨在为功率分形噪声配置和生成设置，这是一种在计算机图形学和模拟等各种应用中使用的程序化噪声类型。它封装了影响噪声特性的参数，确保对噪声生成过程具有高度的控制。

# Input types
## Required
- X
    - X坐标输入对于定义噪声函数内的空间位置至关重要。它影响噪声模式如何在X轴上生成和演变。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Y
    - Y坐标输入对于确定噪声函数内的垂直位置至关重要，影响噪声模式在Y轴上的生成和演变。
    - Comfy dtype: FLOAT
    - Python dtype: float
- Z
    - Z坐标输入对于指定噪声函数内的深度位置是必要的，影响噪声模式在Z轴上的生成和演变。
    - Comfy dtype: FLOAT
    - Python dtype: float
- evolution
    - 演变参数控制噪声模式随时间的进展，使得噪声景观具有动态和演变的特性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame
    - 帧输入用于初始化噪声生成，确保噪声模式从特定点开始并一致地演变。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - 比例参数调整噪声模式的整体大小和频率，影响生成噪声的粒度和细节水平。
    - Comfy dtype: FLOAT
    - Python dtype: float
- octaves
    - 八度决定噪声中的频率层数，有助于噪声模式的复杂性和丰富性。
    - Comfy dtype: INT
    - Python dtype: int
- persistence
    - 持续性影响噪声过渡的平滑度，较高的值导致更平滑的梯度，而较低的值则导致更突然的变化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lacunarity
    - 间隔性调整连续频率层之间的间隔，影响噪声模式的整体结构和外观。
    - Comfy dtype: FLOAT
    - Python dtype: float
- exponent
    - 指数参数修改噪声的对比度和清晰度，较高的值增加对比度并创建更明确的边缘。
    - Comfy dtype: FLOAT
    - Python dtype: float
- brightness
    - 亮度调整噪声的整体强度，正值增加噪声的可见性，负值则减少它。
    - Comfy dtype: FLOAT
    - Python dtype: float
- contrast
    - 对比度参数控制噪声最亮和最暗部分之间的差异，增强或减少整体视觉影响。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- ppf_settings
    - 输出提供了一组综合的功率分形噪声设置，封装了所有已配置的参数，可以用来相应地生成和操纵噪声模式。
    - Comfy dtype: PPF_SETTINGS
    - Python dtype: Dict[str, float]

# Usage tips
- Infra type: CPU

# Source code
```
class PPFNoiseSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'X': ('FLOAT', {'default': 0, 'max': 99999999, 'min': -99999999, 'step': 0.01}), 'Y': ('FLOAT', {'default': 0, 'max': 99999999, 'min': -99999999, 'step': 0.01}), 'Z': ('FLOAT', {'default': 0, 'max': 99999999, 'min': -99999999, 'step': 0.01}), 'evolution': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': 0.0, 'step': 0.01}), 'frame': ('INT', {'default': 0, 'max': 99999999, 'min': 0, 'step': 1}), 'scale': ('FLOAT', {'default': 5, 'max': 2048, 'min': 2, 'step': 0.01}), 'octaves': ('INT', {'default': 8, 'max': 8, 'min': 1, 'step': 1}), 'persistence': ('FLOAT', {'default': 1.5, 'max': 23.0, 'min': 0.01, 'step': 0.01}), 'lacunarity': ('FLOAT', {'default': 2.0, 'max': 99.0, 'min': 0.01, 'step': 0.01}), 'exponent': ('FLOAT', {'default': 4.0, 'max': 38.0, 'min': 0.01, 'step': 0.01}), 'brightness': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.01}), 'contrast': ('FLOAT', {'default': 0.0, 'max': 1.0, 'min': -1.0, 'step': 0.01})}}
    RETURN_TYPES = ('PPF_SETTINGS',)
    RETURN_NAMES = ('ppf_settings',)
    FUNCTION = 'power_fractal_settings'
    CATEGORY = 'Power Noise Suite/Sampling/Settings'

    def power_fractal_settings(self, X, Y, Z, evolution, frame, scale, octaves, persistence, lacunarity, exponent, brightness, contrast):
        return ({'X': X, 'Y': Y, 'Z': Z, 'evolution': evolution, 'frame': frame, 'scale': scale, 'octaves': octaves, 'persistence': persistence, 'lacunarity': lacunarity, 'exponent': exponent, 'brightness': brightness, 'contrast': contrast},)
```