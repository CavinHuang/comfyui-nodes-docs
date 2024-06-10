# Documentation
- Class name: ImpactConditionalBranch
- Category: ImpactPack/Logic
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactConditionalBranch节点的'doit'方法旨在根据提供的布尔条件条件性地执行逻辑。它允许根据条件的真值选择两个值中的一个，从而促进了程序中控制流的实现。

# Input types
## Required
- cond
    - 'cond'参数是一个布尔值，它决定了'doit'方法内执行流程的方向。它至关重要，因为它决定了返回'tt_value'还是'ff_value'。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- tt_value
    - 'tt_value'参数表示如果'cond'参数评估为true，则要返回的值。它在节点的条件逻辑中扮演重要角色。
    - Comfy dtype: any_typ
    - Python dtype: Any
- ff_value
    - 'ff_value'参数是当'cond'参数为false时返回的值。它对于定义节点条件操作中的替代结果是必不可少的。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Output types
- result
    - 'result'参数是'doit'方法的结果，将根据'cond'参数的评估是'tt_value'或'ff_value'中的一个。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactConditionalBranch:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'cond': ('BOOLEAN',), 'tt_value': (any_typ,), 'ff_value': (any_typ,)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = (any_typ,)

    def doit(self, cond, tt_value, ff_value):
        if cond:
            return (tt_value,)
        else:
            return (ff_value,)
```