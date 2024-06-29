---
tags:
- SamplerScheduler
- Sampling
---

# Sampler Scheduler Settings (JPS)
## Documentation
- Class name: `Sampler Scheduler Settings (JPS)`
- Category: `JPS Nodes/Settings`
- Output node: `False`

This node is designed to facilitate the selection and configuration of samplers and schedulers within a generative pipeline, allowing users to specify and retrieve the settings for various sampling strategies and their corresponding scheduling algorithms.
## Input types
### Required
- **`sampler_name`**
    - Specifies the name of the sampler to be used, playing a crucial role in determining the sampling strategy for the generative process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `comfy.samplers.KSampler.SAMPLERS`
- **`scheduler`**
    - Determines the scheduling algorithm to be applied, directly affecting the execution and efficiency of the sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `comfy.samplers.KSampler.SCHEDULERS`
## Output types
- **`sampler_name`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the name of the selected sampler.
    - Python dtype: `str`
- **`scheduler`**
    - Comfy dtype: `COMBO[STRING]`
    - Returns the selected scheduling algorithm.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Sampler_Scheduler_Settings:
    CATEGORY = 'JPS Nodes/Settings'
    RETURN_TYPES = (comfy.samplers.KSampler.SAMPLERS,comfy.samplers.KSampler.SCHEDULERS,)
    RETURN_NAMES = ("sampler_name","scheduler",)
    FUNCTION = "get_samsched"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"sampler_name": (comfy.samplers.KSampler.SAMPLERS,),"scheduler": (comfy.samplers.KSampler.SCHEDULERS,)}}

    def get_samsched(self, sampler_name, scheduler):
        return (sampler_name, scheduler, )

```
