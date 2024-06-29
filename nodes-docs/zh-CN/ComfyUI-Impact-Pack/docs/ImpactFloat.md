# Documentation
- Class name: ImpactFloat
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactFloat节点的'doit'方法作为一个基础的处理单元，用于操作浮点数。它旨在以精确的方式处理数值输入，确保节点的计算是健壮和可靠的，这对于ImpactPack套件内的数学运算和数据分析至关重要。

# Input types
## Required
- value
    - 参数'value'是一个浮点数，节点在其上进行操作。它对节点的功能至关重要，因为它直接影响'doit'方法的结果。该参数对于执行数学计算至关重要，必须提供此参数才能正确执行节点。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- result
    - 'doit'方法的输出是一个浮点数，它是输入'value'的处理结果。这个输出很重要，因为它代表了节点计算的结果，可以用于进一步分析或作为工作流中后续节点的输入。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactFloat:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('FLOAT', {'default': 1.0, 'min': -3.402823466e+38, 'max': 3.402823466e+38})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ('FLOAT',)

    def doit(self, value):
        return (value,)
```