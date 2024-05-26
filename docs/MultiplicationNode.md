# Documentation
- Class name: MultiplicationNode
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点对输入值执行算术运算，根据提供的乘数和加数进行缩放和调整。它强调以直接的方式转换和处理数值数据的能力，提供灵活的输出类型选择。

# Input types
## Required
- numberA
    - 将在乘法和加法运算中使用的基值。它在确定最终输出中起着关键作用，因为它是转换的主题。
    - Comfy dtype: any_type
    - Python dtype: Union[int, float, torch.Tensor]
- multiply_by
    - 应用于基值的乘数，显著影响结果的规模。它在修改输出的大小方面至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- add_by
    - 加到乘法结果上的值，调整最终输出。它在微调结果中发挥作用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- a
    - 算术运算的浮点结果，代表输入值的缩放和调整版本。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b
    - 算术运算的整数结果，提供输入值转换的离散化版本。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class MultiplicationNode:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'numberA': (any_type,), 'multiply_by': ('FLOAT', {'default': 1, 'min': -2, 'max': 18446744073709551615, 'step': 0.01, 'display': 'number'}), 'add_by': ('FLOAT', {'default': 0, 'min': -2000, 'max': 18446744073709551615, 'step': 0.01, 'display': 'number'})}}
    RETURN_TYPES = ('FLOAT', 'INT')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, False)

    def run(self, numberA, multiply_by, add_by):
        b = int(numberA * multiply_by + add_by)
        a = float(numberA * multiply_by + add_by)
        return (a, b)
```