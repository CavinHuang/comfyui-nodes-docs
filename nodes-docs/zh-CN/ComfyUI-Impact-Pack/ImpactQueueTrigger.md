# Documentation
- Class name: ImpactQueueTrigger
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactQueueTrigger节点的'doit'方法旨在管理系统中操作的触发。当使用信号和模式调用时，它通过向PromptServer的实例发送命令来决定是否激活特定进程。该节点在控制任务流程和基于预定义条件启动操作中发挥关键作用。

# Input types
## Required
- signal
    - “signal”参数对于节点的操作至关重要，因为它代表了决定触发进程条件的输入。它的出现对于节点正确运行是必需的，并且它直接影响关于启动后续操作的决策过程。
    - Comfy dtype: any_typ
    - Python dtype: Any
## Optional
- mode
    - “mode”参数是一个可选的切换器，它指定节点是否应该触发相关操作。它有一个默认值设置为True，这意味着默认情况下会触发操作。此参数允许在不改变主要输入信号的情况下控制节点的行为。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- signal_opt
    - “signal_opt”输出代表节点执行后优化或处理的信号。它封装了触发决策的结果，并将信号转发用于系统内的进一步使用或分析。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactQueueTrigger:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'signal': (any_typ,), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'Trigger', 'label_off': "Don't trigger"})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('signal_opt',)
    OUTPUT_NODE = True

    def doit(self, signal, mode):
        if mode:
            PromptServer.instance.send_sync('impact-add-queue', {})
        return (signal,)
```