# Documentation
- Class name: SinWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

SinWave节点旨在生成正弦波模式。它通过计算给定帧的y位置来模拟波的行为，基于提供的参数。该节点特别适用于需要周期函数来模拟振荡或创建视觉效果的应用。

# Input types
## Required
- phase
    - 相位参数决定了波的周期。它至关重要，因为它决定了振荡的频率，从而影响波的整体形状和模式。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅设置波的峰值，控制振荡的高度。它是一个关键参数，影响波形的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧参数指定要进行波计算的帧。这对于确定特定时间点波的y位置至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- x_translation
    - X平移允许沿X轴水平移动波。这可以用来调整波形的位置以满足特定的设计要求。
    - Comfy dtype: FLOAT
    - Python dtype: float
- y_translation
    - Y平移负责沿Y轴垂直移动波，使波的起始点可以进行调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - 输出表示当前帧波的计算y位置。它很重要，因为它为进一步处理或可视化提供了实际值。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - 整型输出是波的y位置转换为整数，这在需要离散值的场景中非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SinWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'y_translation': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, y_translation, current_frame):
        output = y_translation + amplitude * np.sin(2 * np.pi * current_frame / phase - x_translation)
        print(output)
        return (output, int(output))
```