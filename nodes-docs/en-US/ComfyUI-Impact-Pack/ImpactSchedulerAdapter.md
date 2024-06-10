---
tags:
- SamplerScheduler
- Sampling
---

# Impact Scheduler Adapter
## Documentation
- Class name: `ImpactSchedulerAdapter`
- Category: `ImpactPack/Util`
- Output node: `False`

The ImpactSchedulerAdapter node is designed to adapt various scheduling strategies for tasks or processes, allowing for dynamic selection and application of scheduling algorithms based on specific conditions or preferences.
## Input types
### Required
- **`scheduler`**
    - Specifies the primary scheduler to be used, with an option to default to a predefined input scheduler.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `comfy.samplers.KSampler.SCHEDULERS`
- **`ays_scheduler`**
    - Allows for the selection of an alternative scheduling strategy from a predefined list, including the option to not use an alternative scheduler ('None').
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`scheduler`**
    - Comfy dtype: `COMBO[STRING]`
    - Outputs the selected scheduler, which could be the primary scheduler or an alternative one based on the conditions provided.
    - Python dtype: `core.SCHEDULERS`
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
