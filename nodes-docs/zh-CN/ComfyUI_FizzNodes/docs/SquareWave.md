# Documentation
- Class name: SquareWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

SquareWave节点旨在生成方波模式。它通过调整相位、振幅和平移来产生方波形，这对于信号处理和波形分析至关重要。该节点的功能对于需要创建或操纵方波信号的应用是至关重要的。

# Input types
## Required
- phase
    - 相位参数决定了波形周期的位置，这对于确定方波转换的时机至关重要。它影响波形的频率和起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅设置了波峰和波谷的高度，这对于定义信号的强度非常重要。它是方波整体形状和特性的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - X平移沿X轴移动波形，允许调整波形的位置。这个参数对于将波形与其他信号或系统中的组件对齐至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - Y平移沿Y轴向上或向下移动波形，影响波形的垂直位置。它是调整波形相对于其他元素位置的重要参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧参数指示波形序列中的当前位置，这对于方波模式随时间的进展和定时至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - SquareWave节点的输出代表了在指定参数下方波的计算值，这对于进一步的信号处理或分析是必不可少的。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - 整型输出提供了波形值的离散版本，这对于需要信号的量化或整数表示的应用非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SquareWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_translation': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = y_translation + amplitude * 0 ** 0 ** (0 - np.sin(np.pi * current_frame / phase - x_translation))
        print(output)
        return (output, int(output))
```