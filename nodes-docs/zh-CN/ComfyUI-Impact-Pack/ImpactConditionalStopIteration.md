# Documentation
- Class name: ImpactConditionalStopIteration
- Category: ImpactPack/Logic
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactConditionalStopIteration节点的'doit'方法旨在根据条件检查控制执行流程。当以真条件调用时，它会发送一个信号来停止迭代过程。该节点在工作流中管理执行流程中起着关键作用，允许在满足某些条件时进行条件性中断。

# Input types
## Required
- cond
    - 参数'cond'是一个布尔值，它决定了是否应该停止迭代。它对节点的操作至关重要，因为它直接影响关于迭代继续或终止的决策过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- None
    - 'doit'方法不返回任何输出。它是一个无返回值的方法，其唯一目的是在条件为真时发送一个'stop-iteration'信号，从而影响程序的控制流程。
    - Comfy dtype: DICT
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactConditionalStopIteration:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'cond': ('BOOLEAN', {'forceInput': True})}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic'
    RETURN_TYPES = ()
    OUTPUT_NODE = True

    def doit(self, cond):
        if cond:
            PromptServer.instance.send_sync('stop-iteration', {})
        return {}
```