# Documentation
- Class name: ImpactCompare
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactCompare节点旨在基于指定的比较运算符评估并比较两个输入'a'和'b'。它作为一个基本的逻辑工具，使用户能够执行各种关系检查，并返回与所做比较相对应的布尔结果。

# Input types
## Required
- cmp
    - 参数'cmp'定义了输入'a'和'b'之间的比较类型。它至关重要，因为它决定了应用于比较的逻辑，并直接影响节点执行的结果。
    - Comfy dtype: str
    - Python dtype: str
- a
    - 参数'a'代表比较中的第一个操作数。它的值和数据类型可以显著影响节点的执行和节点返回的布尔值结果。
    - Comfy dtype: any
    - Python dtype: Any
- b
    - 参数'b'是比较中的第二个操作数。它与'a'一起工作，以确定基于指定的比较运算符的最终布尔结果。
    - Comfy dtype: any
    - Python dtype: Any

# Output types
- result
    - 'result'输出反映了'a'和'b'之间比较的结果，作为一个布尔值。它很重要，因为它是节点逻辑操作的直接输出，并用于通知后续的流程或决策。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactCompare:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'cmp': (['a = b', 'a <> b', 'a > b', 'a < b', 'a >= b', 'a <= b', 'tt', 'ff'],), 'a': (any_typ,), 'b': (any_typ,)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ('BOOLEAN',)

    def doit(self, cmp, a, b):
        if cmp == 'a = b':
            return (a == b,)
        elif cmp == 'a <> b':
            return (a != b,)
        elif cmp == 'a > b':
            return (a > b,)
        elif cmp == 'a < b':
            return (a < b,)
        elif cmp == 'a >= b':
            return (a >= b,)
        elif cmp == 'a <= b':
            return (a <= b,)
        elif cmp == 'tt':
            return (True,)
        else:
            return (False,)
```