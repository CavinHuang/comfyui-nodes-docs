---
tags:
- SamplerScheduler
- Sampling
---

# XY Input: Sampler/Scheduler
## Documentation
- Class name: `XY Input: Sampler_Scheduler`
- Category: `Efficiency Nodes/XY Inputs`
- Output node: `False`

This node is designed to process and validate combinations of samplers and schedulers for use in generative models. It ensures that the provided sampler and scheduler names are valid and compatible, potentially adjusting them based on predefined constraints to optimize the sampling process.
## Input types
### Required
- **`target_parameter`**
    - Specifies the target parameter for the sampling or scheduling process, indicating the specific aspect of the generative model's operation to be optimized or adjusted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`input_count`**
    - Indicates the number of inputs to be processed, reflecting the volume of data or parameters the node will handle in optimizing the sampling or scheduling.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sampler_i`**
    - Specifies the index of the sampler to be used, playing a crucial role in determining the sampling strategy and its compatibility with the scheduler.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
- **`scheduler_i`**
    - Defines the index of the scheduler to be employed alongside the sampler, adjusting the sampling parameters dynamically for efficient generation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `int`
## Output types
- **`X or Y`**
    - Comfy dtype: `XY`
    - The result of processing, which could be either an optimized parameter value (X) or a decision metric (Y), ensuring the sampler and scheduler are effectively paired.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class TSC_XYplot_Sampler_Scheduler:
    parameters = ["sampler", "scheduler", "sampler & scheduler"]

    @classmethod
    def INPUT_TYPES(cls):
        samplers = ["None"] + comfy.samplers.KSampler.SAMPLERS
        schedulers = ["None"] + comfy.samplers.KSampler.SCHEDULERS
        inputs = {
            "required": {
                "target_parameter": (cls.parameters,),
                "input_count": ("INT", {"default": XYPLOT_DEF, "min": 0, "max": XYPLOT_LIM, "step": 1})
            }
        }
        for i in range(1, XYPLOT_LIM+1):
            inputs["required"][f"sampler_{i}"] = (samplers,)
            inputs["required"][f"scheduler_{i}"] = (schedulers,)

        return inputs

    RETURN_TYPES = ("XY",)
    RETURN_NAMES = ("X or Y",)
    FUNCTION = "xy_value"
    CATEGORY = "Efficiency Nodes/XY Inputs"

    def xy_value(self, target_parameter, input_count, **kwargs):
        if target_parameter == "scheduler":
            xy_type = "Scheduler"
            schedulers = [kwargs.get(f"scheduler_{i}") for i in range(1, input_count + 1)]
            xy_value = [scheduler for scheduler in schedulers if scheduler != "None"]
        elif target_parameter == "sampler":
            xy_type = "Sampler"
            samplers = [kwargs.get(f"sampler_{i}") for i in range(1, input_count + 1)]
            xy_value = [(sampler, None) for sampler in samplers if sampler != "None"]
        else:
            xy_type = "Sampler"
            samplers = [kwargs.get(f"sampler_{i}") for i in range(1, input_count + 1)]
            schedulers = [kwargs.get(f"scheduler_{i}") for i in range(1, input_count + 1)]
            xy_value = [(sampler, scheduler if scheduler != "None" else None) for sampler,
            scheduler in zip(samplers, schedulers) if sampler != "None"]

        return ((xy_type, xy_value),) if xy_value else (None,)

```
