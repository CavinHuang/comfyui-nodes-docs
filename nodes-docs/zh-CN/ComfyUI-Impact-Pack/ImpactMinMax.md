# Documentation
- Class name: ImpactMinMax
- Category: ImpactPack/Logic/_for_test
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactMinMax节点的'doit'方法旨在执行一个基本操作，即确定两个输入值之间的最大值或最小值。它在工作流程中的决策制定和比较中扮演着关键角色，提供了直接但至关重要的功能。

# Input types
## Required
- mode
    - ‘mode’参数对于节点的操作至关重要，因为它决定了是要返回最大值还是最小值。它直接影响节点的决策过程，使其能够根据指定的模式执行正确的比较。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- a
    - ‘a’参数代表比较中的第一个操作数。它是节点功能的基本部分，因为‘a’和‘b’之间的比较决定了输出。‘a’的性质可以非常广泛，允许节点在应用中具有很高的灵活性。
    - Comfy dtype: any_typ
    - Python dtype: Any
- b
    - ‘b’参数代表比较中的第二个操作数。像‘a’一样，它是节点操作的关键组件，因为‘a’和‘b’之间的比较产生了节点的输出。‘b’的多样性确保了节点可以适应比较中的各种输入类型。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Output types
- result
    - ‘result’输出提供了两个输入之间比较的结果。它很重要，因为它代表了节点的最终输出，这基于‘mode’参数，是最大值或最小值。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactMinMax:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'mode': ('BOOLEAN', {'default': True, 'label_on': 'max', 'label_off': 'min'}), 'a': (any_typ,), 'b': (any_typ,)}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = ('INT',)

    def doit(self, mode, a, b):
        if mode:
            return (max(a, b),)
        else:
            return (min(a, b),)
```