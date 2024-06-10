# Documentation
- Class name: AbsSinWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

生成一个绝对正弦波模式，该模式在指定的最大值和零之间振荡，受相位、振幅和转换参数的影响。此节点旨在为信号处理或动画等各种应用提供多功能波形。

# Input types
## Required
- phase
    - 相位参数决定了正弦波的周期，影响波的频率和整体模式。这对于调整波形中振荡的时间至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅设置正弦波的高度，控制振荡的幅度。它是定义波形强度的基本参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - x_translation参数沿x轴移动波形，允许在波形模式内进行水平移动。它对于在给定上下文中定位波形非常重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - max_value建立了波的上限，定义了正弦波可以达到的最大点。它是设置波振荡规模的关键参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - current_frame参数表示时间或序列中的当前位置，波函数使用它来计算其输出。对于在特定时刻生成正确的波形至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出提供了当前帧绝对正弦波的计算值，代表波形的y坐标。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - int_output是输出的整数表示，对于需要离散值而非连续值的应用非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class AbsSinWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'max_value': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, max_value, current_frame):
        output = max_value - np.abs(np.sin(current_frame / phase)) * amplitude
        print(output)
        return (output, int(output))
```