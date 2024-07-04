
# Documentation
- Class name: ImpactSchedulerAdapter
- Category: ImpactPack/Util
- Output node: False

ImpactSchedulerAdapter节点旨在适配各种任务或过程的调度策略，允许根据特定条件或偏好动态选择和应用调度算法。

# Input types
## Required
- scheduler
    - 指定要使用的主要调度器，可选择默认使用预定义的输入调度器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: comfy.samplers.KSampler.SCHEDULERS
- ays_scheduler
    - 允许从预定义列表中选择替代调度策略，包括不使用替代调度器的选项（'None'）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]

# Output types
- scheduler
    - 输出选定的调度器，可能是主要调度器或基于提供条件的替代调度器。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: core.SCHEDULERS


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImpactSchedulerAdapter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {"defaultInput": True,}),
            "ays_scheduler": (['None', 'AYS SDXL', 'AYS SD1', 'AYS SVD'],),
        }}

    CATEGORY = "ImpactPack/Util"

    RETURN_TYPES = (core.SCHEDULERS,)
    RETURN_NAMES = ("scheduler",)

    FUNCTION = "doit"

    def doit(self, scheduler, ays_scheduler):
        if ays_scheduler != 'None':
            return (ays_scheduler,)

        return (scheduler,)

```
