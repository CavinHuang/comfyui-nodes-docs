# Documentation
- Class name: ImpactInt
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactInt节点的'doit'方法旨在执行一个基本的逻辑操作。它被设计为接收一个整数输入并返回相同的整数值，作为ImpactPack套件中的基本传递函数。此节点在必须保持输入数据完整性的场景中至关重要，确保信息流在计算过程中保持不变。

# Input types
## Required
- value
    - ‘value’参数是ImpactInt节点操作的一个整体部分。它是节点所需的唯一输入，对于节点执行其传递函数至关重要。节点保持输入完整性的能力取决于此参数的正确提供，突显了其在整个节点功能中的重要作用。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- result
    - ImpactInt节点的‘result’输出参数是输入‘value’的直接反映。它标志着节点成功执行和保持输入数据完整性。该输出很重要，因为它提供了输入整数的可靠且未修改的版本，确保了计算工作流中后续操作的连续性和准确性。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactInt:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ('INT',)

    def doit(self, value):
        return (value,)
```