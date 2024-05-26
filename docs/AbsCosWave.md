# Documentation
- Class name: AbsCosWave
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

该节点基于一组输入参数生成波形模式，模拟具有可调节特性的振荡行为。

# Input types
## Required
- phase
    - 相位参数决定了波浪振荡的间隔，影响波浪模式的频率和周期。
    - Comfy dtype: FLOAT
    - Python dtype: float
- amplitude
    - 振幅控制波浪的大小，决定了波浪模式中峰值和谷值的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- x_translation
    - X_translation 沿着 x 轴水平移动波浪，改变波浪模式的位置而不改变其形状。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - 最大值参数设置了波浪的上限，确保输出保持在定义的范围内。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧表示波浪随时间的进展，每一帧对应波浪周期中的一个点。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - 输出代表当前帧波浪的计算值，反映了节点对输入参数的处理。
    - Comfy dtype: FLOAT
    - Python dtype: float
- int_output
    - 整型输出是波浪计算输出的四舍五入值，提供了波浪模式的离散表示。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class AbsCosWave:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'phase': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'amplitude': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.1}), 'x_translation': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'max_value': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 9999.0, 'step': 0.05}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'Wave'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def Wave(self, phase, amplitude, x_translation, max_value, current_frame):
        output = max_value - np.abs(np.cos(current_frame / phase)) * amplitude
        print(output)
        return (output, int(output))
```