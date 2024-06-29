# Documentation
- Class name: InvCosWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

InvCosWave节点基于反余弦函数生成波形。它旨在提供可由相位、振幅和位移参数调整的周期性输出。该节点特别适用于需要随时间平滑振荡模式的应用。

# Input types
## Required
- phase
    - 相位参数决定了波形的周期。它影响波形振荡的频率，对于设置模式的时间频率至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅参数控制波形的峰值。它对于定义振荡的幅度很重要，可以调整以缩放输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - x_translation参数沿x轴移动波形。它对于在给定帧或空间内定位波形模式至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - y_translation参数调整波形的垂直位置。它对于将波形模式与其它视觉元素或数据点对齐很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - current_frame参数代表动画或序列中的当前时间步。它对于在任何给定时刻生成波形的正确相位至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - InvCosWave节点的输出是一个浮点数，代表在指定帧处波形的当前值。它对于进一步处理或可视化波形模式很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - int_output是波形值的整数表示，当需要索引或需要整数精度时非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class InvCosWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_translation': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = y_translation + amplitude * -np.cos(-1 * (2 * np.pi * current_frame / phase - x_translation))
        print(output)
        return (output, int(output))
```