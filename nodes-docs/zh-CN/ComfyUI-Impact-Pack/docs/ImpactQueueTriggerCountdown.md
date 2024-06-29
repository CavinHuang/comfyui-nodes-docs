# Documentation
- Class name: ImpactQueueTriggerCountdown
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactQueueTriggerCountdown节点的'doit'方法旨在管理队列系统中的倒计时和触发机制。它推进计数并根据总计数和当前模式决定是否触发事件。该节点在控制基于队列的工作流中的操作流程中起着关键作用。

# Input types
## Required
- count
    - 参数'count'用于跟踪倒计时序列中的当前位置。它对于确定队列的进度和触发事件的时机至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- total
    - 参数'total'定义了在满足触发条件之前的最大计数。它对于设置倒计时过程中预期的步骤数很重要。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 参数'mode'决定节点是否应该触发事件。它是一个控制倒计时机制激活状态的重要开关。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- unique_id
    - 参数'unique_id'用于在系统中标识节点，以便进行反馈和队列管理。它在确保工作流中准确的通信和跟踪中起着至关重要的作用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- signal
    - 参数'signal'是一个可选输入，可用于向节点传递额外的信息或控制。它为节点的操作提供了灵活性。
    - Comfy dtype: ANY
    - Python dtype: Any

# Output types
- signal_opt
    - 输出'signal_opt'允许节点可选地传递信号，该信号可用于系统的进一步处理或通信。
    - Comfy dtype: ANY
    - Python dtype: Any
- count
    - 输出'count'反映了节点操作后更新的计数。它对于跟踪队列中倒计时的进度很重要。
    - Comfy dtype: INT
    - Python dtype: int
- total
    - 输出'total'提供了总计数值，这对于理解倒计时序列中剩余的步骤至关重要。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactQueueTriggerCountdown:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'count': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'total': ('INT', {'default': 10, 'min': 1, 'max': 18446744073709551615}), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'Trigger', 'label_off': "Don't trigger"})}, 'optional': {'signal': (any_typ,)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = (any_typ, 'INT', 'INT')
    RETURN_NAMES = ('signal_opt', 'count', 'total')
    OUTPUT_NODE = True

    def doit(self, count, total, mode, unique_id, signal=None):
        if mode:
            if count < total - 1:
                PromptServer.instance.send_sync('impact-node-feedback', {'node_id': unique_id, 'widget_name': 'count', 'type': 'int', 'value': count + 1})
                PromptServer.instance.send_sync('impact-add-queue', {})
            if count >= total - 1:
                PromptServer.instance.send_sync('impact-node-feedback', {'node_id': unique_id, 'widget_name': 'count', 'type': 'int', 'value': 0})
        return (signal, count, total)
```