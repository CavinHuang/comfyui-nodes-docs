# Documentation
- Class name: ImpactSleep
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactSleep节点的'doit'方法旨在引入执行流程中的延迟。它接受一个信号和一个以秒为单位的持续时间，然后在指定的时间内暂停进程，允许其他任务被调度或并发执行。这个节点特别适用于控制更大工作流中操作的时间。

# Input types
## Required
- signal
    - ‘signal’参数是一个通用输入，可用于将控制或状态信息传递到节点中。它很重要，因为它的值可能影响工作流中随后的步骤。
    - Comfy dtype: any_typ
    - Python dtype: Any
- seconds
    - ‘seconds’参数指定了节点将引入的延迟持续时间。对于时间敏感的操作来说至关重要，并且可以影响系统的整体性能。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- signal_opt
    - ‘signal_opt’输出在引入延迟后提供原始信号，确保工作流可以以相同的控制或状态信息无缝继续。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactSleep:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'signal': (any_typ,), 'seconds': ('FLOAT', {'default': 0.5, 'min': 0, 'max': 3600})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('signal_opt',)
    OUTPUT_NODE = True

    def doit(self, signal, seconds):
        time.sleep(seconds)
        return (signal,)
```