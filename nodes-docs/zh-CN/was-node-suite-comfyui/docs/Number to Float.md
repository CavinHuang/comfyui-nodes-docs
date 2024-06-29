# Documentation
- Class name: WAS_Number_To_Float
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_To_Float节点旨在将输入的数字转换为它们的浮点数等价物。此节点通过确保数字一致性和兼容性，对于下游操作的数据预处理起着至关重要的作用。

# Input types
## Required
- number
    - ‘number’参数对于节点的操作至关重要，因为它是将要转换为浮点数的输入。这种转换对于保持数值精度和促进进一步的数学计算具有重要意义。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float, str]

# Output types
- float_number
    - ‘float_number’输出是转换过程的结果，提供了输入数字的浮点表示。这个输出对于任何需要小数精度的后续数值分析或操作至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_To_Float:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',)}}
    RETURN_TYPES = ('FLOAT',)
    FUNCTION = 'number_to_float'
    CATEGORY = 'WAS Suite/Number/Operations'

    def number_to_float(self, number):
        return (float(number),)
```