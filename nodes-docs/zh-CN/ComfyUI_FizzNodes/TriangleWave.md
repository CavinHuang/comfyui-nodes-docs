# Documentation
- Class name: TriangleWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

TriangleWave节点旨在生成类似三角形的波形。它通过调整正弦波的幅度和相位来创建一个独特的三角形图案，这对于各种信号处理应用非常有用。

# Input types
## Required
- phase
    - 相位参数决定了波形的周期时长，影响节点生成的三角波的频率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 幅度设置三角波的峰值，这是定义信号整体形状和能量的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - X平移沿X轴移动波形，允许对波形的水平位置进行调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - Y平移沿Y轴移动波形，影响波形起始点的垂直位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧参数指定波形序列中的当前位置，这对于信号的时间演变至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出参数代表给定帧的三角波的计算值，这是节点操作的核心结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - 整数输出是将波值转换为整数的版本，这对于需要离散值的某些应用非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class TriangleWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_translation': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = y_translation + amplitude / np.pi * np.arcsin(np.sin(2 * np.pi / phase * current_frame - x_translation))
        print(output)
        return (output, int(output))
```