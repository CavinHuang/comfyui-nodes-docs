# Documentation
- Class name: GeneralInversedSwitch
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

GeneralInversedSwitch节点旨在根据选择参数选择性地处理输入数据。它通过迭代由'select'输入确定的范围，并根据条件将'input'数据添加到结果列表中来操作。该节点的功能是在迭代计数与'select'值匹配时返回原始输入，否则它将添加'None'。这个节点在需要在不改变原始数据结构的情况下进行条件性数据展示或过滤的场景中特别有用。

# Input types
## Required
- select
    - 参数'select'决定了节点操作中的迭代次数。它至关重要，因为它决定了何时将'input'数据包含在节点的输出中。'select'的重要性在于其能够控制数据通过节点的流程，从而根据迭代索引实现条件性处理。
    - Comfy dtype: INT
    - Python dtype: int
- input
    - 参数'input'代表节点可能处理并在某些条件下包含在其输出中的数据。它的重要性在于它是节点条件逻辑的主题，节点决定追加'input'还是'None'是基于'select'的值。
    - Comfy dtype: any_typ
    - Python dtype: Any
## Optional
- unique_id
    - 参数'unique_id'作为节点操作的标识符。虽然它不直接影响节点的主要功能，但可能用于在更广泛的系统中跟踪或将节点的输出与特定实例或标识符关联起来。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- result
    - 输出'result'是一个列表，根据'select'参数的值和迭代索引，它包含原始的'input'数据或'None'。这个输出很重要，因为它概括了节点的决策过程，反映了节点条件性数据包含的目的。
    - Comfy dtype: COMBO[any_typ]
    - Python dtype: List[Any]

# Usage tips
- Infra type: CPU

# Source code
```
class GeneralInversedSwitch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'select': ('INT', {'default': 1, 'min': 1, 'max': 999999, 'step': 1}), 'input': (any_typ,)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ByPassTypeTuple((any_typ,))
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Util'

    def doit(self, select, input, unique_id):
        res = []
        for i in range(0, select):
            if select == i + 1:
                res.append(input)
            else:
                res.append(None)
        return res
```