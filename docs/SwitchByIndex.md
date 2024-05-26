# Documentation
- Class name: SwitchByIndex
- Category: ♾️Mixlab/Utils
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

SwitchByIndex是一个旨在根据指定索引从两个输入列表中选择元素的节点，允许组合和展平数据结构。

# Input types
## Required
- A
    - 参数'A'是第一个输入列表，对于节点的操作至关重要，因为它提供了主要的数据源。
    - Comfy dtype: ANY
    - Python dtype: List[Any]
- B
    - 参数'B'代表第二个输入列表，它在节点数据处理中补充了'A'列表。
    - Comfy dtype: ANY
    - Python dtype: List[Any]
- index
    - 参数'index'对于从组合列表中选择特定元素至关重要，影响节点的输出。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- flat
    - 参数'flat'决定输出列表是否应该被展平，影响最终结果的结构。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- C
    - 输出'C'是一个包含两个输入列表中元素的列表，可能会被'index'和'flat'参数修改。
    - Comfy dtype: ANY
    - Python dtype: List[Any]
- count
    - 输出'count'提供了'C'列表中元素的总数，反映了节点的数据聚合。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class SwitchByIndex:

    @classmethod
    def INPUT_TYPES(cls):
        return {'optional': {'A': (any_type,), 'B': (any_type,)}, 'required': {'index': ('INT', {'default': -1, 'min': -1, 'max': 1000, 'step': 1, 'display': 'number'}), 'flat': (['off', 'on'],)}}
    RETURN_TYPES = (any_type, 'INT')
    RETURN_NAMES = ('C', 'count')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Utils'
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True, False)

    def run(self, A=[], B=[], index=-1, flat='on'):
        flat = flat[0]
        C = []
        index = index[0]
        for a in A:
            C.append(a)
        for b in B:
            C.append(b)
        if flat == 'on':
            C = flatten_list(C)
        if index > -1:
            try:
                C = [C[index]]
            except Exception as e:
                C = []
        return (C, len(C))
```