---
tags:
- ImageEnhancement
- Scheduling
---

# DenoiseSchedulerDetailerHookProvider
## Documentation
- Class name: `DenoiseSchedulerDetailerHookProvider`
- Category: `ImpactPack/Detailer`
- Output node: `False`

This node provides a mechanism to dynamically adjust denoising levels throughout the generation cycle based on a predefined schedule. It aims to enhance image detail and quality by fine-tuning denoise parameters at different stages of the image generation process.
## Input types
### Required
- **`schedule_for_cycle`**
    - Specifies the scheduling strategy for adjusting denoise levels throughout the generation cycle. It determines how denoise levels are modified over time to achieve optimal image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`target_denoise`**
    - The target denoise level to achieve by the end of the generation cycle. This parameter sets the goal for the dynamic adjustment of denoise levels, influencing the final image detail and quality.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`detailer_hook`**
    - Comfy dtype: `DETAILER_HOOK`
    - Produces a detailer hook that is used to dynamically adjust denoise levels throughout the image generation cycle, based on the specified schedule and target denoise level.
    - Python dtype: `SimpleDetailerDenoiseSchedulerHook`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DenoiseSchedulerDetailerHookProvider:
    schedules = ["simple"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "schedule_for_cycle": (s.schedules,),
                     "target_denoise": ("FLOAT", {"default": 0.3, "min": 0.0, "max": 1.0, "step": 0.01}),
                    },
                }

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, schedule_for_cycle, target_denoise):
        hook = hooks.SimpleDetailerDenoiseSchedulerHook(target_denoise)
        return (hook, )

```
