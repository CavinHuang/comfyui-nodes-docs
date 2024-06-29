# Documentation
- Class name: Lerp
- Category: FizzNodes 📅🅕🅝/WaveNodes
- Output node: False
- Repo Ref: https://github.com/FizzleDorf/ComfyUI_FizzNodes

Lerp节点执行两个值之间的线性插值，提供由强度参数和图像序列中的当前帧影响的平滑过渡。它通常用于动画和数据可视化中，以创建从一种状态到另一种状态的逐渐变化。

# Input types
## Required
- num_Images
    - 图像数量参数定义了序列中的帧或图像总数，它影响插值的步长。这对于确定值之间过渡的粒度至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength
    - 强度参数控制起始值和结束值之间插值的程度。它是过渡在图像序列中发生速度的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- current_frame
    - 当前帧参数指定了图像序列中的当前位置。它对于计算任何给定时间点插值的当前状态至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output
    - Lerp节点的输出是线性插值的结果，提供了一个值，该值基于输入参数表示过渡的当前状态。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_index
    - 帧索引输出指示计算当前插值状态的帧号，这对于与基于序列的其他流程对齐非常有用。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class Lerp:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'num_Images': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'current_frame': ('INT', {'default': 1.0, 'min': 0.0, 'max': 9999, 'step': 1.0})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'lerp'
    CATEGORY = 'FizzNodes 📅🅕🅝/WaveNodes'

    def lerp(self, num_Images, strength, current_frame):
        step = strength / num_Images
        output = strength - step * current_frame
        return (output, int(output))
```