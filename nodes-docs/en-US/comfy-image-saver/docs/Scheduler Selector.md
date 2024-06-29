---
tags:
- SamplerScheduler
- Sampling
---

# Scheduler Selector
## Documentation
- Class name: `Scheduler Selector`
- Category: `ImageSaverTools/utils`
- Output node: `False`

The Scheduler Selector node is designed to facilitate the selection of a scheduler from a predefined list of schedulers available within the Comfy samplers. It abstracts the complexity of scheduler selection, providing a streamlined interface for users to choose the most suitable scheduler for their image generation or modification tasks.
## Input types
### Required
- **`scheduler`**
    - Specifies the scheduler to be selected. This parameter allows users to choose from a list of available schedulers, impacting the image generation process by determining the scheduling algorithm used.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`scheduler`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the selected scheduler's name. This output is crucial for further processing steps that require a specific scheduler to be identified and used.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)



## Source code
```python
class SchedulerSelector:
    CATEGORY = 'ImageSaverTools/utils'
    RETURN_TYPES = (comfy.samplers.KSampler.SCHEDULERS,)
    RETURN_NAMES = ("scheduler",)
    FUNCTION = "get_names"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"scheduler": (comfy.samplers.KSampler.SCHEDULERS,)}}

    def get_names(self, scheduler):
        return (scheduler,)

```
