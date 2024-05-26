# Documentation
- Class name: FloatSlider
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

FloatSlider节点旨在将给定的数字规范化到指定的范围内，确保它落在最小值和最大值之间。它将输入数字缩放到一个标准刻度上，提供可以用于各种计算上下文中的归一化值，其中相对位置至关重要。

# Input types
## Required
- number
    - 参数'number'表示要在指定范围内归一化的值。它至关重要，因为它直接影响节点的输出，决定了归一化数字在标准刻度上的位置。
    - Comfy dtype: FLOAT
    - Python dtype: float
- min_value
    - 参数'min_value'定义了归一化数字的范围的下限。它在确保输出值受到期望限制内起着重要作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - 参数'max_value'设置归一化范围的上限。它在缩放输入数字以确保不超过指定的最大值方面至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- step
    - 参数'step'用于控制数字归一化的粒度。它影响数字在范围内的调整方式，影响归一化值的精度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- scaled_number
    - 输出'scaled_number'表示输入数字的归一化值，缩放到适合指定范围内。它很重要，因为它提供了一个可以用于进一步分析或处理的标准度量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class FloatSlider:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'number': ('FLOAT', {'default': 0, 'min': 0, 'max': 18446744073709551615, 'step': 0.001, 'display': 'slider'}), 'min_value': ('FLOAT', {'default': 0, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 0.001, 'display': 'number'}), 'max_value': ('FLOAT', {'default': 1, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 0.001, 'display': 'number'}), 'step': ('FLOAT', {'default': 0.001, 'min': -18446744073709551615, 'max': 18446744073709551615, 'step': 0.001, 'display': 'number'})}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, number, min_value, max_value, step):
        if number < min_value:
            number = min_value
        elif number > max_value:
            number = max_value
        scaled_number = (number - min_value) / (max_value - min_value)
        return (scaled_number,)
```