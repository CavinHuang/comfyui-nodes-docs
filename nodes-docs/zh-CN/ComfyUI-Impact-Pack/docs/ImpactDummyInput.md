# Documentation
- Class name: ImpactDummyInput
- Category: ImpactPack/Debug
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactDummyInput节点的'doit'方法在ImpactPack/Debug类别中充当占位符函数。它旨在执行一个简单的操作，通常用于测试或调试目的，而不会影响主工作流程。

# Input types
## Required
- required
    - ‘required’参数是一个字典，它指定了ImpactDummyInput节点的必需输入。这对于节点的操作至关重要，因为它决定了必须提供的数据，以便'doit'方法能够正确执行。
    - Comfy dtype: Dict[str, any_typ]
    - Python dtype: Dict[str, any_typ]

# Output types
- output
    - 'output'参数代表'doit'方法的结果，在这种情况下，是一个简单的字符串，指示虚拟操作的结果。它很重要，因为它在调试过程中提供了节点执行的直接反馈。
    - Comfy dtype: str
    - Python dtype: Tuple[str, ...]

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactDummyInput:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {}}
    CATEGORY = 'ImpactPack/Debug'
    RETURN_TYPES = (any_typ,)
    FUNCTION = 'doit'

    def doit(self):
        return ('DUMMY',)
```