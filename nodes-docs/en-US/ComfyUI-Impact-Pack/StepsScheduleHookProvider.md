---
tags:
- ImageEnhancement
- Scheduling
---

# StepsScheduleHookProvider
## Documentation
- Class name: `StepsScheduleHookProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The StepsScheduleHookProvider node is designed to generate hooks that adjust the number of steps in a generative process based on a simple schedule. This allows for dynamic modification of the iteration steps during the generation process, aiming to optimize or alter the progression of the generative task.
## Input types
### Required
- **`schedule_for_iteration`**
    - Specifies the scheduling strategy to be used for iteration adjustments. The choice of schedule affects how the number of steps is dynamically adjusted during the generation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`target_steps`**
    - Defines the target number of steps to aim for at the end of the generation process. This parameter directly influences the adjustment of steps in the generative task, aiming to reach the specified target.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`pk_hook`**
    - Comfy dtype: `PK_HOOK`
    - Returns a hook configured to adjust the number of steps in the generative process according to the specified schedule and target steps.
    - Python dtype: `Tuple[PixelKSampleHook]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StepsScheduleHookProvider:
    schedules = ["simple"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "schedule_for_iteration": (s.schedules,),
                     "target_steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                    },
                }

    RETURN_TYPES = ("PK_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, schedule_for_iteration, target_steps):
        hook = None
        if schedule_for_iteration == "simple":
            hook = hooks.SimpleStepsScheduleHook(target_steps)

        return (hook, )

```
