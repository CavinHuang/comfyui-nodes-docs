# Documentation
- Class name: InvSinWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

InvSinWave节点旨在生成一个倒置的正弦波模式。它通过操作波的相位、振幅和平移来实现所需的输出，这在信号处理和波形分析应用中特别有用。

# Input types
## Required
- phase
    - 相位参数决定了波的周期，影响波在给定时间框架内完成一个完整周期的次数。它对于控制波的频率至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅设置波峰的高度，影响波振荡的强度。它是调整波形大小的一个重要参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - X平移沿X轴水平移动波，允许在给定空间内定位波。它对于将波形与特定坐标对齐具有重要意义。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - Y平移沿Y轴垂直移动波，影响波振荡的起始点。它对于调整波形的垂直位置很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧参数指定时间序列中的当前位置，对于在动画或模拟的特定时刻生成波至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出是在指定参数下计算出的倒置正弦波的值，可以用于进一步分析或作为其他节点的输入。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - 整数输出是波计算值的整数版本，对于需要离散值而非连续值的应用可能很有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class InvSinWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_translation': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = y_translation + amplitude * -np.sin(-1 * (2 * np.pi * current_frame / phase - x_translation))
        print(output)
        return (output, int(output))
```