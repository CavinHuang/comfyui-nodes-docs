# Documentation
- Class name: CosWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

CosWave节点通过各种参数生成余弦波形，可以调整这些参数以实现所需的变换。它主要用于创建可以与基于时间的变量同步的振荡效果。

# Input types
## Required
- phase
    - 相位参数决定了余弦波的周期，影响振荡的频率。它是塑造波的时间特性的关键要素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅设置了波的峰值，控制振荡从其平均位置的范围。它对于定义波的强度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - X平移允许沿X轴水平移动波形，提供对波位置的控制，而不影响其形状。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - Y平移调整波沿Y轴的垂直位置，允许微调波的起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧参数用于将波的相位与序列或动画的进展同步，允许随时间动态变化。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - CosWave节点的输出代表了在指定帧下的结果波形值，可以用于进一步的处理或可视化。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - 整数输出是波形值转换为整数的版本，对于需要离散值的应用非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class CosWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_translation': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = y_translation + amplitude * np.cos(2 * np.pi * current_frame / phase - x_translation)
        print(output)
        return (output, int(output))
```