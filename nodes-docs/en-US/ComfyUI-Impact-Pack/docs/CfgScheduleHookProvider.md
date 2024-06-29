---
tags:
- ImageEnhancement
- Scheduling
---

# CfgScheduleHookProvider
## Documentation
- Class name: `CfgScheduleHookProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The CfgScheduleHookProvider node is designed to create configuration schedule hooks based on a specified iteration schedule and target configuration. It aims to dynamically adjust the configuration during the iteration process to achieve desired outcomes.
## Input types
### Required
- **`schedule_for_iteration`**
    - Specifies the iteration schedule to use for adjusting the configuration. It determines how the configuration changes over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`target_cfg`**
    - The target configuration value to reach by the end of the iteration process. It influences the adjustment of the configuration over time.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pk_hook`**
    - Comfy dtype: `PK_HOOK`
    - Produces a hook that can be used to adjust the configuration during the iteration process.
    - Python dtype: `Tuple[PixelKSampleHook]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CfgScheduleHookProvider:
    schedules = ["simple"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "schedule_for_iteration": (s.schedules,),
                     "target_cfg": ("FLOAT", {"default": 3.0, "min": 0.0, "max": 100.0}),
                    },
                }

    RETURN_TYPES = ("PK_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, schedule_for_iteration, target_cfg):
        hook = None
        if schedule_for_iteration == "simple":
            hook = hooks.SimpleCfgScheduleHook(target_cfg)

        return (hook, )

```
