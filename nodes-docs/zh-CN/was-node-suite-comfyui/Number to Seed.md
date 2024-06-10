# Documentation
- Class name: WAS_Number_To_Seed
- Category: WAS Suite/Number/Operations
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_To_Seed节点旨在将数值转换为种子格式。它是WAS套件中的基础工具，促进了需要基于种子的方法的操作。该节点抽象了种子生成的复杂性，确保与依赖种子输入的下游流程无缝集成。

# Input types
## Required
- number
    - ‘number’参数对于节点的操作至关重要，因为它是节点将转换为种子的输入数值。它在确定输出种子的特性中起着关键作用，这可以显著影响WAS套件中使用此种子的后续流程。
    - Comfy dtype: NUMBER
    - Python dtype: Union[int, float]

# Output types
- seed
    - ‘seed’输出是WAS_Number_To_Seed节点产生的一个关键元素。它代表了从输入数字转换而来的种子，对于启动WAS套件内需要种子以执行的过程至关重要。
    - Comfy dtype: SEED
    - Python dtype: Dict[str, Union[int, float]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_To_Seed:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'number': ('NUMBER',)}}
    RETURN_TYPES = ('SEED',)
    FUNCTION = 'number_to_seed'
    CATEGORY = 'WAS Suite/Number/Operations'

    def number_to_seed(self, number):
        return ({'seed': number},)
```