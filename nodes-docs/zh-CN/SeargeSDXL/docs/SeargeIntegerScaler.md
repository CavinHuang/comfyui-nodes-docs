# Documentation
- Class name: SeargeIntegerScaler
- Category: Searge/_deprecated_/Integers
- Output node: False
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

该节点基于提供的因子和倍数对输入整数值进行缩放和四舍五入。它确保输出值保持在所需的范围和粒度内的整数。

# Input types
## Required
- value
    - 将由节点操作缩放的初始整数值。它是节点目的的基础，因为它是将经历转换的基础值。
    - Comfy dtype: INT
    - Python dtype: int
- factor
    - 应用于输入值的乘数，以确定缩放的比例。它非常重要，因为它直接影响输出的大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- multiple_of
    - 缩放结果应该是其倍数的值，确保输出在范围内四舍五入到最近的可接受值。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- value
    - 处理后的整数值，现已根据输入参数缩放并四舍五入，代表节点的最终输出。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeIntegerScaler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'value': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'factor': ('FLOAT', {'default': 1.0, 'step': 0.01}), 'multiple_of': ('INT', {'default': 1, 'min': 0, 'max': 65536})}}
    RETURN_TYPES = ('INT',)
    RETURN_NAMES = ('value',)
    FUNCTION = 'get_value'
    CATEGORY = 'Searge/_deprecated_/Integers'

    def get_value(self, value, factor, multiple_of):
        return (int(value * factor // multiple_of) * multiple_of,)
```