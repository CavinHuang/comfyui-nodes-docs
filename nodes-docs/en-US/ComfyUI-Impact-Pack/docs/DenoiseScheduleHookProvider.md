---
tags:
- ImageEnhancement
- Scheduling
---

# DenoiseScheduleHookProvider
## Documentation
- Class name: `DenoiseScheduleHookProvider`
- Category: `ImpactPack/Upscale`
- Output node: `False`

The DenoiseScheduleHookProvider node is designed to create hooks that adjust denoising levels dynamically during the image generation process, based on a predefined schedule and target denoise value. It aims to enhance the quality of the generated images by fine-tuning the denoising parameter over the course of the generation.
## Input types
### Required
- **`schedule_for_iteration`**
    - Specifies the schedule to be used for adjusting the denoising level during the image generation process. The choice of schedule affects how the target denoising level is approached over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[str]`
- **`target_denoise`**
    - The target denoising level to be achieved by the end of the image generation process. This value influences the final clarity and detail of the generated image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`pk_hook`**
    - Comfy dtype: `PK_HOOK`
    - The output is a hook that can be applied to the image generation process to dynamically adjust the denoising level according to the specified schedule.
    - Python dtype: `PixelKSampleHook`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PixelKSampleUpscalerProvider](../../ComfyUI-Impact-Pack/Nodes/PixelKSampleUpscalerProvider.md)



## Source code
```python
class DenoiseScheduleHookProvider:
    schedules = ["simple"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "schedule_for_iteration": (s.schedules,),
                     "target_denoise": ("FLOAT", {"default": 0.2, "min": 0.0, "max": 1.0, "step": 0.01}),
                    },
                }

    RETURN_TYPES = ("PK_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Upscale"

    def doit(self, schedule_for_iteration, target_denoise):
        hook = None
        if schedule_for_iteration == "simple":
            hook = hooks.SimpleDenoiseScheduleHook(target_denoise)

        return (hook, )

```
