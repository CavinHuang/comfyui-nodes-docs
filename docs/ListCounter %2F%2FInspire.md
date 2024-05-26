# Documentation
- Class name: ListCounter
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

ListCounter 节点旨在递增地计数唯一标识符的出现次数，提供了一种跟踪序列中事件或项目的方法。它通过使用映射结构来维护与每个唯一标识符关联的计数。该节点特别适用于需要顺序跟踪的场景，例如日志记录、事件处理或库存管理。

# Input types
## Required
- signal
    - signal 参数代表触发计数过程的输入。它的存在标志着需要计数的事件或项目。该参数的重要性在于其作为节点操作的启动因素，没有它，计数机制将不会启动。
    - Comfy dtype: ANY
    - Python dtype: Any
- base_value
    - base_value 参数作为节点在递增前开始的初始计数值。它至关重要，因为它为计数设定了基础，并且可以用来调整序列的起始点，从而在计数操作中提供灵活性。
    - Comfy dtype: INT
    - Python dtype: int
- unique_id
    - unique_id 参数是用于区分正在跟踪的不同序列或项目的键标识符。它对节点的功能至关重要，因为它允许区分和单独计数每个独特的序列或项目。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- count
    - count 输出反映了节点处理输入后的当前计数值。它表示到目前为止已计数的出现次数或事件总数。这个输出很重要，因为它提供了节点操作的最终结果，提供了对序列进度的洞察。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ListCounter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'signal': (utils.any_typ,), 'base_value': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('INT',)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

    def doit(self, signal, base_value, unique_id):
        if unique_id not in list_counter_map:
            count = 0
        else:
            count = list_counter_map[unique_id]
        list_counter_map[unique_id] = count + 1
        return (count + base_value,)
```