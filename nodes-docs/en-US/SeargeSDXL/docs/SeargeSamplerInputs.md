---
tags:
- SamplerScheduler
- Sampling
---

# Sampler Settings
## Documentation
- Class name: `SeargeSamplerInputs`
- Category: `Searge/_deprecated_/Inputs`
- Output node: `False`

The SeargeSamplerInputs node is designed to manage and provide sampler and scheduler configurations for sampling processes. It abstracts the complexity of selecting appropriate sampling strategies by offering predefined options and defaults, thereby facilitating the customization and optimization of sampling operations.
## Input types
### Required
- **`sampler_name`**
    - Specifies the name of the sampler to be used. This parameter allows for the selection among various predefined samplers, influencing the sampling behavior and results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Determines the scheduling strategy to be employed during sampling. This parameter influences how samples are generated over time, affecting the overall sampling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sampler_name`**
    - Comfy dtype: `SAMPLER_NAME`
    - The name of the selected sampler, reflecting the choice made for the sampling process.
    - Python dtype: `str`
- **`scheduler`**
    - Comfy dtype: `SCHEDULER_NAME`
    - The name of the chosen scheduler, indicating the scheduling strategy employed for sampling.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SeargeSDXLSamplerV3](../../SeargeSDXL/Nodes/SeargeSDXLSamplerV3.md)



## Source code
```python
class SeargeSamplerInputs:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "sampler_name": (comfy.samplers.KSampler.SAMPLERS, {"default": "ddim"}),
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS, {"default": "ddim_uniform"}),
        },
        }

    RETURN_TYPES = ("SAMPLER_NAME", "SCHEDULER_NAME",)
    RETURN_NAMES = ("sampler_name", "scheduler",)
    FUNCTION = "get_value"

    CATEGORY = "Searge/_deprecated_/Inputs"

    def get_value(self, sampler_name, scheduler):
        return (sampler_name, scheduler,)

```
