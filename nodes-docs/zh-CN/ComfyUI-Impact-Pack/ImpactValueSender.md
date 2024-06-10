# Documentation
- Class name: ImpactValueSender
- Category: ImpactPack/Logic
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

“ImpactValueSender”节点旨在将影响值传输到指定的服务器。它是数据流中的关键组件，确保影响值被有效地传达以进行进一步的处理或分析。

# Input types
## Required
- value
    - “value”参数对于节点的操作至关重要，因为它代表了要发送的影响值。它在节点的功能中起着核心作用，决定了将传输的数据。
    - Comfy dtype: any_typ
    - Python dtype: Any
## Optional
- link_id
    - “link_id”参数是连接的可选标识符。它有助于区分不同的数据流或连接，增强了节点管理和组织传输过程的能力。
    - Comfy dtype: INT
    - Python dtype: int
- signal_opt
    - “signal_opt”参数是一个可选输入，可以用来修改节点的行为。它为传输过程提供了额外的控制，允许根据特定需求进行定制。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Output types
- signal
    - “signal”输出表示传输过程的结果。它是节点成功操作的关键指标，可以用于进一步处理或作为系统中的反馈。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactValueSender:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': (any_typ,), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1})}, 'optional': {'signal_opt': (any_typ,)}}
    OUTPUT_NODE = True
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('signal',)

    def doit(self, value, link_id=0, signal_opt=None):
        PromptServer.instance.send_sync('value-send', {'link_id': link_id, 'value': value})
        return (signal_opt,)
```