# Documentation
- Class name: SawtoothWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

锯齿波节点根据指定的相位、步进增量和位移生成波形图案，有助于系统中的信号处理或波形生成任务。

# Input types
## Required
- phase
    - 相位参数决定了锯齿波的周期性，影响输出波形的整体形状和频率。
    - Comfy dtype: FLOAT
    - Python dtype: float
- step_increment
    - 步进增量参数控制每个周期的振幅变化，影响波形上升和下降的陡峭程度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - x_translation参数水平移动波形，调整波形图案在时间帧内的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_value
    - start_value参数设置波形的初始水平，决定了波形振荡的基线。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - current_frame参数代表当前时间点，用于计算波形在其周期内特定时刻的位置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出代表当前帧锯齿波的计算值，可用于进一步的信号处理或作为其他节点的输入。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - int_output提供波形值的整数表示，适用于离散操作或作为数值分析的基础。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SawtoothWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'step_increment': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'start_value': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, step_increment, x_translation, start_value, current_frame):
        output = start_value + (step_increment * (current_frame % phase) - x_translation)
        print(output)
        return (output, int(output))
```