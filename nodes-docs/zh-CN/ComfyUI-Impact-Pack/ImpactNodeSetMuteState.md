# Documentation
- Class name: ImpactNodeSetMuteState
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactNodeSetMuteState节点的'doit'方法旨在控制信号处理节点的静音状态。它允许用户根据提供的'set_state'参数激活或静音节点，从而影响系统中信号的流动。

# Input types
## Required
- signal
    - ‘signal’参数代表节点将处理的输入信号。它是节点操作的基本部分，因为它决定了将受到静音状态变化影响的数据。
    - Comfy dtype: ANY
    - Python dtype: Any
- node_id
    - ‘node_id’参数指定了要改变静音状态的节点的唯一标识符。在多个节点的网络中准确定位目标节点至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- set_state
    - ‘set_state’参数决定节点应设置为激活还是静音状态。它是一个关键输入，因为它直接控制节点在系统中的操作状态。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- signal_opt
    - ‘signal_opt’输出代表静音状态更改后可选修改的信号。它标志着节点操作的结果，反映了信号是否已被处理或静音。
    - Comfy dtype: ANY
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactNodeSetMuteState:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'signal': (any_typ,), 'node_id': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'set_state': ('BOOLEAN', {'default': True, 'label_on': 'active', 'label_off': 'mute'})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('signal_opt',)
    OUTPUT_NODE = True

    def doit(self, signal, node_id, set_state):
        PromptServer.instance.send_sync('impact-node-mute-state', {'node_id': node_id, 'is_active': set_state})
        return (signal,)
```